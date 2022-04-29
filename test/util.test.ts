import { applyReplacements } from "../src/common/util";
import * as assert from "assert";
import vscode from "../src/common/vscodeAPI";
import * as sinon from "sinon";

describe("Util test suite", () => {
	const telemetryConfigStub = sinon.stub(vscode.env, "telemetryConfiguration").value({
		isUsageEnabled: true,
		isErrorsEnabled: true,
		isCrashEnabled: true
	});

	const telemetryEnablementStub = sinon.stub(vscode.env, "isTelemetryEnabled").value(true);

	// Before each test restore stubs
	beforeEach(() => {
		telemetryConfigStub.restore();
		telemetryEnablementStub.restore();
	});

	// Test that the apply repacements util function works as expected
	it("Apply replacements", () => {
		let replacement: Record<string, any> = {};
		applyReplacements(replacement, []);
		assert.strictEqual(replacement, {});
		replacement = { valueA: "a", valueB: "b" };
		applyReplacements(replacement, [{
			lookup: new RegExp("a"),
			replacementString: "c"
		}]);
		assert.deepStrictEqual(replacement, { valueA: "c", valueB: "b" });
	});

});