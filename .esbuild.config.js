const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Removes the warning from the app insights module since we don't want it to spam the console
function patchAppInsightsModules() {
	const nodeAppInsightsModule = fs.readFileSync(path.join(__dirname, 'node_modules/applicationinsights/out/Library/Config.js'), 'utf8');
	const fileWithRemovedWarning = nodeAppInsightsModule.replace(/Logging.warn\([^)]*invalid instrumentation key[^)]*\)/, '// Warning removed');
	fs.writeFileSync(path.join(__dirname, 'node_modules/applicationinsights/out/Library/Config.js'), fileWithRemovedWarning, 'utf8');
}

patchAppInsightsModules();

// Build node packages and their minifed versions
esbuild.build({
	entryPoints: ['src/node/telemetryReporter.ts'],
	tsconfig: "./src/node/tsconfig.json",
	bundle: true,
	external: ['vscode'],
	sourcemap: true,
	platform: 'node',
	target: ['node12'],
	outfile: 'lib/telemetryReporter.node.js',
}).catch(() => process.exit(1))

esbuild.build({
	entryPoints: ['src/node/telemetryReporter.ts'],
	tsconfig: "./src/node/tsconfig.json",
	bundle: true,
	sourcemap: false,
	external: ['vscode'],
	minify: true,
	platform: 'node',
	target: ['node12'],
	outfile: 'lib/telemetryReporter.node.min.js',
}).catch(() => process.exit(1))

// Build browser packages and their minified versions
esbuild.build({
	entryPoints: ['src/browser/telemetryReporter.ts'],
	format: "esm",
	tsconfig: "./src/browser/tsconfig.json",
	bundle: true,
	sourcemap: true,
	external: ['vscode'],
	platform: 'browser',
	outfile: 'lib/telemetryReporter.web.js',
}).catch(() => process.exit(1))

esbuild.build({
	entryPoints: ['src/browser/telemetryReporter.ts'],
	tsconfig: "./src/browser/tsconfig.json",
	format: "esm",
	bundle: true,
	sourcemap: false,
	external: ['vscode'],
	minify: true,
	platform: 'browser',
	outfile: 'lib/telemetryReporter.web.min.js',
}).catch(() => process.exit(1))
