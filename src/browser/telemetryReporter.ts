/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { BaseTelemetryAppender, BaseTelemetryClient } from "../common/baseTelemetryAppender";
import { AppenderData, BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { applyReplacements, getTelemetryLevel, TelemetryLevel } from "../common/util";


const webAppInsightsClientFactory = async (key: string, replacementOptions?: ReplacementOption[]): Promise<BaseTelemetryClient> => {
	let appInsightsClient: ApplicationInsights | undefined;
	try {
		const web = await import("@microsoft/applicationinsights-web");
		let endpointUrl: undefined | string;
		if (key && key.indexOf("AIF-") === 0) {
			endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
		}
		appInsightsClient = new web.ApplicationInsights({
			config: {
				instrumentationKey: key,
				endpointUrl,
				disableAjaxTracking: true,
				disableExceptionTracking: true,
				disableFetchTracking: true,
				disableCorrelationHeaders: true,
				disableCookiesUsage: true,
				autoTrackPageVisitTime: false,
				emitLineDelimitedJson: true,
				disableInstrumentationKeyValidation: true
			},
		});
		appInsightsClient.loadAppInsights();
		// If we cannot access the endpoint this most likely means it's being blocked
		// and we should not attempt to send any telemetry.
		const telemetryLevel = getTelemetryLevel();
		if (endpointUrl && telemetryLevel !== TelemetryLevel.OFF) {
			fetch(endpointUrl).catch(() => (appInsightsClient = undefined));
		}
	} catch (e) {
		return Promise.reject(e);
	}
	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: AppenderData) => {
			const properties = { ...data?.properties, ...data?.measurements };
			if (replacementOptions?.length) {
				applyReplacements(properties, replacementOptions);
			}
			appInsightsClient?.trackEvent(
				{ name: eventName },
				properties
			);
		},
		logException: (exception: Error, data?: AppenderData) => {
			const properties = { ...data?.properties, ...data?.measurements };
			if (replacementOptions?.length) {
				applyReplacements(properties, replacementOptions);
			}
			appInsightsClient?.trackException(
				{
					exception,
					properties
				});
		},
		flush: async () => {
			appInsightsClient?.flush();
		}
	};
	return telemetryClient;
};

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean, replacementOptions?: ReplacementOption[]) {
		const appender = new BaseTelemetryAppender(key, key => webAppInsightsClientFactory(key, replacementOptions));
		if (key && key.indexOf("AIF-") === 0) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, {
			release: navigator.appVersion,
			platform: "web",
			architecture: "web",
		}, firstParty);
	}
}
