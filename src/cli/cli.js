const chalk = require("chalk");
const inquirer = require("inquirer");
const Precision = require("../mode/precision");
const logger = require("../utils/logger");

// 主控制
class Cli {
	constructor (mode) {
		this.mode = mode;
	}

	async start () {
		logger.info("Kirafint Cli");
		logger.info(`Mode: ${this.mode}`);

		const mode = Number(this.mode);
		switch (mode) {
			case 1:
				const precision = new Precision();
				await precision.chat();
				break;

			default:
				logger.error(`Undefined Parameter ${mode}`);
				break;
		}
	}

	async getInput (name) {
		// 获取输入
		const {userInput} = await inquirer.prompt([
			{
				type: "input",
				name: "userInput",
				message: chalk.green(`${name} >`)
			}
		]);

		return userInput;
	}

	async output (msg) {

	}
}

module.exports = Cli;