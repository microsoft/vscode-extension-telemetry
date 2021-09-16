import * as vscode from "vscode";

export const enum TelemetryLevel {
	ON = "on",
	ERROR = "error",
	OFF = "off"
}

export function getTelemetryLevel(): TelemetryLevel {
	const TELEMETRY_CONFIG_ID = "telemetry";
	const TELEMETRY_CONFIG_ENABLED_ID = "enableTelemetry";
	const TELEMETRY_CONFIG_LEVEL_ID = "telemetryLevel";
	// Could be undefined in old versions of vs code
	if (vscode.env.isTelemetryEnabled) {
		return TelemetryLevel.ON;
	}
	// We use the old and new setting to determine the telemetry level as we must respect both
	const config = vscode.workspace.getConfiguration(TELEMETRY_CONFIG_ID);
	const level = config.get<TelemetryLevel>(TELEMETRY_CONFIG_LEVEL_ID);
	const enabled = config.get<boolean>(TELEMETRY_CONFIG_ENABLED_ID);
	return enabled ? TelemetryLevel.ON : level ?? TelemetryLevel.OFF;
}