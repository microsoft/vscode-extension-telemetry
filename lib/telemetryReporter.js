/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var vscode = require("vscode");
var appInsights = require("applicationinsights");
var TelemetryReporter = /** @class */ (function (_super) {
    __extends(TelemetryReporter, _super);
    function TelemetryReporter(extensionId, extensionVersion, key) {
        var _this = _super.call(this, function () { return _this.toDispose.forEach(function (d) { return d && d.dispose(); }); }) || this;
        _this.extensionId = extensionId;
        _this.extensionVersion = extensionVersion;
        _this.userOptIn = true;
        _this.toDispose = [];
        //check if another instance is already initialized
        if (appInsights.defaultClient) {
            appInsights.dispose();
        }
        appInsights.setup(key)
            .setAutoCollectRequests(false)
            .setAutoCollectPerformance(false)
            .setAutoCollectExceptions(false)
            .setAutoCollectDependencies(false)
            .setAutoDependencyCorrelation(false)
            .setAutoCollectConsole(false)
            .setUseDiskRetryCaching(true)
            .start();
        _this.appInsightsClient = appInsights.defaultClient;
        _this.appInsightsClient.commonProperties = _this.getCommonProperties();
        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf('AIF-') === 0) {
            _this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
        }
        _this.updateUserOptIn();
        _this.toDispose.push(vscode.workspace.onDidChangeConfiguration(function () { return _this.updateUserOptIn(); }));
        return _this;
    }
    TelemetryReporter.prototype.updateUserOptIn = function () {
        var config = vscode.workspace.getConfiguration(TelemetryReporter.TELEMETRY_CONFIG_ID);
        this.userOptIn = config.get(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true);
    };
    // __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodemachineid" : { "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    TelemetryReporter.prototype.getCommonProperties = function () {
        var commonProperties = Object.create(null);
        commonProperties['common.os'] = os.platform();
        commonProperties['common.platformversion'] = (os.release() || '').replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, '$1$2$3');
        commonProperties['common.osversion'] = commonProperties['common.platformversion']; //TODO: Drop this post Nova
        commonProperties['common.extname'] = this.extensionId;
        commonProperties['common.extversion'] = this.extensionVersion;
        if (vscode && vscode.env) {
            commonProperties['common.vscodemachineid'] = vscode.env.machineId;
            commonProperties['common.vscodesessionid'] = vscode.env.sessionId;
            commonProperties['common.vscodeversion'] = vscode.env.version;
        }
        return commonProperties;
    };
    TelemetryReporter.prototype.sendTelemetryEvent = function (eventName, properties, measures) {
        if (this.userOptIn && eventName && this.appInsightsClient) {
            this.appInsightsClient.trackEvent({
                name: this.extensionId + "/" + eventName,
                properties: properties,
                measurements: measures
            });
        }
    };
    TelemetryReporter.prototype.dispose = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.appInsightsClient) {
                _this.appInsightsClient.flush({
                    callback: function () {
                        appInsights.dispose();
                        resolve(void 0);
                    }
                });
            }
            else {
                resolve(void 0);
            }
        });
    };
    TelemetryReporter.TELEMETRY_CONFIG_ID = 'telemetry';
    TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID = 'enableTelemetry';
    return TelemetryReporter;
}(vscode.Disposable));
exports.default = TelemetryReporter;
//# sourceMappingURL=telemetryReporter.js.map