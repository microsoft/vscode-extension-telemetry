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

# Advanced Features (v1.3.0+)

## Custom Endpoints and Configuration

Route telemetry to non-Azure endpoints (e.g., GitHub telemetry) and configure common properties and static tags:

```javascript
import TelemetryReporter from '@vscode/extension-telemetry';
import * as os from 'os';

const reporter = new TelemetryReporter(
   connectionString,
   undefined,  // replacementOptions
   undefined,  // initializationOptions
   undefined,  // customFetch
   {
      // Custom endpoint URL - route to GitHub, Azure Gov, or other services
      endpointUrl: 'https://copilot-telemetry.githubusercontent.com/telemetry',
      
      // Common properties - automatically added to all events
      commonProperties: {
         'common_os': os.platform(),
         'common_arch': os.arch(),
         'custom_property': 'value'
      },
      
      // Static tag overrides - applied to all events (RECOMMENDED for static tags)
      tagOverrides: {
         'ai.cloud.roleInstance': 'REDACTED',
         'ai.session.id': sessionId,
         'ai.cloud.role': 'my-service'
      }
   }
);
```

**When to use constructor options:**
- ✅ All values are known at reporter construction time
- ✅ Values don't change during the reporter's lifetime
- ✅ **This is the recommended approach for most use cases**

## Per-Event Tag Overrides

For dynamic tags that change per event (e.g., user tracking IDs from authentication tokens):

```javascript
// Get dynamic tracking ID that changes per event
const trackingId = getTrackingIdFromToken();

// Send event with per-event tag override using the 4th parameter
reporter.sendTelemetryEvent(
   'userAction',
   { 'action': 'click' },
   { 'duration': 123 },
   { 'ai.user.id': trackingId }  // Overrides user ID for this event only
);

// Error events also support per-event tag overrides
reporter.sendTelemetryErrorEvent(
   'errorEvent',
   { 'error': error.message },
   { 'errorCount': 1 },
   { 'ai.user.id': trackingId },  // Per-event tag override
   [ 'stackProp' ]  // Properties to drop
);
```

**Tag Merging Priority** (lowest to highest):
1. Constructor `tagOverrides` (static, set at initialization)
2. Context tags via `setContextTag()` (can be set after construction)
3. **Per-event `tagOverrides`** (highest priority, dynamic per event)

## Runtime Tag Management (Advanced)

For edge cases where tags are not available at construction or need to change at runtime:

```javascript
const reporter = new TelemetryReporter(connectionString);

// Set context tag after construction (e.g., after async initialization)
authService.getSession().then(session => {
   reporter.setContextTag('ai.session.id', session.id);
});

// Update tag at runtime (e.g., user switches accounts)
reporter.setContextTag('ai.user.id', 'user1');
// ... later ...
reporter.setContextTag('ai.user.id', 'user2');

// Read back a context tag value
const sessionId = reporter.getContextTag('ai.session.id');
```

**When to use `setContextTag()`:**
- ⚠️ Tags are not available when the reporter is constructed
- ⚠️ Tags need to change at runtime (e.g., user account switching)
- ⚠️ You need to read tag values back later

**Note:** For most use cases, prefer constructor `tagOverrides` over `setContextTag()` for better immutability and clarity.

# Common Properties
- **Extension Name** `common.extname` - The extension name
- **Extension Version** `common.extversion` - The extension version
- **Machine Identifier** `common.vscodemachineid` - A common machine identifier generated by VS Code
- **Session Identifier** `common.vscodesessionid` - A session identifier generated by VS Code
- **VS Code Commit** `common.vscodecommithash` - A VS Code commit hash
- **VS Code Version** `common.vscodeversion` - The version of VS Code running the extension
- **OS** `common.os` - The OS running VS Code
- **Platform Version** `common.platformversion` - The version of the OS/Platform
- **Product** `common.product` - What Vs code is hosted in, i.e. desktop, github.dev, codespaces.
- **UI Kind** `common.uikind` - Web or Desktop indicating where VS Code is running
- **Remote Name** `common.remotename` - A name to identify the type of remote connection. `other` indicates a remote connection not from the 3 main extensions (ssh, docker, wsl).
- **Architecture** `common.nodeArch` - What architecture of node is running. i.e. arm or x86. On the web it will just say `web`.

# License
[MIT](LICENSE)
