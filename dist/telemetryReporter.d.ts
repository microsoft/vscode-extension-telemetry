/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

export interface TelemetryEventProperties {
	readonly [key: string]: string | import("vscode").TelemetryTrustedValue<string> | undefined;
}

export interface TelemetryEventMeasurements {
	readonly [key: string]: number | undefined;
}

/**
 * A replacement option for the app insights client. This allows the sender to filter out any sensitive or unnecessary information from the telemetry server.
 */
export interface ReplacementOption {

	/**
	 * A regular expression matching any property to be removed or replaced from the telemetry server.
	 */
	lookup: RegExp;

	/**
	 * The replacement value for the property. If not present or undefined, the property will be removed.
	 */
	replacementString?: string;
}

/**
 * A custom fetcher function that can be used to send telemetry data.
 * Compatible with the Node.js fetch API signature.
 * @param url The URL to send the request to
 * @param init The request initialization options including method, headers, and body
 * @returns A promise that resolves to a Response object
 */
export type CustomFetcher = (
	url: string,
	init?: { method: "POST"; headers?: Record<string, string>; body?: string }
) => Promise<{text: () => Promise<string>; status: number; headers: Iterable<[string, string]>}>;

export class TelemetryReporter {
	/**
	 * @param connectionString The app insights connection string
	 * @param replacementOptions A list of replacement options for the app insights client. This allows the sender to filter out any sensitive or unnecessary information from the telemetry server.
	 * @param initializationOptions Options for configuring the telemetry reporter, including additional common properties to be sent with each event.
	 * @param customFetcher An optional custom fetcher function to use for sending telemetry data. If not provided, the default HTTPS module will be used. Compatible with Node.js fetch API.
	 */
	constructor(connectionString: string, replacementOptions?: ReplacementOption[], initializationOptions?: import("vscode").TelemetryLoggerOptions, customFetcher?: CustomFetcher);

	/**
	 * A string representation of the current level of telemetry being collected
	 */
	telemetryLevel: 'all' | 'error' | 'crash' | 'off';

	/**
	 * An event that is fired when the telemetry level is changed
	 */
	onDidChangeTelemetryLevel: import("vscode").Event<'all' | 'error' | 'crash' | 'off'>;

	/**
	 * Sends a telemetry event with the given properties and measurements
	 * Properties are sanitized on best-effort basis to remove sensitive data prior to sending.
	 * @param eventName The name of the event
	 * @param properties The set of properties to add to the event in the form of a string key value pair
	 * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
	 */
	sendTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;

	/**
	 * Sends a raw (unsanitized) telemetry event with the given properties and measurements
	 * NOTE: This will not be logged to the output channel due to API limitations.
	 * @param eventName The name of the event
	 * @param properties The set of properties to add to the event in the form of a string key value pair
	 * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
	 */
	sendRawTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * NOTE: This will not be logged to the output channel due to API limitations.
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	sendDangerousTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;

	/**
	 * Sends a telemetry error event with the given properties, measurements.
	 * **Note**: The errorProps parameter has been removed since v0.6, if you would like to remove a property please use the replacementOptions parameter in the constructor.
	 * @param eventName The name of the event
	 * @param properties The set of properties to add to the event in the form of a string key value pair
	 * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
	 */
	sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * NOTE: This will not be logged to the output channel due to API limitations.
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	sendDangerousTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void;

	/**
	 * Disposes of the telemetry reporter. This flushes the remaining events and disposes of the telemetry client.
	 */
	dispose(): Promise<any>;
}
