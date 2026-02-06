/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseTelemetrySender, BaseTelemetryClient } from "../src/common/baseTelemetrySender";
import * as sinon from "sinon";
import assert from "assert";

describe("Base telemetry sender test suite", () => {
	const telemetryClient: BaseTelemetryClient = {
		logEvent: sinon.spy(),
		flush: sinon.spy(),
		dispose: sinon.spy(),
	};
	const telemetryClientFactory: (key: string) => Promise<BaseTelemetryClient> = async () => {
		return telemetryClient;
	};

	beforeEach(() => {
		// Reset history on the stubs
		(telemetryClient.logEvent as sinon.SinonSpy).resetHistory();
		(telemetryClient.flush as sinon.SinonSpy).resetHistory();
	});

	it("Log functions add to queue if not instantiated", () => {
		const sender = new BaseTelemetrySender("key", telemetryClientFactory);
		sender.sendEventData("eventName", {});
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(sender._eventQueue.length, 1);
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 0);
	});

	it("Log functions call client if instantiated", async () => {
		const sender = new BaseTelemetrySender("key", telemetryClientFactory);
		sender.instantiateSender();
		// Wait 10ms to ensure that the sender has instantiated the client
		await new Promise((resolve) => setTimeout(resolve, 10));
		sender.sendEventData("eventName", {});
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(sender._eventQueue.length, 0);
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(sender._exceptionQueue.length, 0);
		assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
	});

	it("Queues are flushed upon instantiation", async () => {
		const sender = new BaseTelemetrySender("key", telemetryClientFactory);
		sender.sendEventData("eventName", {});
		// Should cause a flush
		sender.instantiateSender();
		// Wait 10ms to ensure that the sender has instantiated the client
		await new Promise((resolve) => setTimeout(resolve, 10));
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(sender._eventQueue.length, 0);
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(sender._exceptionQueue.length, 0);
		assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
	});

	describe("Send error data logic", () => {
		describe("Fallback to logEvent (client without logException)", () => {
			let sender: BaseTelemetrySender;

			beforeEach(async () => {
				sender = new BaseTelemetrySender("key", telemetryClientFactory);
				sender.instantiateSender();
				// Wait 10ms to ensure that the sender has instantiated the client
				await new Promise((resolve) => setTimeout(resolve, 10));
			});

			it("Error properties are correctly created for an empty data argument", () => {
				const error = new Error("test");
				sender.sendErrorData(error);
				assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
				sinon.assert.calledWithMatch(
					telemetryClient.logEvent as sinon.SinonSpy, "unhandlederror",
					{ properties: { name: error.name, message: error.message, stack: error.stack } }
				);
			});

			it("Error properties are correctly created for a data without properties field", () => {
				const error = new Error("test");
				sender.sendErrorData(error, { prop1: 1, prop2: "two" });
				assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
				sinon.assert.calledWithMatch(
					telemetryClient.logEvent as sinon.SinonSpy, "unhandlederror",
					{ properties: { prop1: 1, prop2: "two", name: error.name, message: error.message, stack: error.stack } }
				);
			});

			it("Error properties are correctly created for a data with properties field", () => {
				const error = new Error("uh oh");
				sender.sendErrorData(error, { properties: { prop1: 1, prop2: "two" } });
				assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
				sinon.assert.calledWithMatch(
					telemetryClient.logEvent as sinon.SinonSpy, "unhandlederror",
					{ properties: { prop1: 1, prop2: "two", name: error.name, message: error.message, stack: error.stack } }
				);
			});
		});

		describe("Uses logException when available (App Insights client)", () => {
			const clientWithLogException: BaseTelemetryClient = {
				logEvent: sinon.spy(),
				logException: sinon.spy(),
				flush: sinon.spy(),
				dispose: sinon.spy(),
			};
			const clientWithLogExceptionFactory: (key: string) => Promise<BaseTelemetryClient> = async () => {
				return clientWithLogException;
			};

			let sender: BaseTelemetrySender;

			beforeEach(async () => {
				(clientWithLogException.logEvent as sinon.SinonSpy).resetHistory();
				(clientWithLogException.logException as sinon.SinonSpy).resetHistory();
				sender = new BaseTelemetrySender("key", clientWithLogExceptionFactory);
				sender.instantiateSender();
				// Wait 10ms to ensure that the sender has instantiated the client
				await new Promise((resolve) => setTimeout(resolve, 10));
			});

			it("Prefers logException over logEvent when available", () => {
				const error = new Error("test exception");
				sender.sendErrorData(error);
				assert.strictEqual((clientWithLogException.logException as sinon.SinonSpy).callCount, 1);
				assert.strictEqual((clientWithLogException.logEvent as sinon.SinonSpy).callCount, 0);
				sinon.assert.calledWith(
					clientWithLogException.logException as sinon.SinonSpy, error, undefined
				);
			});

			it("Passes SenderData format correctly to logException", () => {
				const error = new Error("test exception");
				const data = { properties: { key: "value" }, measurements: { count: 42 } };
				sender.sendErrorData(error, data);
				assert.strictEqual((clientWithLogException.logException as sinon.SinonSpy).callCount, 1);
				assert.strictEqual((clientWithLogException.logEvent as sinon.SinonSpy).callCount, 0);
				sinon.assert.calledWith(
					clientWithLogException.logException as sinon.SinonSpy, error, data
				);
			});

			it("Passes plain object data to logException", () => {
				const error = new Error("test exception");
				const data = { prop1: "one", prop2: 2 };
				sender.sendErrorData(error, data);
				assert.strictEqual((clientWithLogException.logException as sinon.SinonSpy).callCount, 1);
				assert.strictEqual((clientWithLogException.logEvent as sinon.SinonSpy).callCount, 0);
				sinon.assert.calledWith(
					clientWithLogException.logException as sinon.SinonSpy, error, data
				);
			});
		});
	});
});
