const { execSync } = require("child_process");

const hasYarn = () => {
	try {
		execSync("npm list yarn --depth=0");
		return true;
	} catch {
		return false;
	}
};

if (!hasYarn()) {
	execSync("npm i yarn");
}
