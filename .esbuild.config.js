const esbuild = require('esbuild');

// Build node packages and their minifed versions
esbuild.build({
	entryPoints: ['src/node/telemetryReporter.ts'],
	tsconfig: "./src/node/tsconfig.json",
	bundle: true,
	external: ['vscode'],
	sourcemap: true,
	platform: 'node',
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
