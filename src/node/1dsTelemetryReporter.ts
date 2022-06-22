/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type { IPayloadData, IXHROverride } from "@microsoft/1ds-post-js";
import * as os from "os";
import * as https from "https";
import * as vscode from "vscode";
import { BaseTelemetryAppender } from "../common/baseTelemetryAppender";
import { BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";


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
	// TODO add ReplacementOption support
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean, _replacementOptions?: ReplacementOption[]) {
		const appender = new BaseTelemetryAppender(key, (key) => oneDataSystemClientFactory(key, getXHROverride()));
		// 1DS only supports first party so this is always true
		firstParty = true;
		super(extensionId, extensionVersion, appender, {
			release: os.release(),
			platform: os.platform(),
			architecture: os.arch(),
		}, vscode, firstParty);
	}
}
