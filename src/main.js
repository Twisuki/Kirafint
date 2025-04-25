const logger = require("./utils/logger");
const Precision = require("./mode/precision");

class Main {
	constructor (io) {
		this.io = io;
	}

	async start () {
		logger.info("Kirafint Cli");

		const mode = Number(await this.io.input());
		logger.info(`Mode: ${mode}`);

		switch (mode) {
			case 1:
				const Precision = require("./mode/precision");
				const precision = new Precision();
				await precision.chat();
				break;

			default:
				logger.error(`Undefined Parameter ${mode}`);
				break;
		}
	}

	async getInput (prompt) {
		return await this.io.input(prompt);
	}

	async output (msg) {
		await this.io.output(msg);
	}
}

module.exports =  Main;