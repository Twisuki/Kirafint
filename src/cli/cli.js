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
		// switch (this.mode) {
		// 	case 1:
		// 		// 精准
		// 		const msg = [];
		// 		msg.push({role: "user", content: dsData.content.PrecisionModeInit});
		//
		// 		try {
		// 			process.stdout.write(chalk.blue('DeepSeek: '));
		// 			const response = await this.ds.chat(msg);
		// 			console.log(chalk.blue(response));
		// 			msg.push({role: 'assistant', content: response});
		// 		} catch (error) {
		// 			console.error(chalk.red(`Error: ${error.message}`));
		// 		}
		//
		// 		while (1) {
		// 			const {userInput} = await inquirer.prompt([
		// 				{
		// 					type: "input",
		// 					name: "userInput",
		// 					message: chalk.green(`${userData.name} >`)
		// 				}
		// 			]);
		//
		// 			msg.push({role: 'user', content: userInput});
		//
		// 			try {
		// 				process.stdout.write(chalk.blue('DeepSeek: '));
		// 				const response = await this.ds.chat(msg);
		// 				console.log(chalk.blue(response));
		// 				msg.push({role: 'assistant', content: response});
		// 			} catch (error) {
		// 				console.error(chalk.red(`Error: ${error.message}`));
		// 			}
		// 		}
		//
		// 		break;
	}
}

module.exports = Cli;