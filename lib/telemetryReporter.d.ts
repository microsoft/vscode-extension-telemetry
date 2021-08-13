/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

export interface TelemetryEventProperties {
	readonly [key: string]: string;
}
export interface TelemetryEventMeasurements {
	readonly [key: string]: number;
}
export default class TelemetryReporter {
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean);
	sendTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;
	sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, errorProps?: string[]): void;
	sendTelemetryException(error: Error, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;
	dispose(): Promise<any>;
}
