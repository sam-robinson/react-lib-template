module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended",
		"react-app",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended",
	],
	plugins: ["@typescript-eslint", "react"],
	parserOptions: {
		ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
		sourceType: "module", // Allows for the use of imports
	},
	ignorePatterns: [
		"**/config/**/*.*",
		"**/scripts/**/*.*",
		"**/build/**/*.*",
		"**/dist/**/*.*",
		"**/*.spec.ts",
		"**/*.spec.tsx",
	],
	rules: {
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/interface-name-prefix": 0,
		"@typescript-eslint/no-empty-function": 0,
		"@typescript-eslint/no-empty-interface": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-inferrable-types": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		//
		"@typescript-eslint/ban-types": 0,
	},
};
