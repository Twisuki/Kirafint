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
	constructor (io) {
		this.Deepseek = new Deepseek();
		this.JsonAnalysis = new JsonAnalysis();
		this.io = io;
	}

	async chat () {
		const msg = [];

		// 初始化
		await this.chatInit(msg);

		while (1) {
			// 获取输入
			const question = await this.io.input(userData.name);

			// 第一次调用
			const content = question + "\n" + JSON.stringify(catalogueData.index);
			msg.push({role: "user", content: content});
			logger.tag("GET", content);

			const response = await this.Deepseek.getResponse(msg);
			msg.push({role: "assistant", content: response});
			logger.tag("GET", response);

			const dsJson = await this.JsonAnalysis.getJson(response);
			logger.tag("JSON", dsJson);

			// 第二次调用
			await this.getAnswer(msg, dsJson.dataNeeded);
		}
	}

	async chatInit (msg) {
		const content = dsData.content.PrecisionMode.init.join("\n");
		msg.push({role: "user", content: content});
		logger.tag("INIT", content);

		const response = await this.Deepseek.getResponse(msg);
		msg.push({role: "assistant", content: response});
		logger.tag("INIT", response);
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
		logger.tag("RES", content);

		const response = await this.Deepseek.getResponse(msg);
		msg.push({role: "assistant", content: response});
		logger.tag("RES", response);

		const dsJson = await this.JsonAnalysis.getJson(response);
		logger.tag("JSON", dsJson);

		await this.io.output(`$ Kirafint > ${dsJson.msgResponse}`);
	}

}

module.exports = Precision;