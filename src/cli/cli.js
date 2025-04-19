const chalk = require("chalk");
const Precision = require("../mode/precision");

// 主控制
class Cli {
	constructor(mode) {
		this.mode = mode;
	}

	async start() {
		console.log(chalk.green.bold("Kirafint Cli"));
		console.log(chalk.blueBright("Mode: ", this.mode));

		let mode = 0;
		try {
			mode = Number(this.mode);
		} catch (err) {
			console.error(chalk.red(`Undefined Parameter ${mode}`));
		}
		switch (mode) {
			case 1:
				const precision = new Precision();
				await precision.chat();
				break;
			default:
				console.error(chalk.red(`Undefined Parameter ${mode}`));
				break;
		}
	}
}

module.exports = Cli;