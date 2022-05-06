/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as assert from "assert";
import type * as vscode from "vscode";
import { TelemetryUtil, TelemetryLevel } from "../src/common/util";

describe("Util test suite", () => {
	// Test that the apply repacements util function works as expected
	it("Apply replacements", () => {
		let replacement: Record<string, any> = {};
		TelemetryUtil.applyReplacements(replacement, []);
		assert.deepStrictEqual(replacement, {});
		replacement = { valueA: "a", valueB: "b", "123": "123" };
		TelemetryUtil.applyReplacements(replacement, [{
			lookup: /[a]/gi,
			replacementString: "c"
		}]);
		assert.deepStrictEqual(replacement, { valueA: "c", valueB: "b", "123": "123" });
		replacement = { valueA: "a", valueB: "b", "123": "123" };
		TelemetryUtil.applyReplacements(replacement, [{
			lookup: /[a]/gi,
			replacementString: undefined
		}]);
		// Undefined replacement string should remove the key
		assert.deepStrictEqual(replacement, { valueB: "b", "123": "123" });
	});

	it("Telemetry util implements singleton", () => {
		const vscodeAPI = {} as typeof vscode;
		const telemetryUtil1 = TelemetryUtil.getInstance(vscodeAPI);
		const telemetryUtil2 = TelemetryUtil.getInstance(vscodeAPI);
		assert.strictEqual(telemetryUtil1, telemetryUtil2);
	});

	it("Get telemetry level - Using telemetry configuration API", () => {
		// Casting here is required to not have to shim the whole API
		// Decently safe as tests will just fail if not enough API is available
		let telemetryShim = {
			env: {
				telemetryConfiguration: {
					isUsageEnabled: true,
					isErrorsEnabled: true,
					isCrashEnabled: true
				},
				isTelemetryEnabled: false
			}
		} as typeof vscode;
		// Make a new telemetry util as we don't want to use getInstance as it will not
		// update with new API shims passed in subsequent tests
		let telemetryUtil = new TelemetryUtil(telemetryShim);
		assert.strictEqual(telemetryUtil.getTelemetryLevel(), TelemetryLevel.ON);

		telemetryShim = {
			env: {
				telemetryConfiguration: {
					isUsageEnabled: false,
					isErrorsEnabled: true,
					isCrashEnabled: true
				}
			}
		} as typeof vscode;
		telemetryUtil = new TelemetryUtil(telemetryShim);
		assert.strictEqual(telemetryUtil.getTelemetryLevel(), TelemetryLevel.ERROR);

		telemetryShim = {
			env: {
				telemetryConfiguration: {
					isUsageEnabled: false,
					isErrorsEnabled: false,
					isCrashEnabled: true
				}
			}
		} as typeof vscode;
		telemetryUtil = new TelemetryUtil(telemetryShim);
		// Extensions don't support crash so it should report off
		assert.strictEqual(telemetryUtil.getTelemetryLevel(), TelemetryLevel.OFF);

		telemetryShim = {
			env: {
				telemetryConfiguration: {
					isUsageEnabled: false,
					isErrorsEnabled: false,
					isCrashEnabled: false
				}
			}
		} as typeof vscode;
		telemetryUtil = new TelemetryUtil(telemetryShim);
		assert.strictEqual(telemetryUtil.getTelemetryLevel(), TelemetryLevel.OFF);
	});
	it ("Get telemetry level - Using telemetry enabled API", () => {
		// Casting here is required to not have to shim the whole API
		// Decently safe as tests will just fail if not enough API is available
		let telemetryShim = {
			env: {
				isTelemetryEnabled: true
			}
		} as typeof vscode;
		// Make a new telemetry util as we don't want to use getInstance as it will not
		// update with new API shims passed in subsequent tests
		let telemetryUtil = new TelemetryUtil(telemetryShim);
		assert.strictEqual(telemetryUtil.getTelemetryLevel(), TelemetryLevel.ON);

		telemetryShim = {
			env: {
				isTelemetryEnabled: false
			}
		} as typeof vscode;
		telemetryUtil = new TelemetryUtil(telemetryShim);
		assert.strictEqual(telemetryUtil.getTelemetryLevel(), TelemetryLevel.OFF);
	});

	// TODO - Add tests for when you just have telemetry configuration settings and no API
	// This is the hardest to shim and only in very old versions of VS Code
});