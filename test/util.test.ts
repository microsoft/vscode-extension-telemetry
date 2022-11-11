/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as assert from "assert";
import { TelemetryUtil } from "../src/common/util";

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
		const telemetryUtil1 = TelemetryUtil.getInstance();
		const telemetryUtil2 = TelemetryUtil.getInstance();
		assert.strictEqual(telemetryUtil1, telemetryUtil2);
	});

	// TODO - Add tests for when you just have telemetry configuration settings and no API
	// This is the hardest to shim and only in very old versions of VS Code
});