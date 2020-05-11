/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

(process.env['APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL'] as any) = true;

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import * as appInsights from 'applicationinsights';

export default class TelemetryReporter {
    private appInsightsClient: appInsights.TelemetryClient | undefined;
    private firstParty: boolean = false;
    private userOptIn: boolean = false;
    private _extension: vscode.Extension<any> | undefined;
    private readonly configListener: vscode.Disposable;

    private static TELEMETRY_CONFIG_ID = 'telemetry';
    private static TELEMETRY_CONFIG_ENABLED_ID = 'enableTelemetry';

    private logStream: fs.WriteStream | undefined;

    // tslint:disable-next-line
    constructor(private extensionId: string, private extensionVersion: string, key: string, firstParty?: boolean) {
        this.firstParty = !!firstParty;

        let logFilePath = process.env['VSCODE_LOGS'] || '';
        if (logFilePath && extensionId && process.env['VSCODE_LOG_LEVEL'] === 'trace') {
            logFilePath = path.join(logFilePath, `${extensionId}.txt`);
            this.logStream = fs.createWriteStream(logFilePath, { flags: 'a', encoding: 'utf8', autoClose: true });
        }
        this.updateUserOptIn(key);
        this.configListener = vscode.workspace.onDidChangeConfiguration(() => this.updateUserOptIn(key));
    }

    private updateUserOptIn(key: string): void {
        const config = vscode.workspace.getConfiguration(TelemetryReporter.TELEMETRY_CONFIG_ID);
        if (this.userOptIn !== config.get<boolean>(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true)) {
            this.userOptIn = config.get<boolean>(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true);
            if (this.userOptIn) {
                this.createAppInsightsClient(key);
            } else {
                this.dispose();
            }
        }
    }

