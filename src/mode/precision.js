const inquirer = require("inquirer");
const chalk = require("chalk");
const Deepseek = require("../ai/deepseek");

// 读取JSON
let dsData = {};
try {
	dsData = require("../config/deepseek.json");
} catch (err) {
	console.error(chalk.red("Can't find deepseek.json!"));
}
let userData = {}
try {
	userData = require("../config/user.json");
} catch (err) {
	console.error(chalk.red("Can't find user.json!"));
}

class Precision {
	constructor() {
		this.ds = new Deepseek();
	}
	async chat () {
		const msg = [];
		msg.push({role: "user", content: dsData.content.PrecisionModeInit});
		const response = await this.ds.chat(msg);
		console.log(chalk.green("[INIT]"), chalk.blueBright(response));

		while (1) {
			const {userInput} = await inquirer.prompt([
				{
					type: "input",
					name: "userInput",
					message: chalk.green(`${userData.name} >`)
				}
			]);

			msg.push({role: "user", content: userInput});

			try {
				process.stdout.write(chalk.blueBright("Kirafint: "));
				const response = await this.ds.chat(msg);
				console.log(chalk.blueBright(response));
				msg.push({role: "assistant", content: response});
			} catch (error) {
				console.error(chalk.red(`Error: ${error.message}`));
			}
		}
	}
}

module.exports = Precision;