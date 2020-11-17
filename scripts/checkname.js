const path = require("path");
const chalk = require("react-dev-utils/chalk");
const paths = require("../config/paths");
const packageName = path.basename(paths.appPath).trim();

const appPackageJson = require(paths.appPackageJson);

if (packageName === "react-library") {
	console.log(
		chalk.red(`Package directory name "react-library" is invalid - rename before building.`)
	);
	console.log("  package path: " + chalk.cyan(`${paths.appPath}`));
	console.log();
	console.log();
	process.exit(1);
}

if (packageName === "react-library-runtime") {
	console.log(
		chalk.red(`Package directory name "react-library" is invalid - rename before building.`)
	);
	console.log("  package path: " + chalk.cyan(`${paths.appPath}`));
	console.log();
	console.log();
	process.exit(1);
}

if (appPackageJson.name !== `@nrcs/${packageName}`) {
	console.log(
		chalk.red(
			`Package "${packageName}": change "name" in package.json to @nrcs/${packageName} before building.`
		)
	);
	console.log("  package path: " + chalk.cyan(`${paths.appPath}`));
	console.log();
	console.log();
	process.exit(1);
}
