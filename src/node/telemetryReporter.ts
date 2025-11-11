/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type { IPayloadData, IXHROverride } from "@microsoft/1ds-post-js";
import * as https from "https";
import * as os from "os";
import * as vscode from "vscode";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";
import { appInsightsClientFactory } from "../common/appInsightsClientFactory";
import { BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { BaseTelemetrySender } from "../common/baseTelemetrySender";
import { TelemetryUtil } from "../common/util";

/**
 * A custom fetcher function that can be used to send telemetry data.
 * Compatible with the Node.js fetch API signature.
 * @param url The URL to send the request to
 * @param init The request initialization options including method, headers, and body
 * @returns A promise that resolves to a Response object
 */
export type CustomFetcher = (
	url: string,
	init?: { method: "POST"; headers?: Record<string, string>; body?: string }
) => Promise<{text: () => Promise<string>; status: number; headers: Iterable<[string, string]>}>;

/**
 * Create a replacement for the XHTMLRequest object utilizing nodes HTTP module.
 * @returns A XHR override object used to override the XHTMLRequest object in the 1DS SDK
 */
function getDefaultXHROverride(): IXHROverride {
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
						oncomplete(res.statusCode ?? 200, res.headers as Record<string, string>, responseData.toString());
					});
					// On response with error send status of 0 and a blank response to oncomplete so we can retry events
					res.on("error", function () {
						oncomplete(0, {});
					});
				});
				req.write(payload.data, (err) => {
					if (err) {
						oncomplete(0, {});
					}
				});
				req.end();
			} catch {
				// If it errors out, send status of 0 and a blank response to oncomplete so we can retry events
				oncomplete(0, {});
			}
		}
	};
	return customHttpXHROverride;
}

/**
 * Create an XHR override from a custom fetcher function.
 * @param fetcher The custom fetcher function to use for sending telemetry data
 * @returns A XHR override object used to override the XHTMLRequest object in the 1DS SDK
 */
function createXHROverrideFromFetcher(fetcher: CustomFetcher): IXHROverride {
	const xhrOverride: IXHROverride = {
		sendPOST: (payload: IPayloadData, oncomplete) => {
			const dataString = typeof payload.data === "string" ? payload.data : Buffer.from(payload.data).toString();

			fetcher(payload.urlString, { method: "POST", headers: payload.headers, body: dataString })
				.then(async (response) => {
					const responseHeaders: Record<string, string> = {};
					for (const [key, value] of response.headers) {
						responseHeaders[key] = value;
					}
					const body = await response.text();
					oncomplete(response.status, responseHeaders, body);
				})
				.catch(() => {
					// If it errors out, send status of 0 and a blank response to oncomplete so we can retry events
					oncomplete(0, {});
				});
		}
	};
	return xhrOverride;
}

export class TelemetryReporter extends BaseTelemetryReporter {
	constructor(
		connectionString: string,
		replacementOptions?: ReplacementOption[],
		initializationOptions?: vscode.TelemetryLoggerOptions,
		customFetcher?: CustomFetcher
	) {
		const xhrOverride = customFetcher ? createXHROverrideFromFetcher(customFetcher) : getDefaultXHROverride();
		let clientFactory = (connectionString: string) => appInsightsClientFactory(connectionString, vscode.env.machineId, vscode.env.sessionId, xhrOverride, replacementOptions);
		// If connection string is usable by 1DS use the 1DS SDk
		if (TelemetryUtil.shouldUseOneDataSystemSDK(connectionString)) {
			clientFactory = (key: string) => oneDataSystemClientFactory(key, vscode, xhrOverride);
		}

		const osShim = {
			release: os.release(),
			platform: os.platform(),
			architecture: os.arch(),
		};

		const sender = new BaseTelemetrySender(connectionString, clientFactory,);
		if (connectionString && connectionString.indexOf("AIF-") === 0) {
			throw new Error("AIF keys are no longer supported. Please switch to 1DS keys for 1st party extensions");
		}
		const initializationOpts = {
			...initializationOptions,
			additionalCommonProperties: initializationOptions?.additionalCommonProperties ?
				{ ...initializationOptions.additionalCommonProperties, ...TelemetryUtil.getAdditionalCommonProperties(osShim) }
				: TelemetryUtil.getAdditionalCommonProperties(osShim)
		};
		super(sender, vscode, initializationOpts);
	}
}
