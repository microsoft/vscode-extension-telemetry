/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import type * as vscode from "vscode";

// Exposes the the VS Code APIs needed by this module.
// We expose this as a module so that we can mock it out in tests.
// Typeof is used so that if the .d.ts file changes this should be reflected
export interface ExposedVSCodeAPI {
	env: {
		telemetryConfiguration: typeof vscode.env.telemetryConfiguration;
		appRoot: typeof vscode.env.appRoot;
		appName: typeof vscode.env.appName;
		uiKind: typeof vscode.env.uiKind;
		appHost: typeof vscode.env.appHost;
		sessionId: typeof vscode.env.sessionId;
		machineId: typeof vscode.env.machineId;
		isTelemetryEnabled: typeof vscode.env.isTelemetryEnabled,
		isNewAppInstall: typeof vscode.env.isNewAppInstall,
		remoteName: typeof vscode.env.remoteName,
		onDidChangeTelemetryEnabled: typeof vscode.env.onDidChangeTelemetryEnabled,
	},
	version: typeof vscode.version,
	extensions: {
		getExtension: typeof vscode.extensions.getExtension,
	}
	workspace: {
		getConfiguration: typeof vscode.workspace.getConfiguration,
		onDidChangeConfiguration: typeof vscode.workspace.onDidChangeConfiguration,
	}
	UIKind: typeof vscode.UIKind
}

// Shimmed out the getConfiguratio nmethod of the workspace object
const returnedConfig: vscode.WorkspaceConfiguration = {
		get<T>(_section: string, defaultValue?: T): T | undefined{
			return defaultValue;
		},
		has(): boolean {
			return false;
		},
		inspect() {
			return undefined;
		},
		async update(): Promise<void> {
			return;
		}
};

let _vscode: ExposedVSCodeAPI = {
	env: {
		telemetryConfiguration: { isCrashEnabled: false, isErrorsEnabled: false, isUsageEnabled: false },
		appRoot: "",
		uiKind: 1,
		remoteName: "wsl",
		appHost: "Desktop",
		appName: "Visual Studio Code",
		sessionId: "1234",
		machineId: "5678",
		isTelemetryEnabled: true,
		isNewAppInstall: false,
		onDidChangeTelemetryEnabled: () => { return { dispose: () => {
			// no-op
		} }; },
	},
	version: "1.0.0",
	extensions: {
		getExtension() {
			return undefined;
		}
	},
	workspace: {
		getConfiguration: () => {
			return returnedConfig;
		},
		onDidChangeConfiguration: () => { return { dispose: () => {
			// no-op
		} }; },
	},
	UIKind : {
		Desktop: 1,
		Web: 2,
	}
};


try {
	// This doesn't work in web!
	_vscode = require("vscode");
} catch {
	// no-op as we will use the shim defined above
}

export default _vscode;