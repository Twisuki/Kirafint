const inquirer = require("inquirer");
const chalk = require("chalk");

const Deepseek = require("../ai/deepseek")

class Cli {
	constructor (mode) {
		this.mode = mode;
	}

	async start () {
		console.log(chalk.green.bold("Kirafint Cli"));
		console.log(chalk.blueBright("Mode: ", this.mode));

		switch (this.mode) {
			case 1:
				// 精准


				break;
			default:
				console.error(chalk.red("Undefined Parameter!"));
				break;
		}
	}
}

module.exports = Cli;