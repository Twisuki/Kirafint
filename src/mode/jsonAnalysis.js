const chalk = require("chalk");

class JsonAnalysis {
	constructor() {

	}

	async getJson (msg) {
		const regex = /\{\s*"jsonStart"\s*:\s*0\s*,\s*([\s\S]*?)\s*"jsonEnd"\s*:\s*0\s*\}/;
		const result = msg.match(regex);

		if (!result) {
			console.error(chalk.red("No regex matched!"));
		}

		try {
			return JSON.parse(result[0]).json;
		} catch (err) {
			console.error(chalk.red("Illegal JSON format!"))
		}
	}
}

module.exports = JsonAnalysis;