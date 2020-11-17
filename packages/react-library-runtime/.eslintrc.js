module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:@typescript-eslint/recommended",
		"react-app",
		//"prettier/@typescript-eslint",
		// "plugin:prettier/recommended",
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
		/*
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/interface-name-prefix": 0,
		"@typescript-eslint/no-empty-function": 0,
		"@typescript-eslint/no-empty-interface": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/no-implicit-any": 0,
		"@typescript-eslint/no-inferrable-types": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		//
		"@typescript-eslint/ban-types": 0,
		*/

		"@typescript-eslint/no-var-requires": 0,

		// consider fixing these
		"@typescript-eslint/no-this-alias": 0,
		"@typescript-eslint/camelcase": 0,
		"no-extra-boolean-cast": 0,

		// needed for JS
		"@typescript-eslint/explicit-function-return-type": 0,

		// our coding standards
		"@typescript-eslint/interface-name-prefix": 0,
		"@typescript-eslint/no-empty-interface": 0,

		// loosen the thumb screws
		"@typescript-eslint/explicit-member-accessibility": 0,
		"@typescript-eslint/no-object-literal-type-assertion": 0,
		"@typescript-eslint/prefer-interface": 0,
		"@typescript-eslint/no-empty-function": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
		"@typescript-eslint/no-inferrable-types": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,

		// fix these eventually
		"prefer-const": 0,
		"no-var": 0,
		"@typescript-eslint/ban-types": 0,
		"import/no-anonymous-default-export": 0,
	},
};
