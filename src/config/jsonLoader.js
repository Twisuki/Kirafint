const logger = require("../utils/logger");

// 读取JSON
let dsData = {};
try {
	dsData = require("../config/deepseek.json");
} catch (err) {
	logger.error("Can't find deepseek.json!");
}
let userData = {};
try {
	userData = require("../config/user.json");
} catch (err) {
	logger.error("Can't find user.json!");
}
let catalogueData = {};
try {
	catalogueData = require("../data/catalogue.json");
} catch (err) {
	logger.error("Can't find index.json!");
}

class JsonLoader {
	static getJson (name) {
		switch (name) {
			case "deepseek":
				return dsData;
			case "user":
				return userData;
			case "catalogue":
				return catalogueData;
			default:
				console.error(chalk.red(`Can't find ${name}.json!`));
				return {};
		}
	}
}

module.exports = JsonLoader