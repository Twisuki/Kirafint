const chalk = require("chalk");
const Precision = require("../mode/precision");
const logger = require("../utils/logger");

// 主控制
class Cli {
	constructor (mode) {
		this.mode = mode;
	}

	async start () {
		logger.info("Kirafint Cli");
		logger.info(`Mode: ${this.mode}`);

		const mode = Number(this.mode);
		switch (mode) {
			case 1:
				const precision = new Precision();
				await precision.chat();
				break;

			default:
				logger.error(`Undefined Parameter ${mode}`);
				break;
		}
	}

	async output (msg) {

	}
}

module.exports = Cli;