/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as os from "os";
import * as vscode from "vscode";
import type { TelemetryClient } from "applicationinsights";
import { AppenderData, BaseTelemetryReporter } from "../common/baseTelemetryReporter";
import { BaseTelemetryAppender, BaseTelemetryClient } from "../common/baseTelemetryAppender";

/**
 * A factory function which creates a telemetry client to be used by an appender to send telemetry
 * @param key The app insights key
 * @returns A promise which resolves to the telemetry client or rejects upon error
 */
const appInsightsClientFactory = async (key: string): Promise<BaseTelemetryClient> => {
	let appInsightsClient: TelemetryClient | undefined;
	try {
		const appInsights = await import("applicationinsights");
		//check if another instance is already initialized
		if (appInsights.defaultClient) {
			appInsightsClient = new appInsights.TelemetryClient(key);
			// no other way to enable offline mode
			appInsightsClient.channel.setUseDiskRetryCaching(true);
		} else {
			appInsights.setup(key)
				.setAutoCollectRequests(false)
				.setAutoCollectPerformance(false)
				.setAutoCollectExceptions(false)
				.setAutoCollectDependencies(false)
				.setAutoDependencyCorrelation(false)
				.setAutoCollectConsole(false)
				.setUseDiskRetryCaching(true)
				.start();
			appInsightsClient = appInsights.defaultClient;
		}
		if (vscode && vscode.env) {
			appInsightsClient.context.tags[appInsightsClient.context.keys.userId] = vscode.env.machineId;
			appInsightsClient.context.tags[appInsightsClient.context.keys.sessionId] = vscode.env.sessionId;
			appInsightsClient.context.tags[appInsightsClient.context.keys.cloudRole] = vscode.env.appName;
			appInsightsClient.context.tags[appInsightsClient.context.keys.cloudRoleInstance] = vscode.env.appName;
		}
		//check if it's an Asimov key to change the endpoint
		if (key && key.indexOf("AIF-") === 0) {
			appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
		}
	} catch (e: any) {
		return Promise.reject(e);
	}
	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: AppenderData) => {
			appInsightsClient?.trackEvent({
				name: eventName,
				properties: data?.properties,
				measurements: data?.measurements
			});
		},
		logException: (exception: Error, data?: AppenderData) => {
			appInsightsClient?.trackException({
				exception,
				properties: data?.properties,
				measurements: data?.measurements
			});
		},
		flush: async () => {
			appInsightsClient?.flush();
		}
	};
	return telemetryClient;
};

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean) {
		const appender = new BaseTelemetryAppender(key, appInsightsClientFactory);
		if (key && key.indexOf("AIF-") === 0) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, {
			release: os.release(),
			platform: os.platform(),
			architecture: os.arch(),
		}, firstParty);
	}
}