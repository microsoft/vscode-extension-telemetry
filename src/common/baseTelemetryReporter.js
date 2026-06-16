"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTelemetryReporter = void 0;
class BaseTelemetryReporter {
    constructor(telemetrySender, vscodeAPI, initializationOptions) {
        this.telemetrySender = telemetrySender;
        this.vscodeAPI = vscodeAPI;
        this.userOptIn = false;
        this.errorOptIn = false;
        this.disposables = [];
        this._onDidChangeTelemetryLevel = new this.vscodeAPI.EventEmitter();
        this.onDidChangeTelemetryLevel = this._onDidChangeTelemetryLevel.event;
        /**
         * Context tags that are applied to all telemetry events.
         * Similar to client.context.tags in the full Application Insights SDK.
         */
        this.contextTags = {};
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
    updateUserOptIn() {
        this.errorOptIn = this.telemetryLogger.isErrorsEnabled;
        this.userOptIn = this.telemetryLogger.isUsageEnabled;
        // The sender is lazy loaded so if telemetry is off it's not loaded in
        if (this.telemetryLogger.isErrorsEnabled || this.telemetryLogger.isUsageEnabled) {
            this.telemetrySender.instantiateSender();
        }
        this._onDidChangeTelemetryLevel.fire(this.telemetryLevel);
    }
    /**
     * Merges context tags with per-event tag overrides.
     * Per-event overrides take precedence over context tags.
     * @param tagOverrides Optional per-event tag overrides
     * @returns Merged tag overrides, or undefined if no tags are present
     */
    mergeTagOverrides(tagOverrides) {
        const hasContextTags = Object.keys(this.contextTags).length > 0;
        const hasTagOverrides = tagOverrides && Object.keys(tagOverrides).length > 0;
        return (hasContextTags || hasTagOverrides)
            ? { ...this.contextTags, ...tagOverrides }
            : undefined;
    }
    get telemetryLevel() {
        if (this.errorOptIn && this.userOptIn) {
            return "all";
        }
        else if (this.errorOptIn) {
            return "error";
        }
        else {
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
    internalSendTelemetryEvent(eventName, properties, measurements, tagOverrides, dangerous) {
        const effectiveTagOverrides = this.mergeTagOverrides(tagOverrides);
        // If it's dangerous we skip going through the logger as the logger checks opt-in status, etc.
        if (dangerous) {
            this.telemetrySender.sendEventData(eventName, { properties, measurements, tagOverrides: effectiveTagOverrides });
        }
        else {
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
    sendTelemetryEvent(eventName, properties, measurements, tagOverrides) {
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
    sendRawTelemetryEvent(eventName, properties, measurements, tagOverrides) {
        const modifiedProperties = { ...properties };
        for (const propertyKey of Object.keys(modifiedProperties ?? {})) {
            const propertyValue = modifiedProperties[propertyKey];
            if (typeof propertyKey === "string" && propertyValue !== undefined) {
                // Trusted values are not sanitized, which is what we want for raw telemetry
                modifiedProperties[propertyKey] = new this.vscodeAPI.TelemetryTrustedValue(typeof propertyValue === "string" ? propertyValue : propertyValue.value);
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
    sendDangerousTelemetryEvent(eventName, properties, measurements, tagOverrides) {
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
    internalSendTelemetryErrorEvent(eventName, properties, measurements, tagOverrides, dangerous) {
        const effectiveTagOverrides = this.mergeTagOverrides(tagOverrides);
        if (dangerous) {
            this.telemetrySender.sendEventData(eventName, { properties, measurements, tagOverrides: effectiveTagOverrides });
        }
        else {
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
    sendTelemetryErrorEvent(eventName, properties, measurements, tagOverrides) {
        this.internalSendTelemetryErrorEvent(eventName, properties, measurements, tagOverrides, false);
    }
    /**
     * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
     * Do not use unless in a controlled environment i.e. sending telemetry from a CI pipeline or testing during development
     * @param eventName The name of the event
     * @param properties The properties to send with the event
     * @param measurements The measurements (numeric values) to send with the event
     * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
     */
    sendDangerousTelemetryErrorEvent(eventName, properties, measurements, tagOverrides) {
        // Since telemetry is probably off when sending dangerously, we must start the sender
        this.telemetrySender.instantiateSender();
        this.internalSendTelemetryErrorEvent(eventName, properties, measurements, tagOverrides, true);
    }
    /**
     * **DANGEROUS** Sends an exception to the Application Insights exceptions table without checking telemetry setting.
     * Do not use unless in a controlled environment i.e. sending telemetry from a CI pipeline or testing during development.
     * @param exception The exception to send
     * @param properties The properties to send with the exception
     * @param measurements The measurements (numeric values) to send with the exception
     * @param tagOverrides Optional per-event tag overrides (e.g., { 'ai.user.id': dynamicTrackingId })
     */
    sendDangerousTelemetryException(exception, properties, measurements, tagOverrides) {
        // Since telemetry is probably off when sending dangerously, we must start the sender
        this.telemetrySender.instantiateSender();
        const effectiveTagOverrides = this.mergeTagOverrides(tagOverrides);
        this.telemetrySender.sendErrorData(exception, { properties, measurements, tagOverrides: effectiveTagOverrides });
    }
    /**
     * Sets a context tag that will be included in all telemetry events.
     * Similar to client.context.tags[key] = value in the full Application Insights SDK.
     * @param key The tag key (e.g., 'ai.cloud.roleInstance', 'ai.session.id')
     * @param value The tag value
     */
    setContextTag(key, value) {
        this.contextTags[key] = value;
    }
    /**
     * Gets a context tag value.
     * @param key The tag key
     * @returns The tag value, or undefined if not set
     */
    getContextTag(key) {
        return this.contextTags[key];
    }
    /**
     * Disposes of the telemetry reporter
     */
    async dispose() {
        await this.telemetrySender.dispose();
        this.telemetryLogger.dispose();
        return Promise.all(this.disposables.map(d => d.dispose()));
    }
}
exports.BaseTelemetryReporter = BaseTelemetryReporter;
//# sourceMappingURL=baseTelemetryReporter.js.map