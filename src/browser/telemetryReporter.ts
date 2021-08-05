/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { BaseTelemtryReporter, ITelemetryAppender } from "../common/baseTelemetryReporter";

class WebAppInsightsAppender implements ITelemetryAppender {
	private _aiClient: ApplicationInsights | undefined;

	constructor(key: string) {

		let endpointUrl: undefined | string;
		if (key && key.indexOf("AIF-") === 0) {
			endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
		}

		this._aiClient = new ApplicationInsights({
			config: {
				instrumentationKey: key,
				endpointUrl,
				disableAjaxTracking: true,
				disableExceptionTracking: true,
				disableFetchTracking: true,
				disableCorrelationHeaders: true,
				disableCookiesUsage: true,
				autoTrackPageVisitTime: false,
				emitLineDelimitedJson: true,
			},
		});
		this._aiClient.loadAppInsights();

		if (vscode && vscode.env) {
			this._aiClient.context.user.id = vscode.env.machineId;
			this._aiClient.context.session.id = vscode.env.sessionId;
		}

		// If we cannot access the endpoint this most likely means it's being blocked
		// and we should not attempt to send any telemetry.
		if (endpointUrl) {
			fetch(endpointUrl).catch(() => (this._aiClient = undefined));
		}
	}

	public logEvent(eventName: string, data: any): void {
		if (!this._aiClient) {
			return;
		}
		this._aiClient.trackEvent({ name: eventName }, { ...data.properties, ...data.measurements });
	}

	public logException(exception: Error, data: any): void {
		if (!this._aiClient) {
			return;
		}
		this._aiClient.trackException({ exception, properties: { ...data.properties, ...data.measurements } });
	}

	public flush(): Promise<any> {
		if (this._aiClient) {
			this._aiClient.flush();
			this._aiClient = undefined;
		}
		return Promise.resolve(undefined);
	}
}

export default class TelemetryReporter extends BaseTelemtryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean) {
		const appender = new WebAppInsightsAppender(key);
		if (key && key.indexOf("AIF-") === 0) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, { release: navigator.appVersion, platform: "web" }, firstParty);
	}
}