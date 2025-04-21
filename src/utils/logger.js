const chalk = require("chalk");
const JsonLoader = require("../config/jsonLoader");
const userData = JsonLoader.getJson("user");

module.exports = {
    info(msg) {
        if (userData.log.info) {
            console.log(chalk.blueBright("[INFO] "), msg);
        }
    },
    debug(msg) {
        if (userData.log.debug) {
            console.log(chalk.yellowBright("[DEBUG] "), msg);
        }
    },
    error(msg) {
        if (userData.log.error) {
            console.log(chalk.redBright("[ERROR] "), msg);
        }
    }
};