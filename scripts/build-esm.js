const execa = require("execa");
const paths = require("../config/paths");
const fs_Extra = require("fs-extra");

const shell = (cmd) => execa(cmd, { stdio: ["pipe", "pipe", "inherit"], shell: true });

const babel = (envName) =>
	shell(
		`yarn babel ${paths.appSrc} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${paths.esmBuild} --env-name "${envName}"`
	);

const buildEsm = async () => {
	await babel("esm");
	await shell(`cpy ${paths.appPath}/package.esm.json ${paths.appBuild} --rename=package.json`);
	await shell(`cpy ${paths.appSrc}/*.scss ${paths.esmBuild}`);

	fs_Extra.copy(`${paths.appSrc}/scss`, `${paths.esmBuild}/scss`, (err) =>
		err ? console.error(err) : console.log("copy scss folder successful")
	);

	fs_Extra.copy(`${paths.appPath}/dist/types`, `${paths.appBuild}/types`, (err) =>
		err ? console.error(err) : console.log("copy types folder successful")
	);
};

buildEsm();
