const chalk = require("chalk");
const JsonLoader = require("../config/jsonLoader");
const userData = JsonLoader.getJson("user");

function info (msg) {
	if (userData.log) {
		console.log(chalk.blueBright("[INFO] "), msg);
	}
}

function debug (msg) {
	if (userData.log) {
		console.log(chalk.yellowBright("[DEBUG] "), msg);
	}
}

function error (msg) {
	if (userData.log) {
		console.log(chalk.redBright("[ERROR] "), msg);
	}
}
