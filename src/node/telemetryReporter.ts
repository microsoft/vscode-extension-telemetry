/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as os from "os";
import * as vscode from "vscode";
import * as https from "https";
import type { TelemetryClient } from "applicationinsights";
import { AppenderData, BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { BaseTelemetryAppender, BaseTelemetryClient } from "../common/baseTelemetryAppender";
import { TelemetryUtil } from "../common/util";
import type { IXHROverride, IPayloadData } from "@microsoft/1ds-post-js";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";
/**
 * A factory function which creates a telemetry client to be used by an appender to send telemetry in a node application.
 *
 * @param key The app insights key
 * @param replacementOptions Optional list of {@link ReplacementOption replacements} to apply to the telemetry client. This allows
 * the appender to filter out any sensitive or unnecessary information from the telemetry server.
 *
 * @returns A promise which resolves to the telemetry client or rejects upon error
 */
const appInsightsClientFactory = async (key: string, replacementOptions?: ReplacementOption[]): Promise<BaseTelemetryClient> => {
	let appInsightsClient: TelemetryClient | undefined;
	try {
		process.env["APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL"] = "1";
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
				.setAutoCollectHeartbeat(false)
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
			appInsightsClient.config.endpointUrl = "https://mobile.events.data.microsoft.com/collect/v1";
		}
	} catch (e: any) {
		return Promise.reject("Failed to initialize app insights!\n" + e.message);
	}

	if (replacementOptions?.length) {
		addReplacementOptions(appInsightsClient, replacementOptions);
	}

	// Sets the appinsights client into a standardized form
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: AppenderData) => {
			try {
				appInsightsClient?.trackEvent({
					name: eventName,
					properties: data?.properties,
					measurements: data?.measurements
				});
			} catch (e: any) {
				throw new Error("Failed to log event to app insights!\n" + e.message);
			}
		},
		logException: (exception: Error, data?: AppenderData) => {
			try {
				appInsightsClient?.trackException({
					exception,
					properties: data?.properties,
					measurements: data?.measurements
				});
			} catch(e: any) {
				throw new Error("Failed to log exception to app insights!\n" + e.message);
			}
		},
		flush: async () => {
			try {
				appInsightsClient?.flush();
			} catch(e: any) {
				throw new Error("Failed to flush app insights!\n" + e.message);
			}
		}
	};
	return telemetryClient;
};

/**
 * Adds replacement options to this {@link TelemetryClient}.
 *
 * If any replacement options are specified, this function will search through any event about to be
 * sent to the telemetry server and replace any matches with the specified replacement string. Both
 * the envelope and the base data will be searched.
 *
 * @param appInsightsClient The {@link TelemetryClient} to add the filters to.
 * @param replacementOptions The replacement options to add.
 */
function addReplacementOptions(appInsightsClient: TelemetryClient, replacementOptions: ReplacementOption[]) {
	appInsightsClient.addTelemetryProcessor((event) => {
		if (Array.isArray(event.tags)) {
			event.tags.forEach(tag => TelemetryUtil.applyReplacements(tag, replacementOptions));
		} else if (event.tags) {
			TelemetryUtil.applyReplacements(event.tags, replacementOptions);
		}

		if (event.data.baseData) {
			TelemetryUtil.applyReplacements(event.data.baseData, replacementOptions);
		}
		return true;
	});
}

/**
 * Create a replacement for the XHTMLRequest object utilizing nodes HTTP module.
 * @returns A XHR override object used to override the XHTMLRequest object in the 1DS SDK
 */
function getXHROverride() {
	// Override the way events get sent since node doesn't have XHTMLRequest
	const customHttpXHROverride: IXHROverride = {
		sendPOST: (payload: IPayloadData, oncomplete) => {
			const options = {
				method: "POST",
				headers: {
					...payload.headers,
					"Content-Type": "application/json",
					"Content-Length": Buffer.byteLength(payload.data)
				}
			};
			try {
				const req = https.request(payload.urlString, options, res => {
					res.on("data", function (responseData) {
						oncomplete(res.statusCode ?? 200, res.headers as Record<string, any>, responseData.toString());
					});
					// On response with error send status of 0 and a blank response to oncomplete so we can retry events
					res.on("error", function () {
						oncomplete(0, {});
					});
				});
				req.write(payload.data);
				req.end();
			} catch {
				// If it errors out, send status of 0 and a blank response to oncomplete so we can retry events
				oncomplete(0, {});
			}
		}
	};
	return customHttpXHROverride;
}

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean, replacementOptions?: ReplacementOption[]) {
		let clientFactory = (key: string) => appInsightsClientFactory(key, replacementOptions);
		// If key is usable by 1DS use the 1DS SDk
		if (TelemetryUtil.shouldUseOneDataSystemSDK(key)) {
			clientFactory = (key: string) => oneDataSystemClientFactory(key, vscode, getXHROverride());
		}

		const appender = new BaseTelemetryAppender(key, clientFactory);
		// If it's a specialized AIF app insights key or a 1DS key then it is first party
		if (key && (key.indexOf("AIF-") === 0 || TelemetryUtil.shouldUseOneDataSystemSDK(key))) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, {
			release: os.release(),
			platform: os.platform(),
			architecture: os.arch(),
		}, vscode, firstParty);
	}
}
