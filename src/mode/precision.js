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
let userData = {};
try {
	userData = require("../config/user.json");
} catch (err) {
	console.error(chalk.red("Can't find user.json!"));
}
let indexData = {};
try {
	indexData = require("../data/index.json");
} catch (err) {
	console.error(chalk.red("Can't find index.json!"));
}

class Precision {
	constructor() {
		this.ds = new Deepseek();
	}

	async chat() {
		const msg = [];
		// 初始化
		const content = dsData.content.PrecisionMode.init.join("\n");
		msg.push({role: "user", content: content});
		console.log(chalk.green("[INIT]"), chalk.greenBright(content));

		const response = await this.ds.chat(msg);
		console.log(chalk.green("[INIT]"), chalk.blueBright(response));
		msg.push({role: "assistant", content: response});

		while (1) {
			// 获取输入
			const {userInput} = await inquirer.prompt([
				{
					type: "input",
					name: "userInput",
					message: chalk.green(`${userData.name} >`)
				}
			]);

			msg.push({role: "user", content: userInput});

			try {
				const response = await this.ds.chat(msg);
				console.log(chalk.green("[INDEX]"), chalk.blueBright(response));
				msg.push({role: "assistant", content: response});
			} catch (error) {
				console.error(chalk.red(`Error: ${error.message}`));
			}
		}
	}
}

module.exports = Precision;