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

interface TelemetryExtension {
	user: {
		id: string;
		authId: string;
	};
	app: {
		sesId: string;
	};
	cloud: {
		roleInstance?: string;
		role?: string;
	};
	[key: string]: unknown;
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
			const properties = { ...options?.commonProperties, ...data?.properties, ...data?.measurements };
			if (replacementOptions?.length) {
				TelemetryUtil.applyReplacements(properties, replacementOptions);
			}
			
			// Merge tag overrides with proper priority (object spread: later = higher priority)
			// Priority order: constructor (lowest) < context < per-event (highest)
			// Note: data?.tagOverrides already contains merged contextTags + perEventTags from baseTelemetryReporter
			const effectiveTagOverrides = {
				...options?.tagOverrides,      // 1. Constructor level (lowest priority)
				...data?.tagOverrides           // 2. Context + Per-event (highest priority) - already merged
			};
			
			// Apply user ID override if present
			const userTags = effectiveTagOverrides?.['ai.user.id'] 
				? { id: effectiveTagOverrides['ai.user.id'], authId: effectiveTagOverrides['ai.user.id'] }
				: { id: machineId, authId: machineId };
			
			// Use session ID from override if provided, otherwise use the one passed to factory
			const sessionIdValue = effectiveTagOverrides?.['ai.session.id'] ?? sessionId;
			
			const ext: TelemetryExtension = { 
				user: userTags, 
				app: { sesId: sessionIdValue },
				cloud: {}
			};
			
			// Map Application Insights tag names to Web Basic SDK ext structure
			if (effectiveTagOverrides) {
				for (const [key, value] of Object.entries(effectiveTagOverrides)) {
					if (key === 'ai.user.id' || key === 'ai.session.id') {
						// Already handled above
						continue;
					} else if (key === 'ai.cloud.roleInstance') {
						// Map to cloud structure
						ext.cloud.roleInstance = value;
					} else if (key === 'ai.cloud.role') {
						ext.cloud.role = value;
					} else if (key.startsWith('ai.')) {
						// For other ai.* tags, preserve the full key name for compatibility
						ext[key] = value;
					} else {
						// Non-AI tags go directly
						ext[key] = value;
					}
				}
			}
			
			appInsightsClient?.track({
				name: eventName,
				data: properties,
				baseType: "EventData",
				ext,
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