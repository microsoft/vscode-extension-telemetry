/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
import * as os from "os";
import * as vscode from "vscode";
import * as appInsights from "applicationinsights";
import { BaseTelemtryReporter } from "../common/baseTelemetryReporter";
class AppInsightsAppender {
    constructor(key) {
        //check if another instance is already initialized
        if (appInsights.defaultClient) {
            this._appInsightsClient = new appInsights.TelemetryClient(key);
            // no other way to enable offline mode
            this._appInsightsClient.channel.setUseDiskRetryCaching(true);
        }
        else {
            appInsights.setup(key)
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
        }
        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf("AIF-") === 0) {
            this._appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
        }
    }
    logEvent(eventName, data) {
        if (!this._appInsightsClient) {
            return;
        }
        this._appInsightsClient.trackEvent({
            name: eventName,
            properties: data === null || data === void 0 ? void 0 : data.properties,
            measurements: data === null || data === void 0 ? void 0 : data.measurements
        });
    }
    logException(exception, data) {
        if (!this._appInsightsClient) {
            return;
        }
        this._appInsightsClient.trackException({
            exception,
            properties: data === null || data === void 0 ? void 0 : data.properties,
            measurements: data === null || data === void 0 ? void 0 : data.measurements
        });
    }
    flush() {
        if (this._appInsightsClient) {
            this._appInsightsClient.flush();
            this._appInsightsClient = undefined;
        }
        return Promise.resolve(undefined);
    }
}
export default class TelemetryReporter extends BaseTelemtryReporter {
    constructor(extensionId, extensionVersion, key, firstParty) {
        const appender = new AppInsightsAppender(key);
        if (key && key.indexOf("AIF-") === 0) {
            firstParty = true;
        }
        super(extensionId, extensionVersion, appender, { release: os.release(), platform: os.platform() }, firstParty);
    }
}
//# sourceMappingURL=telemetryReporter.js.map