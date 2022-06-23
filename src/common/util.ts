/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type * as vscode from "vscode";
import type { ReplacementOption } from "./baseTelemetryReporter";

export const enum TelemetryLevel {
	ON = "on",
	ERROR = "error",
	OFF = "off"
}

export class TelemetryUtil {
	private static _instance: TelemetryUtil | undefined;

	constructor (private readonly vscodeAPI: typeof vscode) { }

	public getTelemetryLevel(): TelemetryLevel {
		const TELEMETRY_CONFIG_ID = "telemetry";
		const TELEMETRY_CONFIG_ENABLED_ID = "enableTelemetry";

		try {
			const telemetryConfiguration = this.vscodeAPI.env.telemetryConfiguration;
			if (telemetryConfiguration.isUsageEnabled && telemetryConfiguration.isErrorsEnabled && telemetryConfiguration.isCrashEnabled) {
				return TelemetryLevel.ON;
			} else if (telemetryConfiguration.isErrorsEnabled && telemetryConfiguration.isCrashEnabled) {
				return TelemetryLevel.ERROR;
			} else {
				return TelemetryLevel.OFF;
			}
		} catch {
			// Could be undefined in old versions of vs code
			if (this.vscodeAPI.env.isTelemetryEnabled !== undefined) {
				return this.vscodeAPI.env.isTelemetryEnabled ? TelemetryLevel.ON : TelemetryLevel.OFF;
			}

			// We use the old and new setting to determine the telemetry level as we must respect both
			const config = this.vscodeAPI.workspace.getConfiguration(TELEMETRY_CONFIG_ID);
			const enabled = config.get<boolean>(TELEMETRY_CONFIG_ENABLED_ID);
			return enabled ? TelemetryLevel.ON : TelemetryLevel.OFF;
		}
	}

	public static applyReplacements(data: Record<string, any>, replacementOptions: ReplacementOption[]) {
		for (const key of Object.keys(data)) {
			for (const option of replacementOptions) {
				if (option.lookup.test(key)) {
					if (option.replacementString !== undefined) {
						data[key] = option.replacementString;
					} else {
						delete data[key];
					}
				}
			}
		}
	}

	/**
	 * Given a key checks if it is a valid 1DS key
	 * @param key The key to check if it's a valid 1DS key
	 */
	public static shouldUseOneDataSystemSDK(key: string): boolean {
		// Simple to check to ensure the key is the right length and the dashes are in the right spot
		return (
			key.length === 74 &&
			key[32] === "-" &&
			key[41] === "-" &&
			key[46]	=== "-" &&
			key[51] === "-" &&
			key[56] === "-" &&
			key[69] === "-"
		);
	}

	// Get singleton instance of TelemetryUtil
	public static getInstance(vscodeAPI: typeof vscode): TelemetryUtil {
		if (!TelemetryUtil._instance) {
			TelemetryUtil._instance = new TelemetryUtil(vscodeAPI);
		}
		return TelemetryUtil._instance;
	}
}
