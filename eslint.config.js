// @ts-check
// CommonJS format is used because this package has no "type": "module"
const tseslint = require("typescript-eslint");
const globals = require("globals");

module.exports = tseslint.config(
    {
        ignores: ["node_modules", "**/*.d.ts", "**/*.js"],
    },
    {
        files: ["**/*.ts"],
        extends: [
            ...tseslint.configs.recommended,
        ],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.commonjs,
                ...globals.browser,
                ...globals.es2015,
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            },
            parserOptions: {
                ecmaVersion: 2018,
            },
        },
        rules: {
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "no-console": "off",
            "no-var": 1,
            "no-case-declarations": 0,
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "object-curly-spacing": [2, "always"],
        },
    }
);
