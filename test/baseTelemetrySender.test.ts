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
});