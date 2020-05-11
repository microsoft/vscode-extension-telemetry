/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
process.env['APPLICATION_INSIGHTS_NO_DIAGNOSTIC_CHANNEL'] = true;
var fs = require("fs");
var os = require("os");
var path = require("path");
var vscode = require("vscode");
var appInsights = require("applicationinsights");
var TelemetryReporter = /** @class */ (function () {
    // tslint:disable-next-line
    function TelemetryReporter(extensionId, extensionVersion, key, firstParty) {
        var _this = this;
        this.extensionId = extensionId;
        this.extensionVersion = extensionVersion;
        this.firstParty = false;
        this.userOptIn = false;
        this.firstParty = !!firstParty;
        var logFilePath = process.env['VSCODE_LOGS'] || '';
        if (logFilePath && extensionId && process.env['VSCODE_LOG_LEVEL'] === 'trace') {
            logFilePath = path.join(logFilePath, extensionId + ".txt");
            this.logStream = fs.createWriteStream(logFilePath, { flags: 'a', encoding: 'utf8', autoClose: true });
        }
        this.updateUserOptIn(key);
        this.configListener = vscode.workspace.onDidChangeConfiguration(function () { return _this.updateUserOptIn(key); });
    }
    TelemetryReporter.prototype.updateUserOptIn = function (key) {
        var config = vscode.workspace.getConfiguration(TelemetryReporter.TELEMETRY_CONFIG_ID);
        if (this.userOptIn !== config.get(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true)) {
            this.userOptIn = config.get(TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID, true);
            if (this.userOptIn) {
                this.createAppInsightsClient(key);
            }
            else {
                this.dispose();
            }
        }
    };
    TelemetryReporter.prototype.createAppInsightsClient = function (key) {
        //check if another instance is already initialized
        if (appInsights.defaultClient) {
            this.appInsightsClient = new appInsights.TelemetryClient(key);
            // no other way to enable offline mode
            this.appInsightsClient.channel.setUseDiskRetryCaching(true);
        }
        else {
            appInsights.setup(key)
                .setAutoCollectRequests(false)
                .setAutoCollectPerformance(false)
                .setAutoCollectExceptions(false)
                .setAutoCollectDependencies(false)
                .setAutoDependencyCorrelation(false)
                .setAutoCollectConsole(false)
                .setUseDiskRetryCaching(true)
                .start();
            this.appInsightsClient = appInsights.defaultClient;
        }
        this.appInsightsClient.commonProperties = this.getCommonProperties();
        if (vscode && vscode.env) {
            this.appInsightsClient.context.tags[this.appInsightsClient.context.keys.userId] = vscode.env.machineId;
            this.appInsightsClient.context.tags[this.appInsightsClient.context.keys.sessionId] = vscode.env.sessionId;
        }
        //check if it's an Asimov key to change the endpoint
        if (key && key.indexOf('AIF-') === 0) {
            this.appInsightsClient.config.endpointUrl = "https://vortex.data.microsoft.com/collect/v1";
            this.firstParty = true;
        }
    };
    // __GDPR__COMMON__ "common.os" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.platformversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extname" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.extversion" : { "classification": "PublicNonPersonalData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodemachineid" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodesessionid" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.vscodeversion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.uikind" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    // __GDPR__COMMON__ "common.remotename" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
    TelemetryReporter.prototype.getCommonProperties = function () {
        var commonProperties = Object.create(null);
        commonProperties['common.os'] = os.platform();
        commonProperties['common.platformversion'] = (os.release() || '').replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, '$1$2$3');
        commonProperties['common.extname'] = this.extensionId;
        commonProperties['common.extversion'] = this.extensionVersion;
        if (vscode && vscode.env) {
            commonProperties['common.vscodemachineid'] = vscode.env.machineId;
            commonProperties['common.vscodesessionid'] = vscode.env.sessionId;
            commonProperties['common.vscodeversion'] = vscode.version;
            switch (vscode.env.uiKind) {
                case vscode.UIKind.Web:
                    commonProperties['common.uikind'] = 'web';
                    break;
                case vscode.UIKind.Desktop:
                    commonProperties['common.uikind'] = 'desktop';
                    break;
                default:
                    commonProperties['common.uikind'] = 'unknown';
            }
            commonProperties['common.remotename'] = this.cleanRemoteName(vscode.env.remoteName);
        }
        return commonProperties;
    };
    TelemetryReporter.prototype.cleanRemoteName = function (remoteName) {
        if (!remoteName) {
            return 'none';
        }
        var ret = 'other';
        // Allowed remote authorities
        ['ssh-remote', 'dev-container', 'attached-container', 'wsl'].forEach(function (res) {
            if (remoteName.indexOf(res + "+") === 0) {
                ret = res;
            }
        });
        return ret;
    };
    TelemetryReporter.prototype.shouldSendErrorTelemetry = function () {
        if (this.firstParty) {
            if (this.cleanRemoteName(vscode.env.remoteName) !== 'other') {
                return true;
            }
            if (this.extension === undefined || this.extension.extensionKind === vscode.ExtensionKind.Workspace) {
                return false;
            }
            if (vscode.env.uiKind === vscode.UIKind.Web) {
                return false;
            }
            return true;
        }
        return true;
    };
    Object.defineProperty(TelemetryReporter.prototype, "extension", {
        get: function () {
            if (this._extension === undefined) {
                this._extension = vscode.extensions.getExtension(this.extensionId);
            }
            return this._extension;
        },
        enumerable: true,
        configurable: true
    });
    TelemetryReporter.prototype.cloneAndChange = function (obj, change) {
        if (obj === null || typeof obj !== 'object')
            return obj;
        if (typeof change !== 'function')
            return obj;
        var ret = {};
        for (var key in obj) {
            ret[key] = change(key, obj[key]);
        }
        return ret;
    };
    TelemetryReporter.prototype.anonymizeFilePaths = function (stack, anonymizeFilePaths) {
        if (stack === undefined || stack === null) {
            return '';
        }
        var cleanupPatterns = [new RegExp(vscode.env.appRoot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')];
        if (this.extension) {
            cleanupPatterns.push(new RegExp(this.extension.extensionPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'));
        }
        var updatedStack = stack;
        if (anonymizeFilePaths) {
            var cleanUpIndexes = [];
            for (var _i = 0, cleanupPatterns_1 = cleanupPatterns; _i < cleanupPatterns_1.length; _i++) {
                var regexp = cleanupPatterns_1[_i];
                while (true) {
                    var result = regexp.exec(stack);
                    if (!result) {
                        break;
                    }
                    cleanUpIndexes.push([result.index, regexp.lastIndex]);
                }
            }
            var nodeModulesRegex = /^[\\\/]?(node_modules|node_modules\.asar)[\\\/]/;
            var fileRegex = /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-\._]+(\\\\|\\|\/))+[\w-\._]*/g;
            var lastIndex = 0;
            updatedStack = '';
            var _loop_1 = function () {
                var result = fileRegex.exec(stack);
                if (!result) {
                    return "break";
                }
                // Anoynimize user file paths that do not need to be retained or cleaned up.
                if (!nodeModulesRegex.test(result[0]) && cleanUpIndexes.every(function (_a) {
                    var x = _a[0], y = _a[1];
                    return result.index < x || result.index >= y;
                })) {
                    updatedStack += stack.substring(lastIndex, result.index) + '<REDACTED: user-file-path>';
                    lastIndex = fileRegex.lastIndex;
                }
            };
            while (true) {
                var state_1 = _loop_1();
                if (state_1 === "break")
                    break;
            }
            if (lastIndex < stack.length) {
                updatedStack += stack.substr(lastIndex);
            }
        }
        // sanitize with configured cleanup patterns
        for (var _a = 0, cleanupPatterns_2 = cleanupPatterns; _a < cleanupPatterns_2.length; _a++) {
            var regexp = cleanupPatterns_2[_a];
            updatedStack = updatedStack.replace(regexp, '');
        }
        return updatedStack;
    };
    TelemetryReporter.prototype.sendTelemetryEvent = function (eventName, properties, measurements) {
        var _this = this;
        if (this.userOptIn && eventName && this.appInsightsClient) {
            var cleanProperties = this.cloneAndChange(properties, function (_key, prop) { return _this.anonymizeFilePaths(prop, _this.firstParty); });
            this.appInsightsClient.trackEvent({
                name: this.extensionId + "/" + eventName,
                properties: cleanProperties,
                measurements: measurements
            });
            if (this.logStream) {
                this.logStream.write("telemetry/" + eventName + " " + JSON.stringify({ properties: properties, measurements: measurements }) + "\n");
            }
        }
    };
    TelemetryReporter.prototype.sendTelemetryErrorEvent = function (eventName, properties, measurements, errorProps) {
        var _this = this;
        if (this.userOptIn && eventName && this.appInsightsClient) {
            // always clean the properties if first party
            // do not send any error properties if we shouldn't send error telemetry
            // if we have no errorProps, assume all are error props
            var cleanProperties = this.cloneAndChange(properties, function (key, prop) {
                if (_this.shouldSendErrorTelemetry()) {
                    return _this.anonymizeFilePaths(prop, _this.firstParty);
                }
                if (errorProps === undefined || errorProps.indexOf(key) !== -1) {
                    return 'REDACTED';
                }
                return _this.anonymizeFilePaths(prop, _this.firstParty);
            });
            this.appInsightsClient.trackEvent({
                name: this.extensionId + "/" + eventName,
                properties: cleanProperties,
                measurements: measurements
            });
            if (this.logStream) {
                this.logStream.write("telemetry/" + eventName + " " + JSON.stringify({ properties: properties, measurements: measurements }) + "\n");
            }
        }
    };
    TelemetryReporter.prototype.sendTelemetryException = function (error, properties, measurements) {
        var _this = this;
        if (this.shouldSendErrorTelemetry() && this.userOptIn && error && this.appInsightsClient) {
            var cleanProperties = this.cloneAndChange(properties, function (_key, prop) { return _this.anonymizeFilePaths(prop, _this.firstParty); });
            this.appInsightsClient.trackException({
                exception: error,
                properties: cleanProperties,
                measurements: measurements
            });
            if (this.logStream) {
                this.logStream.write("telemetry/" + error.name + " " + error.message + " " + JSON.stringify({ properties: properties, measurements: measurements }) + "\n");
            }
        }
    };
    TelemetryReporter.prototype.dispose = function () {
        var _this = this;
        this.configListener.dispose();
        var flushEventsToLogger = new Promise(function (resolve) {
            if (!_this.logStream) {
                return resolve(void 0);
            }
            _this.logStream.on('finish', resolve);
            _this.logStream.end();
        });
        var flushEventsToAI = new Promise(function (resolve) {
            if (_this.appInsightsClient) {
                _this.appInsightsClient.flush({
                    callback: function () {
                        // all data flushed
                        _this.appInsightsClient = undefined;
                        resolve(void 0);
                    }
                });
            }
            else {
                resolve(void 0);
            }
        });
        return Promise.all([flushEventsToAI, flushEventsToLogger]);
    };
    TelemetryReporter.TELEMETRY_CONFIG_ID = 'telemetry';
    TelemetryReporter.TELEMETRY_CONFIG_ENABLED_ID = 'enableTelemetry';
    return TelemetryReporter;
}());
exports.default = TelemetryReporter;
//# sourceMappingURL=telemetryReporter.js.map