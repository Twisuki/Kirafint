const chalk = require("chalk");
const JsonLoader = require("../config/jsonLoader");
const userData = JsonLoader.getJson("user");

module.exports = {
	info (msg) {
		if (userData.log.info) {
			console.log(chalk.blueBright("[INFO] "), msg);
		}
	},
	debug (msg) {
		if (userData.log.debug) {
			console.log(chalk.yellowBright("[DEBUG] "), msg);
		}
	},
	error (msg) {
		if (userData.log.error) {
			console.log(chalk.redBright("[ERROR] "), msg);
		}
	},
	custom (label, color = "#00aaff", msg) {
		if (userData.log.custom.all) {
			if (label in userData.log.custom) {
				if (userData.log.custom[label]) {
					console.log(chalk.hex(color)(`[${label}] `), msg);
				}
			} else {
				if (userData.log.custom.default) {
					console.log(chalk.hex(color)(`[${label}] `), msg);
				}
			}
		}
	},
	tag (label, msg) {
		if (userData.log.tag.all) {
			if (label in userData.log.tag) {
				if (userData.log.tag[label].enabled) {
					console.log(chalk.hex(userData.log.tag[label].color)(`[${label}] `), msg);
				}
			} else {
				if (userData.log.tag.default.enabled) {
					console.log(chalk.hex(userData.log.default.color)(`[${label}] `), msg);
				}
			}
		}
	}
};