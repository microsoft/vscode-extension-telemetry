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

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(connectionString: string, replacementOptions?: ReplacementOption[]) {
		let clientFactory = (connectionString: string) => appInsightsClientFactory(connectionString, vscode.env.machineId, getXHROverride(), replacementOptions);
		// If connection string is usable by 1DS use the 1DS SDk
		if (TelemetryUtil.shouldUseOneDataSystemSDK(connectionString)) {
			clientFactory = (key: string) => oneDataSystemClientFactory(key, vscode, getXHROverride());
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
		super(sender, vscode, { additionalCommonProperties: TelemetryUtil.getAdditionalCommonProperties(osShim) });
	}
}
