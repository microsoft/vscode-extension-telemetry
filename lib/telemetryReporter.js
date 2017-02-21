/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var os = require("os");
var vscode = require("vscode");
var appInsights = require("applicationinsights");
var winreg = require("winreg");
var TelemetryReporter = (function (_super) {
    __extends(TelemetryReporter, _super);
    function TelemetryReporter(extensionId, extensionVersion, key) {
        var _this = _super.call(this, function () { return _this.toDispose.forEach(function (d) { return d && d.dispose(); }); }) || this;
        _this.extensionId = extensionId;
        _this.extensionVersion = extensionVersion;
        _this.userOptIn = true;
        _this.toDispose = [];
        //check if another instance is already initialized
        if (appInsights.client) {
            _this.appInsightsClient = appInsights.getClient(key);
            // no other way to enable offline mode
            _this.appInsightsClient.channel.setOfflineMode(true);
        }
        else {
            _this.appInsightsClient = appInsights.setup(key)
                .setAutoCollectRequests(false)
                .setAutoCollectPerformance(false)
                .setAutoCollectExceptions(false)
                .setOfflineMode(true)
                .start()
                .client;
        }
        //prevent AI from reporting PII
        _this.setupAIClient(_this.appInsightsClient);
        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf('AIF-') === 0) {
            _this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
        }
        _this.loadCommonProperties();
        if (vscode && vscode.env) {
            _this.loadVSCodeCommonProperties(vscode.env.machineId, vscode.env.sessionId, vscode.version);
        }
        _this.updateUserOptIn();
        _this.toDispose.push(vscode.workspace.onDidChangeConfiguration(function () { return _this.updateUserOptIn(); }));
        return _this;
    }
    TelemetryReporter.prototype.updateUserOptIn = function () {
        var config = vscode.workspace.getConfiguration(TelemetryReporter.TELEMETRY_CONFIG_ID);
        this.userOptIn = config.get(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true);
    };
    TelemetryReporter.prototype.setupAIClient = function (client) {
        if (client && client.context && client.context.keys && client.context.tags) {
            var machineNameKey = client.context.keys.deviceMachineName;
            client.context.tags[machineNameKey] = '';
        }
    };
    TelemetryReporter.prototype.loadVSCodeCommonProperties = function (machineId, sessionId, version) {
        this.commonProperties = this.commonProperties || Object.create(null);
        this.commonProperties['vscodemachineid'] = machineId;
        this.commonProperties['vscodesessionid'] = sessionId;
        this.commonProperties['vscodeversion'] = version;
    };
    TelemetryReporter.prototype.loadCommonProperties = function () {
        var _this = this;
        this.commonProperties = this.commonProperties || Object.create(null);
        this.commonProperties['os'] = os.platform();
        this.commonProperties['osversion'] = os.release();
        this.commonProperties['extname'] = this.extensionId;
        this.commonProperties['extversion'] = this.extensionVersion;
        // add SQM data for windows machines
        if (process.platform === 'win32') {
            this.getWinRegKeyData(TelemetryReporter.SQM_KEY, TelemetryReporter.REGISTRY_USERID_VALUE, winreg.HKCU, function (error, result) {
                if (!error && result) {
                    _this.commonProperties['sqmid'] = result;
                }
            });
            this.getWinRegKeyData(TelemetryReporter.SQM_KEY, TelemetryReporter.REGISTRY_MACHINEID_VALUE, winreg.HKLM, function (error, result) {
                if (!error && result) {
                    _this.commonProperties['sqmmachineid'] = result;
                }
            });
        }
    };
    TelemetryReporter.prototype.addCommonProperties = function (properties) {
        for (var prop in this.commonProperties) {
            properties['common.' + prop] = this.commonProperties[prop];
        }
        return properties;
    };
    TelemetryReporter.prototype.getWinRegKeyData = function (key, name, hive, callback) {
        if (process.platform === 'win32') {
            try {
                var reg = new winreg({ hive: hive, key: key });
                reg.get(name, function (e, result) {
                    if (e || !result) {
                        callback(e, null);
                    }
                    else {
                        callback(null, result.value);
                    }
                });
            }
            catch (err) {
                callback(err, null);
            }
        }
        else {
            callback(null, null);
        }
    };
    TelemetryReporter.prototype.sendTelemetryEvent = function (eventName, properties, measures) {
        if (this.userOptIn && eventName) {
            var eventProperties = properties || Object.create(null);
            eventProperties = this.addCommonProperties(eventProperties);
            this.appInsightsClient.trackEvent(this.extensionId + "/" + eventName, eventProperties, measures);
        }
    };
    return TelemetryReporter;
}(vscode.Disposable));
TelemetryReporter.SQM_KEY = '\\SOFTWARE\\Microsoft\\SQMClient';
TelemetryReporter.REGISTRY_USERID_VALUE = 'UserId';
TelemetryReporter.REGISTRY_MACHINEID_VALUE = 'MachineId';
TelemetryReporter.TELEMETRY_CONFIG_ID = 'telemetry';
TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID = 'enableTelemetry';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelemetryReporter;
//# sourceMappingURL=telemetryReporter.js.map