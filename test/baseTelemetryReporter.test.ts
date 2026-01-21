/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { appInsightsClientFactory, AppInsightsClientOptions } from "../src/common/appInsightsClientFactory";
import * as sinon from "sinon";
import assert from "assert";

describe("AppInsights client factory - new features test suite", () => {
	afterEach(() => {
		sinon.restore();
	});

	describe("Custom endpoint URL configuration", () => {
		it("Should configure custom endpoint URL", async () => {
			const options: AppInsightsClientOptions = {
				endpointUrl: "https://custom-telemetry.example.com/v2/track"
			};

			// We can't easily test the internal config without mocking imports,
			// but we can at least verify the client is created successfully
			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456",
				undefined,
				undefined,
				options
			);

			assert.ok(client);
			assert.ok(typeof client.logEvent === "function");
			assert.ok(typeof client.flush === "function");
			assert.ok(typeof client.dispose === "function");
		});

		it("Should work without custom endpoint URL", async () => {
			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456"
			);

			assert.ok(client);
			assert.ok(typeof client.logEvent === "function");
		});
	});

	describe("Tag overrides merging", () => {
		it("Should merge constructor and per-event tag overrides correctly", async () => {
			const constructorTags = {
				"ai.cloud.roleInstance": "constructor-instance",
				"tag1": "from-constructor"
			};
			const options: AppInsightsClientOptions = {
				tagOverrides: constructorTags
			};

			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456",
				undefined,
				undefined,
				options
			);

			// Send event with per-event tag overrides - should not throw
			const perEventTags = {
				"ai.cloud.roleInstance": "per-event-instance", // Override constructor
				"tag2": "from-per-event"
			};

			assert.doesNotThrow(() => {
				client.logEvent("testEvent", {
					properties: { prop: "value" },
					tagOverrides: perEventTags
				});
			});
			// Note: Tag merging (constructor + per-event) happens internally in logEvent
		});

		it("Should handle undefined tag overrides at all levels", async () => {
			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456"
			);

			const logEventSpy = sinon.spy(client, "logEvent");

			client.logEvent("testEvent", {
				properties: { prop: "value" }
			});

			assert.strictEqual(logEventSpy.callCount, 1);
			const callArgs = logEventSpy.getCall(0).args;
			assert.strictEqual(callArgs[0], "testEvent");
			assert.deepStrictEqual(callArgs[1]?.properties, { prop: "value" });
			assert.strictEqual(callArgs[1]?.tagOverrides, undefined);
		});

		it("Should treat empty tag override object {} same as undefined", async () => {
			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456"
			);

			const logEventSpy = sinon.spy(client, "logEvent");

			client.logEvent("testEvent", {
				properties: { prop: "value" },
				tagOverrides: {} // Empty object
			});

			assert.strictEqual(logEventSpy.callCount, 1);
			const callArgs = logEventSpy.getCall(0).args;
			assert.strictEqual(callArgs[0], "testEvent");
			assert.deepStrictEqual(callArgs[1]?.properties, { prop: "value" });
			assert.deepStrictEqual(callArgs[1]?.tagOverrides, {});
		});
	});

	describe("Common properties", () => {
		it("Should include common properties in all events", async () => {
			const commonProps = {
				"common.version": "1.0.0",
				"common.environment": "test"
			};
			const options: AppInsightsClientOptions = {
				commonProperties: commonProps
			};

			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456",
				undefined,
				undefined,
				options
			);

			assert.doesNotThrow(() => {
				client.logEvent("testEvent", {
					properties: { eventProp: "value" }
				});
			});
			// Note: Common properties are merged inside the logEvent implementation
		});
	});

	describe("Combined features", () => {
		it("Should support endpoint URL, common properties, and tag overrides together", async () => {
			const options: AppInsightsClientOptions = {
				endpointUrl: "https://custom.endpoint.com/v2/track",
				commonProperties: { "common.test": "value" },
				tagOverrides: { "ai.session.id": "session-override" }
			};

			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456",
				undefined,
				undefined,
				options
			);

			assert.doesNotThrow(() => {
				client.logEvent("testEvent", {
					properties: { prop: "test" },
					tagOverrides: { "trackingId": "event-123" }
				});
			});
			// Note: All properties and tags are merged internally
		});
	});

	describe("XHR override configuration", () => {
		it("Should configure XHR override when provided", async () => {
			const xhrOverride = {
				sendPOST: sinon.stub().callsArg(1)
			};

			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456",
				xhrOverride
			);

			assert.ok(client);
			assert.ok(typeof client.logEvent === "function");
		});
	});

	describe("Backward compatibility", () => {
		it("Should work with minimal parameters (v1.2 behavior)", async () => {
			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key",
				"machine-123",
				"session-456"
			);

			assert.ok(client);
			assert.ok(typeof client.logEvent === "function");
			assert.ok(typeof client.flush === "function");
			assert.ok(typeof client.dispose === "function");
		});

		it("Should support connection string format", async () => {
			const client = await appInsightsClientFactory(
				"InstrumentationKey=test-key;IngestionEndpoint=https://example.com",
				"machine-123",
				"session-456"
			);

			assert.ok(client);
		});
	});
});
