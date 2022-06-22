/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from "vscode";
import { BaseTelemetryAppender } from "../common/baseTelemetryAppender";
import { BaseTelemetryReporter, ReplacementOption } from "../common/baseTelemetryReporter";
import { oneDataSystemClientFactory } from "../common/1dsClientFactory";


export default class TelemetryReporter extends BaseTelemetryReporter {
	// TODO add ReplacementOption support
	constructor(extensionId: string, extensionVersion: string, key: string, firstParty?: boolean, _replacementOptions?: ReplacementOption[]) {
		const appender = new BaseTelemetryAppender(key, key => oneDataSystemClientFactory(key));
		// First party is always true for 1DS
		firstParty = true;
		super(extensionId, extensionVersion, appender, {
			release: navigator.appVersion,
			platform: "web",
			architecture: "web",
		}, vscode, firstParty);
	}
}

