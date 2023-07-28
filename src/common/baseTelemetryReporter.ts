/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type * as vscode from "vscode";
import type { TelemetryEventMeasurements, TelemetryEventProperties } from "../../dist/telemetryReporter";
import { ILazyTelemetrySender } from "./baseTelemetrySender";

export interface SenderData {
	properties?: TelemetryEventProperties,
	measurements?: TelemetryEventMeasurements
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

export class BaseTelemetryReporter {
	private userOptIn = false;
	private errorOptIn = false;
	private readonly disposables: vscode.Disposable[] = [];
	private readonly _onDidChangeTelemetryLevel = new this.vscodeAPI.EventEmitter<"all" | "error" | "crash" | "off">();
	public readonly onDidChangeTelemetryLevel = this._onDidChangeTelemetryLevel.event;
	private readonly telemetryLogger: vscode.TelemetryLogger;

	constructor(
		private telemetrySender: ILazyTelemetrySender,
		private readonly vscodeAPI: typeof vscode,
		initializationOptions?: vscode.TelemetryLoggerOptions
	) {
		this.telemetryLogger = this.vscodeAPI.env.createTelemetryLogger(this.telemetrySender, initializationOptions);

		// Keep track of the user's opt-in status
		this.updateUserOptIn();
		this.telemetryLogger.onDidChangeEnableStates(() => {
			this.updateUserOptIn();
		});
	}

	/**
	 * Updates the user's telemetry opt-in status
	 */
	private updateUserOptIn(): void {
		this.errorOptIn = this.telemetryLogger.isErrorsEnabled;
		this.userOptIn = this.telemetryLogger.isUsageEnabled;
		// The sender is lazy loaded so if telemetry is off it's not loaded in
		if (this.telemetryLogger.isErrorsEnabled || this.telemetryLogger.isUsageEnabled) {
			this.telemetrySender.instantiateSender();
		}
		this._onDidChangeTelemetryLevel.fire(this.telemetryLevel);
	}

	public get telemetryLevel(): "all" | "error" | "crash" | "off" {
		if (this.errorOptIn && this.userOptIn) {
			return "all";
		} else if (this.errorOptIn) {
			return "error";
		} else {
			return "off";
		}
	}

	/**
	 * Internal function which logs telemetry events and takes extra options.
	 * @param eventName The name of the event
	 * @param properties The properties of the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to sanitize to the properties and measures
	 * @param dangerous Whether or not to ignore telemetry level
	 */
	private internalSendTelemetryEvent(
		eventName: string,
		properties: TelemetryEventProperties | undefined,
		measurements: TelemetryEventMeasurements | undefined,
		dangerous: boolean
	): void {
		// If it's dangerous we skip going through the logger as the logger checks opt-in status, etc.
		if (dangerous) {
			this.telemetrySender.sendEventData(eventName, { properties, measurements });
		} else {
			this.telemetryLogger.logUsage(eventName, { properties, measurements });
		}
	}

	/**
	 * Given an event name, some properties, and measurements sends a telemetry event.
	 * Properties are sanitized on best-effort basis to remove sensitive data prior to sending.
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	public sendTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		this.internalSendTelemetryEvent(eventName, properties, measurements, false);
	}


	/**
	 * Sends a raw (unsanitized) telemetry event with the given properties and measurements.
	 * NOTE: This will not be logged to the output channel due to API limitations.
	 * @param eventName The name of the event
	 * @param properties The set of properties to add to the event in the form of a string key value pair
	 * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
	 */
	public sendRawTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		const modifiedProperties = { ...properties };
		for (const property of Object.keys(modifiedProperties ?? {})) {
			if (typeof property === "string") {
				// Trusted values are not sanitized, which is what we want for raw telemetry
				modifiedProperties[property] = new this.vscodeAPI.TelemetryTrustedValue<string>(property);
			}
		}

		this.sendTelemetryEvent(eventName, modifiedProperties, measurements);

	}

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to sanitize to the properties and measures, defaults to true
	 */
	public sendDangerousTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		// Since telemetry is probably off when sending dangerously, we must start the sender
		this.telemetrySender.instantiateSender();
		this.internalSendTelemetryEvent(eventName, properties, measurements, true);
	}

	/**
	 * Internal function which logs telemetry error events and takes extra options.
	 * @param eventName The name of the event
	 * @param properties The properties of the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to sanitize to the properties and measures
	 * @param dangerous Whether or not to ignore telemetry level
	 */
	private internalSendTelemetryErrorEvent(
		eventName: string,
		properties: TelemetryEventProperties | undefined,
		measurements: TelemetryEventMeasurements | undefined,
		dangerous: boolean
	): void {
		if (dangerous) {
			this.telemetrySender.sendEventData(eventName, { properties, measurements });
		} else {
			this.telemetryLogger.logError(eventName, { properties, measurements });
		}
	}

	/**
	 * Given an event name, some properties, and measurements sends an error event
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	public sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		this.internalSendTelemetryErrorEvent(eventName, properties, measurements,false);
	}

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to run the properties and measures through sanitiziation, defaults to true
	 */
	public sendDangerousTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		// Since telemetry is probably off when sending dangerously, we must start the sender
		this.telemetrySender.instantiateSender();
		this.internalSendTelemetryErrorEvent(eventName, properties, measurements, true);
	}

	/**
	 * Disposes of the telemetry reporter
	 */
	public async dispose(): Promise<any> {
		await this.telemetrySender.dispose();
		this.telemetryLogger.dispose();
		return Promise.all(this.disposables.map(d => d.dispose()));
	}
}
