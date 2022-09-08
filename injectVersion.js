/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const fs = require('fs');

// Reads dist/node/common/baseTelemetryReporter.js and replaces PACKAGE_JSON_VERSION with the number from the package.json
const packageJson = require('./package.json');
const baseTelemetryReporter = fs.readFileSync('./dist/node/common/baseTelemetryReporter.js', 'utf8');
const newBaseTelemetryReporter = baseTelemetryReporter.replace(/PACKAGE_JSON_VERSION/g, packageJson.version);
fs.writeFileSync('./dist/node/common/baseTelemetryReporter.js', newBaseTelemetryReporter);

// Reads dist/browser/common/baseTelemetryReporter.js and replaces PACKAGE_JSON_VERSION with the number from the package.json
const baseTelemetryReporterBrowser = fs.readFileSync('./dist/browser/common/baseTelemetryReporter.js', 'utf8');
const newBaseTelemetryReporterBrowser = baseTelemetryReporterBrowser.replace(/PACKAGE_JSON_VERSION/g, packageJson.version);
fs.writeFileSync('./dist/browser/common/baseTelemetryReporter.js', newBaseTelemetryReporterBrowser);