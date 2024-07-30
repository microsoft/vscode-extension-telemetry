/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";
import { appInsightsClientFactory } from "../common/appInsightsClientFactory";
import { BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { BaseTelemetrySender } from "../common/baseTelemetrySender";
import { TelemetryUtil } from "../common/util";

function getBrowserRelease(navigator: Navigator): string {
	if (navigator.userAgentData) {
		const browser = navigator.userAgentData.brands[navigator.userAgentData.brands.length - 1];
		return `${navigator.userAgentData.platform} - ${browser?.brand} v${browser?.version}}`;
	} else {
		// clean the user agent using the logic from here:
		// https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/telemetry/browser/workbenchCommonProperties.ts#L14C1-L21C2
		return navigator.userAgent.replace(/(\d+\.\d+)(\.\d+)+/g, "$1");
	}
}

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(connectionString: string, replacementOptions?: ReplacementOption[]) {
		let clientFactory = (connectionString: string) => appInsightsClientFactory(connectionString, vscode.env.machineId, undefined, replacementOptions);
		// If key is usable by 1DS use the 1DS SDk
		if (TelemetryUtil.shouldUseOneDataSystemSDK(connectionString)) {
			clientFactory = (key: string) => oneDataSystemClientFactory(key, vscode);
		}

		const osShim = {
			release: getBrowserRelease(navigator),
			platform: "web",
			architecture: "web",
		};

		const sender = new BaseTelemetrySender(connectionString, clientFactory);
		// AIF is no longer supported
		if (connectionString && (connectionString.indexOf("AIF") === 0)) {
			throw new Error("AIF keys are no longer supported. Please switch to 1DS keys for 1st party extensions");
		}
		super(sender, vscode, { additionalCommonProperties: TelemetryUtil.getAdditionalCommonProperties(osShim) });
	}
}
