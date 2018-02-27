/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

process.env['APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL'] = true;

import * as os from 'os';
import * as vscode from 'vscode';
import * as appInsights from 'applicationinsights';

export default class TelemetryReporter extends vscode.Disposable {
    private appInsightsClient: appInsights.TelemetryClient | undefined;
    private userOptIn: boolean = true;
    private toDispose: vscode.Disposable[] = [];

    private static TELEMETRY_CONFIG_ID = 'telemetry';
    private static TELEMETRY_CONFIG_ENABLED_ID = 'enableTelemetry';

    constructor(private extensionId: string, private extensionVersion: string, key: string) {
        super(() => this.toDispose.forEach((d) => d && d.dispose()))

        //check if another instance is already initialized
        if (appInsights.defaultClient) {
            this.appInsightsClient = new appInsights.TelemetryClient(key);
            // no other way to enable offline mode
            this.appInsightsClient.channel.setUseDiskRetryCaching(true);
        } else {
            appInsights.setup(key)
                .setAutoCollectRequests(false)
                .setAutoCollectPerformance(false)
                .setAutoCollectExceptions(false)
                .setAutoCollectDependencies(false)
                .setAutoDependencyCorrelation(false)
                .setAutoCollectConsole(false)
                .setUseDiskRetryCaching(true)
                .start();
           this.appInsightsClient = appInsights.defaultClient;
        }
        
        this.appInsightsClient.commonProperties = this.getCommonProperties();

        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf('AIF-') === 0) {
            this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
        }
        
        this.updateUserOptIn();
        this.toDispose.push(vscode.workspace.onDidChangeConfiguration(() => this.updateUserOptIn()));
    }

    private updateUserOptIn(): void {
        const config = vscode.workspace.getConfiguration(TelemetryReporter.TELEMETRY_CONFIG_ID);
        this.userOptIn = config.get<boolean>(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true);
    }

    // __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.osversion" : { "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodemachineid" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
   private getCommonProperties(): { [key: string]: string } {
        const commonProperties = Object.create(null);
        commonProperties['common.os'] = os.platform();
        commonProperties['common.platformversion'] = (os.release() || '').replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, '$1$2$3');
        commonProperties['common.osversion'] = commonProperties['common.platformversion']; //TODO: Drop this post Nova
        commonProperties['common.extname'] = this.extensionId;
        commonProperties['common.extversion'] = this.extensionVersion;
        if (vscode && vscode.env) {
            commonProperties['common.vscodemachineid'] = vscode.env.machineId;
            commonProperties['common.vscodesessionid'] = vscode.env.sessionId;
            commonProperties['common.vscodeversion'] = vscode.version;
        }
        return commonProperties;
    }
    
    public sendTelemetryEvent(eventName: string, properties?: { [key: string]: string }, measures?: { [key: string]: number }): void {
        if (this.userOptIn && eventName && this.appInsightsClient) {
            this.appInsightsClient.trackEvent({
                name: `${this.extensionId}/${eventName}`,
                properties: properties,
                measurements: measures
            })
        }
    }

    public dispose(): Promise<any> {
        return new Promise<any>(resolve => {
            if (this.appInsightsClient) {
                this.appInsightsClient.flush({
                    callback: () => {
                        // all data flushed
                        this.appInsightsClient = undefined;
                        resolve(void 0);
                    }
                });
            } else {
                resolve(void 0);
            }
        });

    }
}