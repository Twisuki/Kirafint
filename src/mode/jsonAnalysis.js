const logger = require("../utils/logger");

class JsonAnalysis {
	constructor () {

	}

	async getJson (msg) {
		const regex = /\{\s*"jsonStart"\s*:\s*0\s*,\s*([\s\S]*?)\s*"jsonEnd"\s*:\s*0\s*\}/;
		const result = msg.match(regex);

		if (!result) {
			logger.error("No regex matched!");
		}

		try {
			return JSON.parse(result[0]).json;
		} catch (err) {
			logger.error("Illegal JSON format!");
		}
	}
}

module.exports = JsonAnalysis;