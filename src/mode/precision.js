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
					name: "question",
					message: chalk.green(`${userData.name} >`)
				}
			]);

			// 第一次调用
			const content = question + "\n" + JSON.stringify(catalogueData.index);
			msg.push({role: "user", content: content});
			logger.custom("GET", "#00aaff", content);

			const response = await this.Deepseek.getResponse(msg);
			msg.push({role: "assistant", content: response});
			logger.custom("GET", "#00aaff", response);

			const dsJson = await this.JsonAnalysis.getJson(response);
			logger.custom("JSON", "#ffff00", dsJson);

			// 第二次调用
			await this.getAnswer(msg, dsJson.dataNeeded);
		}
	}

	async chatInit (msg) {
		const content = dsData.content.PrecisionMode.init.join("\n");
		msg.push({role: "user", content: content});
		logger.custom("INIT", "#00aaff", content);

		const response = await this.Deepseek.getResponse(msg);
		msg.push({role: "assistant", content: response});
		logger.custom("INIT", "#00aaff", response);
	}

	async getAnswer (msg, dataNeeded) {
		const article = [];
		for (const tagName in dataNeeded) {
			let count = 0;
			for (const obj of catalogueData.article) {
				if (obj.tag === tagName) {
					article.push(JSON.stringify(obj));
					count ++;
				}

				if (count >= dataNeeded[tagName]) {
					break;
				}
			}
		}

		const content = article.toString();
		msg.push({role: "user", content: content});
		logger.custom("RES", "#88ff00", content);

		const response = await this.Deepseek.getResponse(msg);
		msg.push({role: "assistant", content: response});
		logger.custom("RES", "#88ff00", response);

		const dsJson = await this.JsonAnalysis.getJson(response);
		logger.custom("JSON", "#ffff00", dsJson);

		console.log(chalk.blueBright("$ Kirafint > ", dsJson.msgResponse));
	}

}

module.exports = Precision;