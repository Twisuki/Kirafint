const inquirer = require('inquirer');
const chalk = require('chalk');

class Cli {
	constructor (mode) {
		this.mode = mode;
	}

	async start () {
		console.log(chalk.green.bold("Kirafint Cli"));
		console.log(chalk.blueBright("Mode: ", this.mode));


	}
}

module.exports = Cli;