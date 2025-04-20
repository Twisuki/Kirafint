class JsonAnalysis {
	constructor() {

	}

	async getJson (msg) {
		console.debug(msg);
		const regex = /\{([\S\s].?)"jsonStart": 0,([\S\s].?)"jsonEnd": 0([\S\s].?)}/;
		const result = msg.match(regex);
		console.debug(result);
		return result[0];
	}
}

module.exports = JsonAnalysis;