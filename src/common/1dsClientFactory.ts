/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { AppInsightsCore, IExtendedConfiguration } from "@microsoft/1ds-core-js";
import type { IChannelConfiguration, IXHROverride, PostChannel } from "@microsoft/1ds-post-js";
import type * as vscode from "vscode";
import type { BaseTelemetryClient } from "./baseTelemetrySender";
import { SenderData } from "./baseTelemetryReporter";

/**
 * Configures 1DS properly and returns the core client object
 * @param key The ingestion key
 * @param xhrOverride An optional override to use for requests instead of the XHTMLRequest object. Useful for node environments
 * @returns The AI core object
 */
const getAICore = async (key: string, vscodeAPI: typeof vscode, xhrOverride?: IXHROverride): Promise<AppInsightsCore> => {
	const oneDs = await import(/* webpackMode: "eager" */ "@microsoft/1ds-core-js");
	const postPlugin = await import(/* webpackMode: "eager" */ "@microsoft/1ds-post-js");
	const appInsightsCore = new oneDs.AppInsightsCore();
	const collectorChannelPlugin: PostChannel = new postPlugin.PostChannel();
	// Configure the app insights core to send to collector++ and disable logging of debug info
	const coreConfig: IExtendedConfiguration = {
		instrumentationKey: key,
		endpointUrl: "https://mobile.events.data.microsoft.com/OneCollector/1.0",
		loggingLevelTelemetry: 0,
		loggingLevelConsole: 0,
		disableCookiesUsage: true,
		disableDbgExt: true,
		disableInstrumentationKeyValidation: true,
		channels: [[
			collectorChannelPlugin
		]]
	};

	if (xhrOverride) {
		coreConfig.extensionConfig = {};
		// Configure the channel to use a XHR Request override since it's not available in node
		const channelConfig: IChannelConfiguration = {
			alwaysUseXhrOverride: true,
			httpXHROverride: xhrOverride
		};
		coreConfig.extensionConfig[collectorChannelPlugin.identifier] = channelConfig;
	}

	const config = vscodeAPI.workspace.getConfiguration("telemetry");
	const internalTesting = config.get<boolean>("internalTesting");

	appInsightsCore.initialize(coreConfig, []);

	appInsightsCore.addTelemetryInitializer((envelope) => {
		// Only add this flag when `telemetry.internalTesting` is enabled
		if (!internalTesting) {
			return;
		}
		envelope["ext"] = envelope["ext"] ?? {};
		envelope["ext"]["utc"] = envelope["ext"]["utc"] ?? {};
		// Sets it to be internal only based on Windows UTC flagging
		envelope["ext"]["utc"]["flags"] = 0x0000811ECD;
	});

	return appInsightsCore;
};

/**
 * Configures and creates a telemetry client using the 1DS sdk
 * @param key The ingestion key
 * @param xhrOverride An optional override to use for requests instead of the XHTMLRequest object. Useful for node environments
 */
export const oneDataSystemClientFactory = async (key: string, vscodeAPI: typeof vscode, xhrOverride?: IXHROverride): Promise<BaseTelemetryClient> => {
	const appInsightsCore = await getAICore(key, vscodeAPI, xhrOverride);
	// Shape the app insights core from 1DS into a standard format
	const telemetryClient: BaseTelemetryClient = {
		logEvent: (eventName: string, data?: SenderData) => {
			try {
				appInsightsCore?.track({
					name: eventName,
					baseData: { name: eventName, properties: data?.properties, measurements: data?.measurements }
				});
			} catch (e: any) {
				throw new Error("Failed to log event to app insights!\n" + e.message);
			}
		},
		flush: async () => {
			try {
				appInsightsCore?.unload();
			} catch (e: any) {
				throw new Error("Failed to flush app insights!\n" + e.message);
			}
		}
	};
	return telemetryClient;
};