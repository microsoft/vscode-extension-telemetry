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
		AppInsightsChannelPlugin?: ChannelPluginConfig;
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
	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: SenderData) => {
			// Merge common properties, event properties, and measurements
			const properties = { ...options?.commonProperties, ...data?.properties, ...data?.measurements };
			
			// DEBUG: Log merged properties to verify commonProperties are included
			console.log('🟣 [VSCODE-TELEMETRY LIB] appInsightsClientFactory.logEvent called');
			console.log('🟣 [VSCODE-TELEMETRY LIB] Event name:', eventName);
			console.log('🟣 [VSCODE-TELEMETRY LIB] Common properties:', options?.commonProperties);
			console.log('🟣 [VSCODE-TELEMETRY LIB] Event properties:', data?.properties);
			console.log('🟣 [VSCODE-TELEMETRY LIB] Merged properties (after commonProperties):', properties);
			console.log('🟣 [VSCODE-TELEMETRY LIB] telemetry_implementation =', properties['telemetry_implementation']);
			
			if (replacementOptions?.length) {
				TelemetryUtil.applyReplacements(properties, replacementOptions);
			}
			
			// Merge tag overrides: constructor-level < context < per-event (highest priority)
			// Note: data?.tagOverrides already contains merged contextTags + perEventTags from baseTelemetryReporter
			const tagOverrides = {
				...options?.tagOverrides,      // Constructor level (lowest priority)
				...data?.tagOverrides           // Context + Per-event (highest priority)
			};
			
			// Merge tag overrides into properties - the SDK handles ai.* tags automatically
			const finalProperties = { ...properties, ...tagOverrides };
			
			appInsightsClient?.track({
				name: eventName,
				data: finalProperties,
				baseType: "EventData",
				ext: { user: { id: machineId, authId: machineId }, app: { sesId: sessionId } },
				baseData: { name: eventName, properties: data?.properties, measurements: data?.measurements }
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