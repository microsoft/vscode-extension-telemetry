/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as os from "os";
import * as vscode from "vscode";
import type { TelemetryClient } from "applicationinsights";
import { AppenderData, BaseTelemtryReporter, ITelemetryAppender } from "../common/baseTelemetryReporter";
import { getTelemetryLevel, TelemetryLevel } from "../common/util";

class AppInsightsAppender implements ITelemetryAppender {

	private _appInsightsClient: TelemetryClient | undefined;
	private _isInstantiated = false;

	constructor(private _key: string) {
		// If the user has telemetry enabled load the module
		if (getTelemetryLevel() !== TelemetryLevel.OFF) {
			this.instantiateAppender();
		}
	}

	logEvent(eventName: string, data?: AppenderData): void {
		if (!this._appInsightsClient) {
			return;
		}
		this._appInsightsClient.trackEvent({
			name: eventName,
			properties: data?.properties,
			measurements: data?.measurements
		});
	}

	logException(exception: Error, data?: AppenderData): void {
		if (!this._appInsightsClient) {
			return;
		}
		this._appInsightsClient.trackException({
			exception,
			properties: data?.properties,
			measurements: data?.measurements
		});
	}

	flush(): Promise<void> {
		if (this._appInsightsClient) {
			this._appInsightsClient.flush();
			this._appInsightsClient = undefined;
		}
		return Promise.resolve(undefined);
	}

	instantiateAppender(): void {
		if (this._isInstantiated) {
			return;
		}
		import("applicationinsights").then((appInsights) => {
			//check if another instance is already initialized
			if (appInsights.defaultClient) {
				this._appInsightsClient = new appInsights.TelemetryClient(this._key);
				// no other way to enable offline mode
				this._appInsightsClient.channel.setUseDiskRetryCaching(true);
			} else {
				appInsights.setup(this._key)
					.setAutoCollectRequests(false)
					.setAutoCollectPerformance(false)
					.setAutoCollectExceptions(false)
					.setAutoCollectDependencies(false)
					.setAutoDependencyCorrelation(false)
					.setAutoCollectConsole(false)
					.setUseDiskRetryCaching(true)
					.start();
				this._appInsightsClient = appInsights.defaultClient;
			}
			if (vscode && vscode.env) {
				this._appInsightsClient.context.tags[this._appInsightsClient.context.keys.userId] = vscode.env.machineId;
				this._appInsightsClient.context.tags[this._appInsightsClient.context.keys.sessionId] = vscode.env.sessionId;
				this._appInsightsClient.context.tags[this._appInsightsClient.context.keys.cloudRole] = vscode.env.appName;
				this._appInsightsClient.context.tags[this._appInsightsClient.context.keys.cloudRoleInstance] = vscode.env.appName;
			}
			//check if it's an Asimov key to change the endpoint
			if (this._key && this._key.indexOf("AIF-") === 0) {
				this._appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
			}
			this._isInstantiated = true;
		});
	}
}


export default class TelemetryReporter extends BaseTelemtryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean) {
		const appender = new AppInsightsAppender(key);
		if (key && key.indexOf("AIF-") === 0) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, { release: os.release(), platform: os.platform() }, firstParty);
	}
}