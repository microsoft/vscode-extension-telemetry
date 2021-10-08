/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { AppenderData, BaseTelemetryReporter, ITelemetryAppender } from "../common/baseTelemetryReporter";
import { getTelemetryLevel, TelemetryLevel } from "../common/util";

class WebAppInsightsAppender implements ITelemetryAppender {
	private _aiClient: ApplicationInsights | undefined;
	private _isInstantiated = false;

	constructor(private _key: string) {
		if (getTelemetryLevel() !== TelemetryLevel.OFF) {
			this.instantiateAppender();
		}
	}

	public logEvent(eventName: string, data: AppenderData): void {
		if (!this._aiClient) {
			return;
		}
		this._aiClient.trackEvent({ name: eventName }, { ...data.properties, ...data.measurements });
	}

	public logException(exception: Error, data: AppenderData): void {
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

	public instantiateAppender(): void {
		if (this._isInstantiated) {
			return;
		}
		import("@microsoft/applicationinsights-web").then((web) => {
			let endpointUrl: undefined | string;
			if (this._key && this._key.indexOf("AIF-") === 0) {
				endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
			}

			this._aiClient = new web.ApplicationInsights({
				config: {
					instrumentationKey: this._key,
					endpointUrl,
					disableAjaxTracking: true,
					disableExceptionTracking: true,
					disableFetchTracking: true,
					disableCorrelationHeaders: true,
					disableCookiesUsage: true,
					autoTrackPageVisitTime: false,
					emitLineDelimitedJson: true,
					disableInstrumentationKeyValidation: true
				},
			});
			this._aiClient.loadAppInsights();

			// If we cannot access the endpoint this most likely means it's being blocked
			// and we should not attempt to send any telemetry.
			const telemetryLevel = getTelemetryLevel();
			if (endpointUrl && (telemetryLevel === TelemetryLevel.ON || telemetryLevel === TelemetryLevel.ERROR)) {
				fetch(endpointUrl).catch(() => (this._aiClient = undefined));
			}
			this._isInstantiated = true;
	});
	}
}

export default class TelemetryReporter extends BaseTelemetryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean) {
		const appender = new WebAppInsightsAppender(key);
		if (key && key.indexOf("AIF-") === 0) {
			firstParty = true;
		}
		super(extensionId, extensionVersion, appender, { release: navigator.appVersion, platform: "web" }, firstParty);
	}
}