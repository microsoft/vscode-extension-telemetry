import * as vscode from 'vscode';
export default class TelemetryReporter extends vscode.Disposable {
    private extensionId;
    private extensionVersion;
    private appInsightsClient;
    private commonProperties;
    private userOptIn;
    private toDispose;
    private static SQM_KEY;
    private static REGISTRY_USERID_VALUE;
    private static REGISTRY_MACHINEID_VALUE;
    private static TELEMETRY_CONFIG_ID;
    private static TELEMETRY_CONFIG_ENABLED_ID;
    constructor(extensionId: string, extensionVersion: string, key: string);
    private updateUserOptIn();
    private setupAIClient(client);
    private loadVSCodeCommonProperties(machineId, sessionId, version);
    private loadCommonProperties();
    private addCommonProperties(properties);
    private getWinRegKeyData(key, name, hive, callback);
    sendTelemetryEvent(eventName: string, properties?: {
        [key: string]: string;
    }, measures?: {
        [key: string]: number;
    }): void;
}
