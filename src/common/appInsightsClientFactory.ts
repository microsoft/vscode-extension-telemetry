/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IXHROverride } from "@microsoft/applicationinsights-core-js";
import type { ApplicationInsights } from "@microsoft/applicationinsights-web-basic";
import { BreezeChannelIdentifier } from "@microsoft/applicationinsights-common";
import { ReplacementOption, SenderData } from "./baseTelemetryReporter";
import { BaseTelemetryClient } from "./baseTelemetrySender";
import { TelemetryUtil } from "./util";

interface AppInsightsConfig {
	instrumentationKey?: string;
	connectionString?: string;
	disableAjaxTracking: boolean;
	disableExceptionTracking: boolean;
	disableFetchTracking: boolean;
	disableCorrelationHeaders: boolean;
	disableCookiesUsage: boolean;
	autoTrackPageVisitTime: boolean;
	emitLineDelimitedJson: boolean;
	disableInstrumentationKeyValidation: boolean;
	endpointUrl?: string;
	extensionConfig?: {
		[key: string]: ChannelPluginConfig;
	};
}

interface ChannelPluginConfig {
	alwaysUseXhrOverride: boolean;
	httpXHROverride: IXHROverride;
}

export interface AppInsightsClientOptions {
	/** Custom endpoint URL for telemetry ingestion */
	endpointUrl?: string;
	/** Common properties to be added to all telemetry events */
	commonProperties?: Record<string, string>;
	/** 
	 * Tag overrides to be applied at the client level (static, for all events).
	 * For dynamic per-event tag overrides, use SenderData.tagOverrides instead.
	 * Event-level overrides take precedence over client-level overrides.
	 */
	tagOverrides?: Record<string, string>;
}

export const appInsightsClientFactory = async (
	connectionString: string, 
	machineId: string, 
	sessionId: string, 
	xhrOverride?: IXHROverride, 
	replacementOptions?: ReplacementOption[],
	options?: AppInsightsClientOptions
): Promise<BaseTelemetryClient> => {
	let appInsightsClient: ApplicationInsights | undefined;
	try {
		const basicAISDK = await import/* webpackMode: "eager" */("@microsoft/applicationinsights-web-basic");

		let instrumentationKey: string | undefined;
		if (!connectionString.startsWith("InstrumentationKey=")) {
			instrumentationKey = connectionString;
		}

		const authConfig = instrumentationKey ? { instrumentationKey } : { connectionString };

		// Build the configuration for web-basic SDK
		const config: AppInsightsConfig = {
			...authConfig,
			disableAjaxTracking: true,
			disableExceptionTracking: true,
			disableFetchTracking: true,
			disableCorrelationHeaders: true,
			disableCookiesUsage: true,
			autoTrackPageVisitTime: false,
			emitLineDelimitedJson: false,
			disableInstrumentationKeyValidation: true,
		};

		// Set custom endpoint URL at root level (web-basic SDK reads from here)
		if (options?.endpointUrl) {
			config.endpointUrl = options.endpointUrl;
		}

		// Configure XHR override if provided (for Node.js environments)
		if (xhrOverride) {
			config.extensionConfig = config.extensionConfig || {};
			const channelConfig: ChannelPluginConfig = {
				alwaysUseXhrOverride: true,
				httpXHROverride: xhrOverride
			};
			config.extensionConfig[BreezeChannelIdentifier] = channelConfig;
		}

		appInsightsClient = new basicAISDK.ApplicationInsights(config);

	} catch (e) {
		return Promise.reject(e);
	}

	// Helper to merge properties, apply replacements, and merge tag overrides
	const prepareEventData = (data?: SenderData, includeMeasurements = false) => {
		// Merge common properties with event properties (and optionally measurements)
		const properties = includeMeasurements
			? { ...options?.commonProperties, ...data?.properties, ...data?.measurements }
			: { ...options?.commonProperties, ...data?.properties };

		if (replacementOptions?.length) {
			TelemetryUtil.applyReplacements(properties, replacementOptions);
		}

		// Merge tag overrides: constructor-level < context < per-event (highest priority)
		const hasConstructorTags = options?.tagOverrides && Object.keys(options.tagOverrides).length > 0;
		const hasEventTags = data?.tagOverrides && Object.keys(data.tagOverrides).length > 0;
		const tagOverrides = (hasConstructorTags || hasEventTags)
			? { ...options?.tagOverrides, ...data?.tagOverrides }
			: undefined;

		const finalProperties = tagOverrides ? { ...properties, ...tagOverrides } : properties;

		return { finalProperties };
	};

	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: SenderData) => {
			const { finalProperties } = prepareEventData(data, true);

			appInsightsClient?.track({
				name: eventName,
				data: finalProperties,
				baseType: "EventData",
				ext: { user: { id: machineId, authId: machineId }, app: { sesId: sessionId } },
				baseData: { name: eventName, properties: finalProperties, measurements: data?.measurements }
			});
		},
		logException: (exception: Error, data?: SenderData) => {
			const { finalProperties } = prepareEventData(data, false);

			// This structure matches trackException in the full Application Insights Node.js SDK.
			// Using baseType: "ExceptionData" sends to the exceptions table (not events table).
			appInsightsClient?.track({
				name: exception.name,
				data: finalProperties,
				baseType: "ExceptionData",
				ext: { user: { id: machineId, authId: machineId }, app: { sesId: sessionId } },
				baseData: {
					exceptions: [{
						typeName: exception.name,
						message: exception.message,
						hasFullStack: !!exception.stack,
						stack: exception.stack,
						parsedStack: []
					}],
					properties: finalProperties,
					measurements: data?.measurements
				}
			});
		},
		flush: async () => {
			appInsightsClient?.flush(false);
		},
		dispose: async () => {
			const unloadPromise = new Promise<void>((resolve) => {
				appInsightsClient?.unload(true, () => {
					resolve();
					appInsightsClient = undefined;
				}, 1000);
			}
			);
			return unloadPromise;
		}
	};
	return telemetryClient;
};