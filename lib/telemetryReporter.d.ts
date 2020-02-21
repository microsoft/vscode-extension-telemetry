export default class TelemetryReporter {
    private extensionId;
    private extensionVersion;
    private appInsightsClient;
    private userOptIn;
    private readonly configListener;
    private static TELEMETRY_CONFIG_ID;
    private static TELEMETRY_CONFIG_ENABLED_ID;
    private logStream;
    constructor(extensionId: string, extensionVersion: string, key: string);
    private updateUserOptIn;
    private createAppInsightsClient;
    private getCommonProperties;
    sendTelemetryEvent(eventName: string, properties?: {
        [key: string]: string;
    }, measurements?: {
        [key: string]: number;
    }): void;
    sendTelemetryMetric(
        eventName: string,
        value: number,
        properties?: {
            [key: string]: string;
        },
        count?: number,
        min?: number,
        max?: number,
        stdDev?: number
    ): void;
    sendTelemetryException(error: Error, properties?: {
        [key: string]: string;
    }, measurements?: {
        [key: string]: number;
    }): void;
    dispose(): Promise<any>;
}
