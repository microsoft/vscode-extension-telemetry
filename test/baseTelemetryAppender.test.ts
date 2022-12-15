/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BaseTelemetryAppender, BaseTelemetryClient } from "../src/common/baseTelemetryAppender";
import * as sinon from "sinon";
import assert from "assert";

describe("Base telemetry appender test suite", () => {
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
		const appender = new BaseTelemetryAppender("key", telemetryClientFactory);
		appender.logEvent("eventName", {});
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(appender._eventQueue.length, 1);
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 0);
	});

	it("Log functions call client if instantiated", async () => {
		const appender = new BaseTelemetryAppender("key", telemetryClientFactory);
		appender.instantiateAppender();
		// Wait 10ms to ensure that the appender has instantiated the client
		await new Promise((resolve) => setTimeout(resolve, 10));
		appender.logEvent("eventName", {});
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(appender._eventQueue.length, 0);
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(appender._exceptionQueue.length, 0);
		assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
	});

	it("Queues are flushed upon instantiation", async () => {
		const appender = new BaseTelemetryAppender("key", telemetryClientFactory);
		appender.logEvent("eventName", {});
		// Should cause a flush
		appender.instantiateAppender();
		// Wait 10ms to ensure that the appender has instantiated the client
		await new Promise((resolve) => setTimeout(resolve, 10));
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(appender._eventQueue.length, 0);
		//@ts-ignore (needed to spy on private properties)
		assert.strictEqual(appender._exceptionQueue.length, 0);
		assert.strictEqual((telemetryClient.logEvent as sinon.SinonSpy).callCount, 1);
	});
});