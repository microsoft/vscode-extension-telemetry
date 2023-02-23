/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type { ApplicationInsights } from "@microsoft/applicationinsights-web-basic";
import * as vscode from "vscode";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";
import { BaseTelemetrySender, BaseTelemetryClient } from "../common/baseTelemetrySender";
import { SenderData, BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { TelemetryUtil } from "../common/util";

const webAppInsightsClientFactory = async (key: string, replacementOptions?: ReplacementOption[]): Promise<BaseTelemetryClient> => {
	let appInsightsClient: ApplicationInsights | undefined;
	try {
		const web = await import/* webpackMode: "eager" */ ("@microsoft/applicationinsights-web-basic");
		appInsightsClient = new web.ApplicationInsights({
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
			appInsightsClient?.track(
				{ name: eventName, data: properties },
			);
		},
		flush: async () => {
			appInsightsClient?.flush();
		}
	};
	return telemetryClient;
};

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(key: string, replacementOptions?: ReplacementOption[]) {
		let clientFactory = (key: string) => webAppInsightsClientFactory(key, replacementOptions);
		// If key is usable by 1DS use the 1DS SDk
		if (TelemetryUtil.shouldUseOneDataSystemSDK(key)) {
			clientFactory = (key: string) => oneDataSystemClientFactory(key, vscode);
		}

		const osShim = {
			release: navigator.appVersion,
			platform: "web",
			architecture: "web",
		};

		const sender = new BaseTelemetrySender(key, clientFactory);
		// AIF is no longer supported
		if (key && (key.indexOf("AIF") === 0)) {
			throw new Error("AIF keys are no longer supported. Please switch to 1DS keys for 1st party extensions");
		}
		super(sender, vscode, { additionalCommonProperties: TelemetryUtil.getAdditionalCommonProperties(osShim) });
	}
}
