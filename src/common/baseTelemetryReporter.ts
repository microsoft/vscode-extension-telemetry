/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type * as vscode from "vscode";
import type { TelemetryEventMeasurements, TelemetryEventProperties } from "../../dist/telemetryReporter";
import { ILazyTelemetrySender } from "./baseTelemetrySender";

export interface SenderData {
	properties?: TelemetryEventProperties,
	measurements?: TelemetryEventMeasurements,
	/**
	 * Optional tag overrides for this specific event.
	 * These override client-level tagOverrides set in AppInsightsClientOptions.
	 * Commonly used for dynamic tracking IDs that change per event.
	 * Example: { 'ai.user.id': dynamicTrackingId }
	 */
	tagOverrides?: Record<string, string>
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
	/**
	 * Context tags that are applied to all telemetry events.
	 * Similar to client.context.tags in the full Application Insights SDK.
	 */
	private readonly contextTags: Record<string, string> = {};

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
	 * @param tagOverrides Optional per-event tag overrides
	 * @param dangerous Whether or not to ignore telemetry level
	 */
	private internalSendTelemetryEvent(
		eventName: string,
		properties: TelemetryEventProperties | undefined,
		measurements: TelemetryEventMeasurements | undefined,
		tagOverrides: Record<string, string> | undefined,
		dangerous: boolean
	): void {
		// Merge context tags with per-event tag overrides
		// Per-event overrides take precedence over context tags
		const effectiveTagOverrides = Object.keys(this.contextTags).length > 0 || tagOverrides
			? { ...this.contextTags, ...tagOverrides }
			: undefined;

		// If it's dangerous we skip going through the logger as the logger checks opt-in status, etc.
		if (dangerous) {
			this.telemetrySender.sendEventData(eventName, { properties, measurements, tagOverrides: effectiveTagOverrides });
		} else {
			this.telemetryLogger.logUsage(eventName, { properties, measurements, tagOverrides: effectiveTagOverrides });
		}
	}

	/**
	 * Given an event name, some properties, and measurements sends a telemetry event.
	 * Properties are sanitized on best-effort basis to remove sensitive data prior to sending.
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
	 */
	public sendTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, tagOverrides?: Record<string, string>): void {
		this.internalSendTelemetryEvent(eventName, properties, measurements, tagOverrides, false);
	}


	/**
	 * Sends a raw (unsanitized) telemetry event with the given properties and measurements.
	 * NOTE: This will not be logged to the output channel due to API limitations.
	 * @param eventName The name of the event
	 * @param properties The set of properties to add to the event in the form of a string key value pair
	 * @param measurements The set of measurements to add to the event in the form of a string key  number value pair
	 * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
	 */
	public sendRawTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, tagOverrides?: Record<string, string>): void {
		const modifiedProperties = { ...properties };
		for (const propertyKey of Object.keys(modifiedProperties ?? {})) {
			const propertyValue = modifiedProperties[propertyKey];
			if (typeof propertyKey === "string" && propertyValue !== undefined) {
				// Trusted values are not sanitized, which is what we want for raw telemetry
				modifiedProperties[propertyKey] = new this.vscodeAPI.TelemetryTrustedValue<string>(typeof propertyValue === "string" ? propertyValue : propertyValue.value);
			}
		}

		this.sendTelemetryEvent(eventName, modifiedProperties, measurements, tagOverrides);

	}

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
	 */
	public sendDangerousTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, tagOverrides?: Record<string, string>): void {
		// Since telemetry is probably off when sending dangerously, we must start the sender
		this.telemetrySender.instantiateSender();
		this.internalSendTelemetryEvent(eventName, properties, measurements, tagOverrides, true);
	}

	/**
	 * Internal function which logs telemetry error events and takes extra options.
	 * @param eventName The name of the event
	 * @param properties The properties of the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param tagOverrides Optional per-event tag overrides
	 * @param dangerous Whether or not to ignore telemetry level
	 */
	private internalSendTelemetryErrorEvent(
		eventName: string,
		properties: TelemetryEventProperties | undefined,
		measurements: TelemetryEventMeasurements | undefined,
		tagOverrides: Record<string, string> | undefined,
		dangerous: boolean
	): void {
		// Merge context tags with per-event tag overrides
		// Per-event overrides take precedence over context tags
		const effectiveTagOverrides = Object.keys(this.contextTags).length > 0 || tagOverrides
			? { ...this.contextTags, ...tagOverrides }
			: undefined;

		if (dangerous) {
			this.telemetrySender.sendEventData(eventName, { properties, measurements, tagOverrides: effectiveTagOverrides });
		} else {
			this.telemetryLogger.logError(eventName, { properties, measurements, tagOverrides: effectiveTagOverrides });
		}
	}

	/**
	 * Given an event name, some properties, and measurements sends an error event
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
	 */
	public sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, tagOverrides?: Record<string, string>): void {
		this.internalSendTelemetryErrorEvent(eventName, properties, measurements, tagOverrides, false);
	}

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
	 */
	public sendDangerousTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, tagOverrides?: Record<string, string>): void {
		// Since telemetry is probably off when sending dangerously, we must start the sender
		this.telemetrySender.instantiateSender();
		this.internalSendTelemetryErrorEvent(eventName, properties, measurements, tagOverrides, true);
	}

	/**
	 * Sets a context tag that will be included in all telemetry events.
	 * Similar to client.context.tags[key] = value in the full Application Insights SDK.
	 * @param key The tag key (e.g., 'ai.cloud.roleInstance', 'ai.session.id')
	 * @param value The tag value
	 */
	public setContextTag(key: string, value: string): void {
		this.contextTags[key] = value;
	}

	/**
	 * Gets a context tag value.
	 * @param key The tag key
	 * @returns The tag value, or undefined if not set
	 */
	public getContextTag(key: string): string | undefined {
		return this.contextTags[key];
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
