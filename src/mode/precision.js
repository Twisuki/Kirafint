const inquirer = require("inquirer");
const chalk = require("chalk");
const Deepseek = require("../ai/deepseek");
const JsonAnalysis = require("./jsonAnalysis");
const JsonLoader = require("../config/jsonLoader");

// 读取JSON
const catalogueData = JsonLoader.getJson("catelogue");
const userData = JsonLoader.getJson("user");
const dsData = JsonLoader.getJson("deepseek");

class Precision {
	constructor() {
		this.ds = new Deepseek();
		this.jsonAnalysis = new JsonAnalysis();
	}

	async chat() {
		const msg = [];
		// 初始化
		const content = dsData.content.PrecisionMode.init.join("\n");
		// console.debug(chalk.greenBright("[INIT]", content));
		msg.push({role: "user", content: content});

		const response = await this.ds.getResponse(msg);
		// console.debug(chalk.blueBright("[INIT]", response));
		msg.push({role: "assistant", content: response});

		const initJson = await this.jsonAnalysis.getJson(response);
		// console.debug(chalk.yellowBright("[JSON]", JSON.stringify(initJson)));

		while (1) {
			// 获取输入
			const {userInput} = await inquirer.prompt([
				{
					type: "input",
					name: "userInput",
					message: chalk.green(`${userData.name} >`)
				}
			]);

			// 拼接问题
			const qustionContent = userInput + "\n" + JSON.stringify(catalogueData.index);
			// console.debug(chalk.greenBright("[INDEX]", qustionContent));
			msg.push({role: "user", content: qustionContent});

			const qustionResponse = await this.ds.getResponse(msg);
			// console.debug(chalk.blueBright("[INDEX]",qustionResponse));
			msg.push({role: "assistant", content: qustionResponse});

			// 获取文章
			const indexJson = await this.jsonAnalysis.getJson(qustionResponse);
			// console.debug(chalk.yellowBright("[JSON]", JSON.stringify(indexJson)));

			const dataNeeded = [];
			for (const key in indexJson.dataNeeded) {
				let count = 0;
				for (const article of catalogueData.article) {
					if (article.tag === key) {
						dataNeeded.push(article);
						count ++;
					}
					if (count >= indexJson.dataNeeded[key]) {
						break;
					}
				}
			}

			// 上传文章
			const dataContent = JSON.stringify(dataNeeded);
			// console.debug(chalk.greenBright("[DATA]", dataContent));
			msg.push({role: "user", content: dataContent});

			// 获取回复
			const answerResponse = await this.ds.getResponse(msg);
			// console.debug(chalk.blueBright("[INDEX]", answerResponse));
			msg.push({role: "assistant", content: answerResponse});

			const answerJson = await this.jsonAnalysis.getJson(answerResponse);
			// console.debug(chalk.yellowBright("[JSON]", JSON.stringify(answerJson)));

			console.log(chalk.cyanBright("$ Kirafint > ", answerJson.msgResponse));
		}
	}
}

module.exports = Precision;