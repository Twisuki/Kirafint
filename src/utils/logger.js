const chalk = require("chalk");
const JsonLoader = require("../config/jsonLoader");
const userData = JsonLoader.getJson("user");

export function info (msg) {
	if (userData.log) {
		console.log(chalk.blueBright("[INFO] "), msg);
	}
}

export function debug (msg) {
	if (userData.log) {
		console.log(chalk.yellowBright("[DEBUG] "), msg);
	}
}

export function error (msg) {
	if (userData.log) {
		console.log(chalk.redBright("[ERROR] "), msg);
	}
}
