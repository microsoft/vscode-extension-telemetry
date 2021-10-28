/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { AppenderData, ITelemetryAppender } from "./baseTelemetryReporter";
import { getTelemetryLevel, TelemetryLevel } from "./util";

export interface BaseTelemetryClient {
	logEvent(eventName: string, data?: AppenderData): void;
	logException(exception: Error, data?: AppenderData): void;
	flush(): void | Promise<void>;
}

export class BaseTelemetryAppender implements ITelemetryAppender {
	// Whether or not the client has been instantiated
	private _isInstantiated = false;
	private _telemetryClient: BaseTelemetryClient | undefined;

	// Queues used to store events until the appender is ready
	private _eventQueue: Array<{ eventName: string, data: AppenderData | undefined }> = [];
	private _exceptionQueue: Array<{ exception: Error, data: AppenderData | undefined }> = [];

	// Necessary information to create a telemetry client
	private _clientFactory: (key: string) => Promise<BaseTelemetryClient>;
	private _key: string;

	constructor(key: string, clientFactory: (key: string) => Promise<BaseTelemetryClient>) {
		this._clientFactory = clientFactory;
		this._key = key;
		if (getTelemetryLevel() !== TelemetryLevel.OFF) {
			this.instantiateAppender();
		}
	}

	/**
	 * Sends the event to the passed in telemetry client
	 * @param eventName The named of the event to log
	 * @param data The data contanied in the event
	 */
	logEvent(eventName: string, data?: AppenderData): void {
		if (!this._telemetryClient) {
			if (!this._isInstantiated && getTelemetryLevel() !== TelemetryLevel.OFF) {
				this._eventQueue.push({ eventName, data });
			}
			return;
		}
		this._telemetryClient.logEvent(eventName, data);
	}

	/**
	 * Sends an exception to the passed in telemetry client
	 * @param exception The exception to collect
	 * @param data Data associated with the exception
	 */
	logException(exception: Error, data?: AppenderData): void {
		if (!this._telemetryClient) {
			if (!this._isInstantiated && getTelemetryLevel() !== TelemetryLevel.OFF) {
				this._exceptionQueue.push({ exception, data });
			}
			return;
		}
		this._telemetryClient.logException(exception, data);
	}

	/**
	 * Flushes the buffered telemetry data
	 */
	async flush(): Promise<void> {
		if (this._telemetryClient) {
			await this._telemetryClient.flush();
			this._telemetryClient = undefined;
		}
		return;
	}

	/**
	 * Flushes the queued events that existed before the client was instantiated
	 */
	private _flushQueues(): void {
		this._eventQueue.forEach(({ eventName, data }) => this.logEvent(eventName, data));
		this._eventQueue = [];
		this._exceptionQueue.forEach(({ exception, data }) => this.logException(exception, data));
		this._exceptionQueue = [];
	}

	/**
	 * Instantiates the telemetry client to make the appender "active"
	 */
	instantiateAppender(): void {
		if (this._isInstantiated) {
			return;
		}
		// Call the client factory to get the client and then let it know it's instatntiated
		this._clientFactory(this._key).then(client => {
			this._telemetryClient = client;
			this._isInstantiated = true;
			this._flushQueues();
		}).catch(err => {
			console.error(err);
		});
	}
}