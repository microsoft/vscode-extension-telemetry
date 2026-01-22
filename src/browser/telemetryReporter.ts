/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";
import { AppInsightsClientOptions, appInsightsClientFactory } from "../common/appInsightsClientFactory";
import { BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { BaseTelemetrySender } from "../common/baseTelemetrySender";
import { TelemetryUtil } from "../common/util";

// Re-export AppInsightsClientOptions for consumers
export type { AppInsightsClientOptions } from "../common/appInsightsClientFactory";

function getBrowserRelease(navigator: Navigator): string {
	if (navigator.userAgentData) {
		const browser = navigator.userAgentData.brands[navigator.userAgentData.brands.length - 1];
		return `${navigator.userAgentData.platform} - ${browser?.brand} v${browser?.version}`;
	} else {
		// clean the user agent using the logic from here:
		// https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/telemetry/browser/workbenchCommonProperties.ts#L14C1-L21C2
		return navigator.userAgent.replace(/(\d+\.\d+)(\.\d+)+/g, "$1");
	}
}

export class TelemetryReporter extends BaseTelemetryReporter {
	constructor(
		connectionString: string, 
		replacementOptions?: ReplacementOption[], 
		initializationOptions?: vscode.TelemetryLoggerOptions,
		appInsightsOptions?: AppInsightsClientOptions
	) {
		let clientFactory = (connectionString: string) => appInsightsClientFactory(connectionString, vscode.env.machineId, vscode.env.sessionId, undefined, replacementOptions, appInsightsOptions);
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

		const initializationOpts = {
			...initializationOptions,
			additionalCommonProperties: initializationOptions?.additionalCommonProperties ?
				{ ...initializationOptions.additionalCommonProperties, ...TelemetryUtil.getAdditionalCommonProperties(osShim) }
				: TelemetryUtil.getAdditionalCommonProperties(osShim)
		};

		super(sender, vscode, initializationOpts);
	}
}
