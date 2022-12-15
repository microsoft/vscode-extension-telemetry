/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const fs = require('fs');

// Reads dist/node/common/util.js and replaces PACKAGE_JSON_VERSION with the number from the package.json
const packageJson = require('./package.json');
const baseUtil = fs.readFileSync('./dist/node/common/util.js', 'utf8');
const newBaseUtil = baseUtil.replace(/PACKAGE_JSON_VERSION/g, packageJson.version);
fs.writeFileSync('./dist/node/common/util.js', newBaseUtil);

// Reads dist/browser/common/util.js and replaces PACKAGE_JSON_VERSION with the number from the package.json
const baseUtilBrowser = fs.readFileSync('./dist/browser/common/util.js', 'utf8');
const newBaseUtilBrowser = baseUtilBrowser.replace(/PACKAGE_JSON_VERSION/g, packageJson.version);
fs.writeFileSync('./dist/browser/common/util.js', newBaseUtilBrowser);