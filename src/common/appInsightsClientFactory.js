"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.appInsightsClientFactory = void 0;
const applicationinsights_common_1 = require("@microsoft/applicationinsights-common");
const util_1 = require("./util");
const appInsightsClientFactory = async (connectionString, machineId, sessionId, xhrOverride, replacementOptions, options) => {
    let appInsightsClient;
    try {
        const basicAISDK = await Promise.resolve().then(() => __importStar(require("@microsoft/applicationinsights-web-basic")));
        let instrumentationKey;
        if (!connectionString.startsWith("InstrumentationKey=")) {
            instrumentationKey = connectionString;
        }
        const authConfig = instrumentationKey ? { instrumentationKey } : { connectionString };
        // Build the configuration for web-basic SDK
        const config = {
            ...authConfig,
            disableAjaxTracking: true,
            disableExceptionTracking: true,
            disableFetchTracking: true,
            disableCorrelationHeaders: true,
            disableCookiesUsage: true,
            autoTrackPageVisitTime: false,
            emitLineDelimitedJson: false,
            disableInstrumentationKeyValidation: true,
        };
        // Set custom endpoint URL at root level (web-basic SDK reads from here)
        if (options?.endpointUrl) {
            config.endpointUrl = options.endpointUrl;
        }
        // Configure XHR override if provided (for Node.js environments)
        if (xhrOverride) {
            config.extensionConfig = config.extensionConfig || {};
            const channelConfig = {
                alwaysUseXhrOverride: true,
                httpXHROverride: xhrOverride
            };
            config.extensionConfig[applicationinsights_common_1.BreezeChannelIdentifier] = channelConfig;
        }
        appInsightsClient = new basicAISDK.ApplicationInsights(config);
    }
    catch (e) {
        return Promise.reject(e);
    }
    // Helper to merge properties, apply replacements, and merge tag overrides
    const prepareEventData = (data) => {
        // Merge common properties with event properties
        const properties = { ...options?.commonProperties, ...data?.properties };
        if (replacementOptions?.length) {
            util_1.TelemetryUtil.applyReplacements(properties, replacementOptions);
        }
        // Merge tag overrides: constructor-level < context < per-event (highest priority)
        const hasConstructorTags = options?.tagOverrides && Object.keys(options.tagOverrides).length > 0;
        const hasEventTags = data?.tagOverrides && Object.keys(data.tagOverrides).length > 0;
        const tagOverrides = (hasConstructorTags || hasEventTags)
            ? { ...options?.tagOverrides, ...data?.tagOverrides }
            : undefined;
        const finalProperties = tagOverrides ? { ...properties, ...tagOverrides } : properties;
        return { finalProperties };
    };
    // Sets the appinsights client into a standardized form
    const telemetryClient = {
        logEvent: (eventName, data) => {
            const { finalProperties } = prepareEventData(data);
            appInsightsClient?.track({
                name: eventName,
                data: finalProperties,
                baseType: "EventData",
                ext: { user: { id: machineId, authId: machineId }, app: { sesId: sessionId } },
                baseData: { name: eventName, properties: finalProperties, measurements: data?.measurements }
            });
        },
        logException: (exception, data) => {
            const { finalProperties } = prepareEventData(data);
            // This structure matches trackException in the full Application Insights Node.js SDK.			
            appInsightsClient?.track({
                name: exception.name,
                data: finalProperties,
                baseType: "ExceptionData",
                ext: { user: { id: machineId, authId: machineId }, app: { sesId: sessionId } },
                baseData: {
                    exceptions: [{
                            typeName: exception.name,
                            message: exception.message,
                            hasFullStack: !!exception.stack,
                            stack: exception.stack,
                            parsedStack: []
                        }],
                    properties: finalProperties,
                    measurements: data?.measurements
                }
            });
        },
        flush: async () => {
            appInsightsClient?.flush(false);
        },
        dispose: async () => {
            const unloadPromise = new Promise((resolve) => {
                appInsightsClient?.unload(true, () => {
                    resolve();
                    appInsightsClient = undefined;
                }, 1000);
            });
            return unloadPromise;
        }
    };
    return telemetryClient;
};
exports.appInsightsClientFactory = appInsightsClientFactory;
//# sourceMappingURL=appInsightsClientFactory.js.map