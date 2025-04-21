const chalk = require("chalk");

function info (msg) {
	console.log(chalk.blueBright("[INFO] "), msg);
}

function debug (msg) {
	console.log(chalk.yellowBright("[DEBUG] "), msg);
}

function error (msg) {
	console.log(chalk.redBright("[ERROR] "), msg);
}
