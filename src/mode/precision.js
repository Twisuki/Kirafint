const inquirer = require("inquirer");
const chalk = require("chalk");
const Deepseek = require("../ai/deepseek");
const JsonAnalysis = require("./jsonAnalysis");
const JsonLoader = require("../config/jsonLoader");
const logger = require("../utils/logger");

// 读取JSON
const catalogueData = JsonLoader.getJson("catalogue");
const userData = JsonLoader.getJson("user");
const dsData = JsonLoader.getJson("deepseek");

class Precision {
	constructor () {
		this.Deepseek = new Deepseek();
		this.JsonAnalysis = new JsonAnalysis();
	}

	async chat () {
		const msg = [];

		// 初始化
		await this.chatInit(msg);

		while (1) {
			// 获取输入
			const {question} = await inquirer.prompt([
				{
					type: "input",
					name: "userInput",
					message: chalk.green(`${userData.name} >`)
				}
			]);

			// 第一次调用
			const content = question + "\n" + JSON.stringify(catalogueData.index);
			msg.push({role: "user", content: content});

			const response = await this.Deepseek.getResponse(msg);
			msg.push({role: "assistant", content: response});

			const dsJson = await this.JsonAnalysis.getJson(response);

			// 第二次调用
			await this.getAnswer(msg, dsJson.dataNeeded);
		}
	}

	async chatInit (msg) {
		const content = dsData.content.PrecisionMode.init.join("\n");
		msg.push({role: "user", content: content});

		const response = await this.Deepseek.getResponse(msg);
		msg.push({role: "assistant", content: response});
	}

	async getAnswer (msg, dataNeeded) {
		const content = JSON.stringify(dataNeeded);
		msg.push({role: "user", content: content});

		const response = await this.Deepseek.getResponse(msg);
		msg.push({role: "assistant", content: response});

		const dsJson = this.JsonAnalysis.getJson(response);

		console.log(chalk.blueBright("$ Kirafint > ", dsJson.msgResponse));
	}

}

module.exports = Precision;