/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import * as os from 'os';
import * as vscode from 'vscode';
import * as appInsights from 'applicationinsights';
import * as winreg from 'winreg';

export default class TelemetryReporter {
    private appInsightsClient: typeof appInsights.client;
    private commonProperties: { [key: string]: string };

    private static SQM_KEY: string = '\\SOFTWARE\\Microsoft\\SQMClient';
    private static REGISTRY_USERID_VALUE: string = 'UserId';
    private static REGISTRY_MACHINEID_VALUE: string = 'MachineId';

    constructor(private extensionId: string, private extensionVersion: string, key: string) {

        //check if another instance is already initialized
        if (appInsights.client) {
            this.appInsightsClient = appInsights.getClient(key);
            // no other way to enable offline mode
            this.appInsightsClient.channel.setOfflineMode(true);

        } else {
            this.appInsightsClient = appInsights.setup(key)
                .setAutoCollectRequests(false)
                .setAutoCollectPerformance(false)
                .setAutoCollectExceptions(false)
                .setOfflineMode(true)
                .start()
                .client;
        }

        //prevent AI from reporting PII
        this.setupAIClient(this.appInsightsClient);

        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf('AIF-') === 0) {
            this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
        }

        this.loadCommonProperties();

        if (vscode && vscode.env) {
            this.loadVSCodeCommonProperties(vscode.env.machineId, vscode.env.sessionId, vscode.version);
        }
    }

    private setupAIClient(client: typeof ApplicationInsights.client): void {
        if (client && client.context &&
            client.context.keys && client.context.tags) {
            var machineNameKey = client.context.keys.deviceMachineName;
            client.context.tags[machineNameKey] = '';
        }
    }

    private loadVSCodeCommonProperties(machineId: string, sessionId: string, version: string): void {
        this.commonProperties = this.commonProperties || Object.create(null);
        this.commonProperties['vscodemachineid'] = machineId;
        this.commonProperties['vscodesessionid'] = sessionId;
        this.commonProperties['vscodeversion'] = version;
    }

    private loadCommonProperties(): void {
        this.commonProperties = this.commonProperties || Object.create(null);
        this.commonProperties['os'] = os.platform();
        this.commonProperties['osversion'] = os.release();
        this.commonProperties['extname'] = this.extensionId; 
        this.commonProperties['extversion'] = this.extensionVersion; 
        
        // add SQM data for windows machines
        if (process.platform === 'win32') {
            this.getWinRegKeyData(TelemetryReporter.SQM_KEY, TelemetryReporter.REGISTRY_USERID_VALUE, winreg.HKCU, (error, result: string) => {
                if (!error && result) {
                    this.commonProperties['sqmid'] = result;
                }
            });

            this.getWinRegKeyData(TelemetryReporter.SQM_KEY, TelemetryReporter.REGISTRY_MACHINEID_VALUE, winreg.HKLM, (error, result) => {
                if (!error && result) {
                    this.commonProperties['sqmmachineid'] = result;
                }
            });
        }
    }

    private addCommonProperties(properties: { [key: string]: string }): { [key: string]: string } {
        for (var prop in this.commonProperties) {
            properties['common.' + prop] = this.commonProperties[prop];
        }
        return properties;
    }

    private getWinRegKeyData(key: string, name: string, hive: string, callback: (error: Error, userId: string) => void): void {
        if (process.platform === 'win32') {
            try {
                var reg = new winreg({
                    hive: hive,
                    key: key
                });

                reg.get(name, (e, result) => {
                    if (e || !result) {
                        callback(e, null);
                    } else {
                        callback(null, result.value);
                    }
                });
            } catch (err) {
                callback(err, null);
            }
        } else {
            callback(null, null);
        }
    }

    public sendTelemetryEvent(eventName: string, properties?: { [key: string]: string }, measures?: { [key: string]: number }): void {
        if (eventName) {
            properties = properties || Object.create(null);
            properties = this.addCommonProperties(properties);
            this.appInsightsClient.trackEvent(`${this.extensionId}/${eventName}`, properties, measures);
        }
    }
}