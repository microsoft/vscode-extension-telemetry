/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";

export const enum TelemetryLevel {
	ON = "on",
	ERROR = "error",
	OFF = "off"
}

export function getTelemetryLevel(): TelemetryLevel {
	const TELEMETRY_CONFIG_ID = "telemetry";
	const TELEMETRY_CONFIG_ENABLED_ID = "enableTelemetry";

	// Could be undefined in old versions of vs code
	if (vscode.env.isTelemetryEnabled !== undefined) {
		return vscode.env.isTelemetryEnabled ? TelemetryLevel.ON : TelemetryLevel.OFF;
	}

	// We use the old and new setting to determine the telemetry level as we must respect both
	const config = vscode.workspace.getConfiguration(TELEMETRY_CONFIG_ID);
	const enabled = config.get<boolean>(TELEMETRY_CONFIG_ENABLED_ID);
	return enabled ? TelemetryLevel.ON : TelemetryLevel.OFF;
}