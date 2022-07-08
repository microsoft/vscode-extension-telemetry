/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type { ApplicationInsights } from "@microsoft/applicationinsights-web";
import * as vscode from "vscode";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";
import { BaseTelemetryAppender, BaseTelemetryClient } from "../common/baseTelemetryAppender";
import { AppenderData, BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { TelemetryUtil } from "../common/util";

const webAppInsightsClientFactory = async (key: string, replacementOptions?: ReplacementOption[]): Promise<BaseTelemetryClient> => {
	let appInsightsClient: ApplicationInsights | undefined;
	try {
		const web = await import("@microsoft/applicationinsights-web");
		appInsightsClient = new web.ApplicationInsights({
			config: {
				instrumentationKey: key,
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
	} catch (e) {
		return Promise.reject(e);
	}
	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: AppenderData) => {
			const properties = { ...data?.properties, ...data?.measurements };
			if (replacementOptions?.length) {
				TelemetryUtil.applyReplacements(properties, replacementOptions);
			}
			appInsightsClient?.trackEvent(
				{ name: eventName },
				properties
			);
		},
		logException: (exception: Error, data?: AppenderData) => {
			const properties = { ...data?.properties, ...data?.measurements };
			if (replacementOptions?.length) {
				TelemetryUtil.applyReplacements(properties, replacementOptions);
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
		let clientFactory = (key: string) => webAppInsightsClientFactory(key, replacementOptions);
		// If key is usable by 1DS use the 1DS SDk
		if (TelemetryUtil.shouldUseOneDataSystemSDK(key)) {
			clientFactory = (key: string) => oneDataSystemClientFactory(key, vscode);
		}

		const appender = new BaseTelemetryAppender(key, clientFactory);
		// AIF is no longer supported
		if (key && (key.indexOf("AIF") === 0)) {
			throw new Error("AIF keys are no longer supported. Please switch to 1DS keys for 1st party extensions");
		}
		// If it's a 1DS key it is first party
		if (TelemetryUtil.shouldUseOneDataSystemSDK(key)) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, {
			release: navigator.appVersion,
			platform: "web",
			architecture: "web",
		}, vscode, firstParty);
	}
}