    private createAppInsightsClient(key: string) {
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
        if (vscode && vscode.env) {
            this.appInsightsClient.context.tags[this.appInsightsClient.context.keys.userId] = vscode.env.machineId;
            this.appInsightsClient.context.tags[this.appInsightsClient.context.keys.sessionId] = vscode.env.sessionId;
        }
        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf('AIF-') === 0) {
            this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
            this.firstParty = true;
        }
    }

    // __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodemachineid" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.uikind" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.remotename" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    private getCommonProperties(): { [key: string]: string } {
        const commonProperties = Object.create(null);
        commonProperties['common.os'] = os.platform();
        commonProperties['common.platformversion'] = (os.release() || '').replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, '$1$2$3');
        commonProperties['common.extname'] = this.extensionId;
        commonProperties['common.extversion'] = this.extensionVersion;
        if (vscode && vscode.env) {
            commonProperties['common.vscodemachineid'] = vscode.env.machineId;
            commonProperties['common.vscodesessionid'] = vscode.env.sessionId;
            commonProperties['common.vscodeversion'] = vscode.version;

            switch (vscode.env.uiKind) {
                case vscode.UIKind.Web:
                    commonProperties['common.uikind'] = 'web';
                    break;
                case vscode.UIKind.Desktop:
                    commonProperties['common.uikind'] = 'desktop';
                    break;
                default:
                    commonProperties['common.uikind'] = 'unknown';
            }

            commonProperties['common.remotename'] = this.cleanRemoteName(vscode.env.remoteName);
        }
        return commonProperties;
    }

    private cleanRemoteName(remoteName?: string): string {
        if (!remoteName) {
            return 'none';
        }

        let ret = 'other';
        // Allowed remote authorities
        ['ssh-remote', 'dev-container', 'attached-container', 'wsl'].forEach((res: string) => {
            if (remoteName!.indexOf(`${res}+`) === 0) {
                ret = res;
            }
        });

        return ret;
    }

    private shouldSendErrorTelemetry(): boolean {
        if (this.firstParty) {
            if (this.cleanRemoteName(vscode.env.remoteName) !== 'other') {
                return true;
            }

            if (this.extension === undefined || this.extension.extensionKind === vscode.ExtensionKind.Workspace) {
                return false;
            }

            if (vscode.env.uiKind === vscode.UIKind.Web) {
                return false;
            }

            return true;
        }

        return true;
    }

    private get extension(): vscode.Extension<any> | undefined {
        if (this._extension === undefined) {
            this._extension = vscode.extensions.getExtension(this.extensionId);
        }

        return this._extension;
    }

    private cloneAndChange(obj?: { [key: string]: string }, change?: (key: string, val: string) => string): { [key: string]: string } | undefined {
        if (obj === null || typeof obj !== 'object') return obj;
        if (typeof change !== 'function') return obj;

        const ret: { [key: string ]: string } = {};
        for (const key in obj) {
            ret[key] = change(key, obj[key]);
        }

        return ret;
    }

    private anonymizeFilePaths(stack?: string, anonymizeFilePaths?: boolean): string {
        if (stack === undefined || stack === null) {
            return '';
        }

        const cleanupPatterns = [new RegExp(vscode.env.appRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')];

        if (this.extension) {
            cleanupPatterns.push(new RegExp(this.extension.extensionPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));
        }

        let updatedStack = stack;

        if (anonymizeFilePaths) {
            const cleanUpIndexes: [number, number][] = [];
            for (let regexp of cleanupPatterns) {
                while (true) {
                    const result = regexp.exec(stack);
                    if (!result) {
                        break;
                    }
                    cleanUpIndexes.push([result.index, regexp.lastIndex]);
                }
            }

            const nodeModulesRegex = /^[\\\/]?(node_modules|node_modules\.asar)[\\\/]/;
            const fileRegex = /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-\._]+(\\\\|\\|\/))+[\w-\._]*/g;
            let lastIndex = 0;
            updatedStack = '';

            while (true) {
                const result = fileRegex.exec(stack);
                if (!result) {
                    break;
                }
                // Anoynimize user file paths that do not need to be retained or cleaned up.
                if (!nodeModulesRegex.test(result[0]) && cleanUpIndexes.every(([x, y]) => result.index < x || result.index >= y)) {
                    updatedStack += stack.substring(lastIndex, result.index) + '<REDACTED: user-file-path>';
                    lastIndex = fileRegex.lastIndex;
                }
            }
            if (lastIndex < stack.length) {
                updatedStack += stack.substr(lastIndex);
            }
        }

        // sanitize with configured cleanup patterns
        for (let regexp of cleanupPatterns) {
            updatedStack = updatedStack.replace(regexp, '');
        }
        return updatedStack;
    }

    public sendTelemetryEvent(eventName: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }): void {
        if (this.userOptIn && eventName && this.appInsightsClient) {
            const cleanProperties = this.cloneAndChange(properties, (_key: string, prop: string) => this.anonymizeFilePaths(prop, this.firstParty));

            this.appInsightsClient.trackEvent({
                name: `${this.extensionId}/${eventName}`,
                properties: cleanProperties,
                measurements: measurements
            })

            if (this.logStream) {
                this.logStream.write(`telemetry/${eventName} ${JSON.stringify({ properties, measurements })}\n`);
            }
        }
    }

    public sendTelemetryErrorEvent(eventName: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }, errorProps?: string[]): void {
        if (this.userOptIn && eventName && this.appInsightsClient) {
            // always clean the properties if first party
            // do not send any error properties if we shouldn't send error telemetry
            // if we have no errorProps, assume all are error props
            const cleanProperties = this.cloneAndChange(properties, (key: string, prop: string) => {
                if (this.shouldSendErrorTelemetry()) {
                    return this.anonymizeFilePaths(prop, this.firstParty)
                }

                if (errorProps === undefined || errorProps.indexOf(key) !== -1) {
                    return 'REDACTED';
                }

                return this.anonymizeFilePaths(prop, this.firstParty);
            });

            this.appInsightsClient.trackEvent({
                name: `${this.extensionId}/${eventName}`,
                properties: cleanProperties,
                measurements: measurements
            })

            if (this.logStream) {
                this.logStream.write(`telemetry/${eventName} ${JSON.stringify({ properties, measurements })}\n`);
            }
        }
    }

    public sendTelemetryException(error: Error, properties?: { [key: string]: string }, measurements?: { [key: string]: number }): void {
        if (this.shouldSendErrorTelemetry() && this.userOptIn && error && this.appInsightsClient) {
            const cleanProperties = this.cloneAndChange(properties, (_key: string, prop: string) => this.anonymizeFilePaths(prop, this.firstParty));

            this.appInsightsClient.trackException({
                exception: error,
                properties: cleanProperties,
                measurements: measurements
            })

            if (this.logStream) {
                this.logStream.write(`telemetry/${error.name} ${error.message} ${JSON.stringify({ properties, measurements })}\n`);
            }
        }
    }

    public dispose(): Promise<any> {

        this.configListener.dispose();

        const flushEventsToLogger = new Promise<any>(resolve => {
            if (!this.logStream) {
                return resolve(void 0);
            }
            this.logStream.on('finish', resolve);
            this.logStream.end();
        });

        const flushEventsToAI = new Promise<any>(resolve => {
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
        return Promise.all([flushEventsToAI, flushEventsToLogger]);
    }
}
