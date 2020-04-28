export default class TelemetryReporter {
    private extensionId;
    private extensionVersion;
    private appInsightsClient;
    private firstParty;
    private userOptIn;
    private _extension;
    private readonly configListener;
    private static TELEMETRY_CONFIG_ID;
    private static TELEMETRY_CONFIG_ENABLED_ID;
    private logStream;
    constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean);
    private updateUserOptIn;
    private createAppInsightsClient;
    private getCommonProperties;
    private cleanRemoteName;
    private shouldSendErrorTelemetry;
    private readonly extension;
    private cloneAndChange;
    private anonymizeFilePaths;
    sendTelemetryEvent(eventName: string, properties?: {
        [key: string]: string;
    }, measurements?: {
        [key: string]: number;
    }): void;
    sendTelemetryErrorEvent(eventName: string, properties?: {
        [key: string]: string;
    }, measurements?: {
        [key: string]: number;
    }, errorProps?: string[]): void;
    sendTelemetryException(error: Error, properties?: {
        [key: string]: string;
    }, measurements?: {
        [key: string]: number;
    }): void;
    dispose(): Promise<any>;
}
