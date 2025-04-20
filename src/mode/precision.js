const inquirer = require("inquirer");
const chalk = require("chalk");
const Deepseek = require("../ai/deepseek");
const JsonAnalysis = require("./jsonAnalysis");

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
		this.jsonAnalysis = new JsonAnalysis();
	}

	async chat() {
		const msg = [];
		// 初始化
		const content = dsData.content.PrecisionMode.init.join("\n");
		console.debug(chalk.greenBright("[LC INIT]", content));
		msg.push({role: "user", content: content});

		const response = await this.ds.chat(msg);
		console.debug(chalk.blueBright("[DS INIT]", response));
		msg.push({role: "assistant", content: response});

		const initJson = this.jsonAnalysis.getJson(response);

		while (1) {
			// 获取输入
			const {userInput} = await inquirer.prompt([
				{
					type: "input",
					name: "userInput",
					message: chalk.green(`${userData.name} >`)
				}
			]);
			const content = userInput + indexData.index;
			msg.push({role: "user", content: content});

			const response = await this.ds.chat(msg);
			console.debug(chalk.blueBright("[INDEX]", response));
			msg.push({role: "assistant", content: response});

			// 获取文章
			const indexJson = this.jsonAnalysis.getJson(response);
		}
	}
}

module.exports = Precision;