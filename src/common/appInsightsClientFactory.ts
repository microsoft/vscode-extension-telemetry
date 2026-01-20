/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IXHROverride } from "@microsoft/applicationinsights-core-js";
import type { ApplicationInsights } from "@microsoft/applicationinsights-web-basic";
import { ReplacementOption, SenderData } from "./baseTelemetryReporter";
import { BaseTelemetryClient } from "./baseTelemetrySender";
import { TelemetryUtil } from "./util";

// === TELEMETRY TESTING SETTINGS ===
// Set to true for testing, false for production
const TELEMETRY_DEBUG_ENABLED = true;
// =====================================

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
			// Note: web-basic SDK has limited support for XHR overrides
			// This may require additional configuration or may not work as expected
			config.extensionConfig = config.extensionConfig || {};
			// The actual channel identifier varies, this is a best-effort approach
			const channelConfig: ChannelPluginConfig = {
				alwaysUseXhrOverride: true,
				httpXHROverride: xhrOverride
			};
			// Try common channel identifiers
			config.extensionConfig["AppInsightsChannelPlugin"] = channelConfig;
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
			
			// Merge client-level and event-level tag overrides
			// Event-level overrides take precedence over client-level
			const effectiveTagOverrides = {
				...options?.tagOverrides,      // Client-level (static)
				...data?.tagOverrides           // Event-level (dynamic) - takes precedence
			};
			
			// === DEBUG LOGGING ===
			if (TELEMETRY_DEBUG_ENABLED) {
				console.log('[TELEMETRY DEBUG - NEW IMPLEMENTATION]', {
					eventName,
					properties,
					effectiveTagOverrides,
					endpointUrl: options?.endpointUrl,
					commonProperties: options?.commonProperties
				});
			}
			
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