/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const fs = require('fs');

// Reads dist/node/common/baseTelemetryAppender.js and replaces PACKAGE_JSON_VERSION with the number from the package.json
const packageJson = require('./package.json');
const baseTelemetryAppender = fs.readFileSync('./dist/node/common/baseTelemetryAppender.js', 'utf8');
const newBaseTelemetryAppender = baseTelemetryAppender.replace(/PACKAGE_JSON_VERSION/g, packageJson.version);
fs.writeFileSync('./dist/node/common/baseTelemetryAppender.js', newBaseTelemetryAppender);

// Reads dist/browser/common/baseTelemetryAppender.js and replaces PACKAGE_JSON_VERSION with the number from the package.json
const baseTelemetryAppenderBrowser = fs.readFileSync('./dist/browser/common/baseTelemetryAppender.js', 'utf8');
const newBaseTelemetryAppenderBrowser = baseTelemetryAppenderBrowser.replace(/PACKAGE_JSON_VERSION/g, packageJson.version);
fs.writeFileSync('./dist/browser/common/baseTelemetryAppender.js', newBaseTelemetryAppenderBrowser);