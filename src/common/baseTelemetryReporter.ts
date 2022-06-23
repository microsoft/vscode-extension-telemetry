/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type * as vscode from "vscode";
import type { TelemetryEventMeasurements, TelemetryEventProperties, RawTelemetryEventProperties } from "../../lib/telemetryReporter";
import { ITelemetryAppender } from "./baseTelemetryAppender";
import { TelemetryLevel, TelemetryUtil } from "./util";

export interface AppenderData {
	properties?: RawTelemetryEventProperties,
	measurements?: TelemetryEventMeasurements
}

/**
 * A replacement option for the app insights client. This allows the appender to filter out any sensitive or unnecessary information from the telemetry server.
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
	private firstParty = false;
	private userOptIn = false;
	private errorOptIn = false;
	private _extension: vscode.Extension<any> | undefined;
	private readonly disposables: vscode.Disposable[] = [];

	constructor(
		private extensionId: string,
		private extensionVersion: string,
		private telemetryAppender: ITelemetryAppender,
		private osShim: { release: string, platform: string, architecture: string },
		private readonly vscodeAPI: typeof vscode,
		firstParty?: boolean
	) {

		this.firstParty = !!firstParty;
		this.updateUserOptStatus();

		if (vscodeAPI.env.onDidChangeTelemetryEnabled !== undefined) {
			this.disposables.push(vscodeAPI.env.onDidChangeTelemetryEnabled(() => this.updateUserOptStatus()));
			this.disposables.push(vscodeAPI.workspace.onDidChangeConfiguration(() => this.updateUserOptStatus()));
		} else {
			this.disposables.push(vscodeAPI.workspace.onDidChangeConfiguration(() => this.updateUserOptStatus()));
		}
	}

	/**
	 * Updates whether the user has opted in to having telemetry collected
	 */
	private updateUserOptStatus(): void {
		const telemetryLevel = TelemetryUtil.getInstance(this.vscodeAPI).getTelemetryLevel();
		this.userOptIn = telemetryLevel === TelemetryLevel.ON;
		this.errorOptIn = telemetryLevel === TelemetryLevel.ERROR || this.userOptIn;
		if (this.userOptIn || this.errorOptIn) {
			this.telemetryAppender.instantiateAppender();
		}
	}

	/**
	 * Given a remoteName ensures it is in the list of valid ones
	 * @param remoteName The remotename
	 * @returns The "cleaned" one
	 */
	private cleanRemoteName(remoteName?: string): string {
		if (!remoteName) {
			return "none";
		}

		let ret = "other";
		// Allowed remote authorities
		["ssh-remote", "dev-container", "attached-container", "wsl", "codespaces"].forEach((res: string) => {
			if (remoteName!.indexOf(`${res}`) === 0) {
				ret = res;
			}
		});

		return ret;
	}

	/**
	 * Retrieves the current extension based on the extension id
	 */
	private get extension(): vscode.Extension<any> | undefined {
		if (this._extension === undefined) {
			this._extension = this.vscodeAPI.extensions.getExtension(this.extensionId);
		}

		return this._extension;
	}

	/**
	 * Given an object and a callback creates a clone of the object and modifies it according to the callback
	 * @param obj The object to clone and modify
	 * @param change The modifying function
	 * @returns A new changed object
	 */
	private cloneAndChange(obj?: { [key: string]: string }, change?: (key: string, val: string) => string): { [key: string]: string } | undefined {
		if (obj === null || typeof obj !== "object") return obj;
		if (typeof change !== "function") return obj;

		const ret: { [key: string]: string } = {};
		for (const key in obj) {
			ret[key] = change(key, obj[key]!);
		}

		return ret;
	}

	/**
	 * Whether or not it is safe to send error telemetry
	 */
	private shouldSendErrorTelemetry(): boolean {
		if (this.errorOptIn === false) {
			return false;
		}

		if (this.firstParty) {
			// Don't collect errors from unknown remotes
			if (this.vscodeAPI.env.remoteName && this.cleanRemoteName(this.vscodeAPI.env.remoteName) === "other") {
				return false;
			}

			return true;
		}
		return true;
	}

	// __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.nodeArch" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.vscodemachineid" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.uikind" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.remotename" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.isnewappinstall" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	// __GDPR__COMMON__ "common.product" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
	private getCommonProperties(): TelemetryEventProperties {
		const commonProperties: Record<string, any> = {};
		commonProperties["common.os"] = this.osShim.platform;
		commonProperties["common.nodeArch"] = this.osShim.architecture;
		commonProperties["common.platformversion"] = (this.osShim.release || "").replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, "$1$2$3");
		commonProperties["common.extname"] = this.extensionId;
		commonProperties["common.extversion"] = this.extensionVersion;
		if (this.vscodeAPI && this.vscodeAPI.env) {
			commonProperties["common.vscodemachineid"] = this.vscodeAPI.env.machineId;
			commonProperties["common.vscodesessionid"] = this.vscodeAPI.env.sessionId;
			commonProperties["common.vscodeversion"] = this.vscodeAPI.version;
			commonProperties["common.isnewappinstall"] = this.vscodeAPI.env.isNewAppInstall ? this.vscodeAPI.env.isNewAppInstall.toString() : "false";
			commonProperties["common.product"] = this.vscodeAPI.env.appHost;

			switch (this.vscodeAPI.env.uiKind) {
				case this.vscodeAPI.UIKind.Web:
					commonProperties["common.uikind"] = "web";
					break;
				case this.vscodeAPI.UIKind.Desktop:
					commonProperties["common.uikind"] = "desktop";
					break;
				default:
					commonProperties["common.uikind"] = "unknown";
			}

			commonProperties["common.remotename"] = this.cleanRemoteName(this.vscodeAPI.env.remoteName);
		}
		return commonProperties;
	}

	/**
	 * Given an error stack cleans up the file paths within
	 * @param stack The stack to clean
	 * @param anonymizeFilePaths Whether or not to clean the file paths or anonymize them as well
	 * @returns The cleaned stack
	 */
	private anonymizeFilePaths(stack?: string, anonymizeFilePaths?: boolean): string {
		let result: RegExpExecArray | null | undefined;
		if (stack === undefined || stack === null) {
			return "";
		}

		const cleanupPatterns = [];
		if (this.vscodeAPI.env.appRoot !== "") {
			cleanupPatterns.push(new RegExp(this.vscodeAPI.env.appRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));
		}
		if (this.extension) {
			cleanupPatterns.push(new RegExp(this.extension.extensionPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));
		}

		let updatedStack = stack;

		if (anonymizeFilePaths) {
			const cleanUpIndexes: [number, number][] = [];
			for (const regexp of cleanupPatterns) {
				while ((result = regexp.exec(stack))) {
					if (!result) {
						break;
					}
					cleanUpIndexes.push([result.index, regexp.lastIndex]);
				}
			}

			const nodeModulesRegex = /^[\\/]?(node_modules|node_modules\.asar)[\\/]/;
			const fileRegex = /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-._]+(\\\\|\\|\/))+[\w-._]*/g;
			let lastIndex = 0;
			updatedStack = "";

			while ((result = fileRegex.exec(stack))) {
				if (!result) {
					break;
				}
				// Anoynimize user file paths that do not need to be retained or cleaned up.
				if (result[0] && !nodeModulesRegex.test(result[0]) && cleanUpIndexes.every(([x, y]) => result!.index < x || result!.index >= y)) {
					updatedStack += stack.substring(lastIndex, result.index) + "<REDACTED: user-file-path>";
					lastIndex = fileRegex.lastIndex;
				}
			}
			if (lastIndex < stack.length) {
				updatedStack += stack.substr(lastIndex);
			}
		}

		// sanitize with configured cleanup patterns
		for (const regexp of cleanupPatterns) {
			updatedStack = updatedStack.replace(regexp, "");
		}
		return updatedStack;
	}

	private removePropertiesWithPossibleUserInfo(properties: TelemetryEventProperties | undefined): TelemetryEventProperties | undefined {
		if (typeof properties !== "object") {
			return;
		}
		const cleanedObject: Record<string, any> = {};
		// Loop through key and values of the properties object
		for (const key of Object.keys(properties)) {
			const value = properties[key];
			// If for some reason it is undefined we skip it (this shouldn't be possible);
			if (!value) {
				continue;
			}

			// Regex which matches @*.site
			const emailRegex = /@[a-zA-Z0-9-.]+/;
			const secretRegex = /(key|token|sig|signature|password|passwd|pwd|android:value)[^a-zA-Z0-9]/;
			// last +? is lazy as a microoptimization since we don't care about the full value
			const tokenRegex = /xox[pbaors]-[a-zA-Z0-9]+-[a-zA-Z0-9-]+?/;

			// Check for common user data in the telemetry events
			if (secretRegex.test(value.toLowerCase())) {
				cleanedObject[key] = "<REDACTED: secret>";
			} else if (emailRegex.test(value)) {
				cleanedObject[key] = "<REDACTED: email>";
			} else if (tokenRegex.test(value)) {
				cleanedObject[key] = "<REDACTED: token>";
			} else {
				cleanedObject[key] = value;
			}
		}
		return cleanedObject;
	}

	public get telemetryLevel(): "all" | "error" | "crash" | "off" {
		const telemetryLevel = TelemetryUtil.getInstance(this.vscodeAPI).getTelemetryLevel();
		switch (telemetryLevel) {
			case TelemetryLevel.ON:
				return "all";
			case TelemetryLevel.ERROR:
				return "error";
			case TelemetryLevel.OFF:
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
		sanitize: boolean,
		dangerous: boolean
	): void {
		if ((this.userOptIn || dangerous) && eventName !== "") {
			properties = { ...properties, ...this.getCommonProperties() };
			if (sanitize) {
				const cleanProperties = this.cloneAndChange(properties, (_key: string, prop: string) => this.anonymizeFilePaths(prop, this.firstParty));
				properties = this.removePropertiesWithPossibleUserInfo(cleanProperties);
			}
			eventName = `${this.extensionId}/${eventName}`;
			this.telemetryAppender.logEvent(eventName, { properties, measurements });
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
		this.internalSendTelemetryEvent(eventName, properties, measurements, true, false);
	}

	/**
	 * Given an event name, some properties, and measurements sends a raw (unsanitized) telemetry event
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	public sendRawTelemetryEvent(eventName: string, properties?: RawTelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		this.internalSendTelemetryEvent(eventName, properties, measurements, false, false);
	}

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to sanitize to the properties and measures, defaults to true
	 */
	public sendDangerousTelemetryEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, sanitize = true): void {
		// Since telemetry is probably off when sending dangerously, we must start the appender
		this.telemetryAppender.instantiateAppender();
		this.internalSendTelemetryEvent(eventName, properties, measurements, sanitize, true);
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
		sanitize: boolean,
		dangerous: boolean
	): void {
		if ((this.shouldSendErrorTelemetry() || dangerous) && eventName !== "") {

			properties = { ...properties, ...this.getCommonProperties() };
			if (sanitize) {
				// Anonymize the file paths
				const cleanProperties = this.cloneAndChange(properties, (_: string, prop: string) => {
					return this.anonymizeFilePaths(prop, this.firstParty);
				});
				properties = this.removePropertiesWithPossibleUserInfo(cleanProperties);
			}
			eventName = `${this.extensionId}/${eventName}`;
			this.telemetryAppender.logEvent(eventName, { properties, measurements });
		}
	}

	/**
	 * Given an event name, some properties, and measurements sends an error event
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	public sendTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		this.internalSendTelemetryErrorEvent(eventName, properties, measurements, true, false);
	}

	/**
	 * **DANGEROUS** Given an event name, some properties, and measurements sends a telemetry error event without checking telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to run the properties and measures through sanitiziation, defaults to true
	 */
	public sendDangerousTelemetryErrorEvent(eventName: string, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, sanitize = true): void {
		// Since telemetry is probably off when sending dangerously, we must start the appender
		this.telemetryAppender.instantiateAppender();
		this.internalSendTelemetryErrorEvent(eventName, properties, measurements, sanitize, true);
	}

	/**
	 * Internal function which logs telemetry exceptions and takes extra options
	 * @param error: The error to send
	 * @param properties The properties of the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to sanitize to the properties and measures
	 * @param dangerous Whether or not to ignore telemetry level
	 */
	private internalSendTelemetryException(
		error: Error,
		properties: TelemetryEventProperties | undefined,
		measurements: TelemetryEventMeasurements | undefined,
		sanitize: boolean,
		dangerous: boolean
	): void {
		if ((this.shouldSendErrorTelemetry() || dangerous) && error) {
			properties = { ...properties, ...this.getCommonProperties() };
			if (sanitize) {
				const cleanProperties = this.cloneAndChange(properties, (_key: string, prop: string) => this.anonymizeFilePaths(prop, this.firstParty));
				// Also run the error stack through the anonymizer
				if (error.stack) {
					error.stack = this.anonymizeFilePaths(error.stack, this.firstParty);
				}
				properties = this.removePropertiesWithPossibleUserInfo(cleanProperties);
			}
			this.telemetryAppender.logException(error, { properties, measurements });
		}
	}

	/**
	 * Given an error, properties, and measurements. Sends an exception event
	 * @param error The error to send
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 */
	public sendTelemetryException(error: Error, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements): void {
		this.internalSendTelemetryException(error, properties, measurements, true, false);
	}

	/**
	 * **DANGEROUS** Given an error, properties, and measurements. Sends an exception event without checking the telemetry setting
	 * Do not use unless in a controlled environment i.e. sending telmetry from a CI pipeline or testing during development
	 * @param eventName The name of the event
	 * @param properties The properties to send with the event
	 * @param measurements The measurements (numeric values) to send with the event
	 * @param sanitize Whether or not to sanitize to the properties and measures, defaults to true
	 */
	public sendDangerousTelemetryException(error: Error, properties?: TelemetryEventProperties, measurements?: TelemetryEventMeasurements, sanitize = true): void {
		// Since telemetry is probably off when sending dangerously, we must start the appender
		this.telemetryAppender.instantiateAppender();
		this.internalSendTelemetryException(error, properties, measurements, sanitize, true);
	}

	/**
	 * Disposes of the telemetry reporter
	 */
	public dispose(): Promise<any> {
		this.telemetryAppender.flush();
		return Promise.all(this.disposables.map(d => d.dispose()));
	}
}
