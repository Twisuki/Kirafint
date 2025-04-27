const logger = require("./utils/logger");
const Precision = require("./mode/precision");

class Main {
	constructor (io) {
		this.io = io;
		this.precision = new Precision(this.io);
	}

	async start () {
		logger.info("Kirafint Cli");

		this.io.output("Mode 1: Precision, Mode 2: Balanced");
		const mode = Number(await this.io.input("Mode(1, 2)"));
		logger.info(`Mode: ${mode}`);

		switch (mode) {
			case 1:
				await this.precision.chat();
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

module.exports = Main;