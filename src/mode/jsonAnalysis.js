const chalk = require("chalk");

class JsonAnalysis {
	constructor() {

	}

	async getJson (msg) {
		const regex = /\{[\s\n]*"jsonStart":\s*0,[\s\S]*?"jsonEnd":\s*0[\s\n]*\}/;
		const result = msg.match(regex);

		if (!result) {
			console.error(chalk.red("No regex matched!"));
		}

		try {
			return JSON.parse(result[0]);
		} catch (err) {
			console.error(chalk.red("Illegal JSON format!"))
		}
	}
}

module.exports = JsonAnalysis;