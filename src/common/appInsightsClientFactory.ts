/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ApplicationInsights } from "@microsoft/applicationinsights-web-basic";
import type { IXHROverride } from "@microsoft/applicationinsights-core-js";
import { BreezeChannelIdentifier } from "@microsoft/applicationinsights-common";
import { ReplacementOption, SenderData } from "./baseTelemetryReporter";
import { BaseTelemetryClient } from "./baseTelemetrySender";
import { TelemetryUtil } from "./util";
import type { IChannelConfiguration } from "@microsoft/1ds-post-js";

export const appInsightsClientFactory = async (key: string, xhrOverride?: IXHROverride, replacementOptions?: ReplacementOption[]): Promise<BaseTelemetryClient> => {
	let appInsightsClient: ApplicationInsights | undefined;
	try {
		const basicAISDK = await import/* webpackMode: "eager" */("@microsoft/applicationinsights-web-basic");
		appInsightsClient = new basicAISDK.ApplicationInsights({
			instrumentationKey: key,
			disableAjaxTracking: true,
			disableExceptionTracking: true,
			disableFetchTracking: true,
			disableCorrelationHeaders: true,
			disableCookiesUsage: true,
			autoTrackPageVisitTime: false,
			emitLineDelimitedJson: false,
			disableInstrumentationKeyValidation: true
		},
		);

		if (xhrOverride) {
			appInsightsClient.config.extensionConfig = {};
			// Configure the channel to use a XHR Request override since it's not available in node
			const channelConfig: IChannelConfiguration = {
				alwaysUseXhrOverride: true,
				httpXHROverride: xhrOverride
			};
			appInsightsClient.config.extensionConfig[BreezeChannelIdentifier] = channelConfig;
		}
	} catch (e) {
		return Promise.reject(e);
	}
	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: SenderData) => {
			const properties = { ...data?.properties, ...data?.measurements };
			if (replacementOptions?.length) {
				TelemetryUtil.applyReplacements(properties, replacementOptions);
			}
			appInsightsClient?.track({
				name: eventName,
				data: properties,
				baseType: "EventData",
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