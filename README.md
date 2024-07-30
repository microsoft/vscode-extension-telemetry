# [@vscode/extension-telemetry](https://www.npmjs.com/package/@vscode/extension-telemetry)
This module provides a consistent way for extensions to report telemetry
over Application Insights. The module respects the user's decision about whether or
not to send telemetry data. See [telemetry extension guidelines](https://code.visualstudio.com/api/extension-guides/telemetry) for more information on using telemetry in your extension.

Follow [guide to set up Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/create-workspace-resource) in Azure and get your connection string. Don't worry about hardcoding it, it is not sensitive.

# Install
With npm:
`npm install @vscode/extension-telemetry`

With yarn:
`yarn add @vscode/extension-telemetry`

# Usage

## Setup
```javascript
import * as vscode from 'vscode';
import TelemetryReporter from '@vscode/extension-telemetry';

// the connection string
const connectionString = '<your connection string>';

// telemetry reporter
let reporter;

function activate(context: vscode.ExtensionContext) {
   // create telemetry reporter on extension activation
   reporter = new TelemetryReporter(connectionString);
   // ensure it gets properly disposed. Upon disposal the events will be flushed
   context.subscriptions.push(reporter);
}
```

## Sending Events

Use this method for sending general events to App Insights.

```javascript
// send event any time after activation
reporter.sendTelemetryEvent('sampleEvent', { 'stringProp': 'some string' }, { 'numericMeasure': 123 });
```

## Sending Errors as Events

Use this method for sending error telemetry as traditional events to App Insights. This method will automatically drop error properties in certain environments for first party extensions. The last parameter is an optional list of case-sensitive properties that should be dropped. If no array is passed, we will drop all properties but still send the event.

```javascript
// send an error event any time after activation
reporter.sendTelemetryErrorEvent('sampleErrorEvent', { 'stringProp': 'some string', 'stackProp': 'some user stack trace' }, { 'numericMeasure': 123 }, [ 'stackProp' ]);
```

# Common Properties
- **Extension Name** `common.extname` - The extension name
- **Extension Version** `common.extversion` - The extension version
- **Machine Identifier** `common.vscodemachineid` - A common machine identifier generated by VS Code
- **Session Identifier** `common.vscodesessionid` - A session identifier generated by VS Code
- **VS Code Version** `common.vscodeversion` - The version of VS Code running the extension
- **OS** `common.os` - The OS running VS Code
- **Platform Version** `common.platformversion` - The version of the OS/Platform
- **Product** `common.product` - What Vs code is hosted in, i.e. desktop, github.dev, codespaces.
- **UI Kind** `common.uikind` - Web or Desktop indicating where VS Code is running
- **Remote Name** `common.remotename` - A name to identify the type of remote connection. `other` indicates a remote connection not from the 3 main extensions (ssh, docker, wsl).
- **Architecture** `common.nodeArch` - What architecture of node is running. i.e. arm or x86. On the web it will just say `web`.

# License
[MIT](LICENSE)
