export interface TelemetryEventProperties {
    readonly [key: string]: string;
}
export interface TelemetryEventMeasurements {
    readonly [key: string]: number;
}
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
    sendTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;
    sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, errorProps?: string[]): void;
    sendTelemetryException(error: Error, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;
    dispose(): Promise<any>;
}
