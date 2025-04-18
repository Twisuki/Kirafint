const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const Deepseek = require("../ai/deepseek")

// 读取用户JSON
let json = {};
try {
	const data = fs.readFileSync("../config/deepseek.json", "utf8");
	json = JSON.parse(data);
} catch (err) {
	console.error(chalk.red("Can't find deepseek.json!"));
}

// 主控制
class Cli {
	constructor(mode) {
		this.mode = mode;
		this.ds = new Deepseek();
	}

	async start() {
		console.log(chalk.green.bold("Kirafint Cli"));
		console.log(chalk.blueBright("Mode: ", this.mode));

		switch (this.mode) {
			case 1:
				// 精准
				const msg = [];
				msg.push({role: "user", content: json.content.PrecisionModeInit});

				try {
					process.stdout.write(chalk.blue('DeepSeek: '));
					const response = await this.ds.chat(msg);
					console.log(chalk.blue(response));
					msg.push({role: 'assistant', content: response});
				} catch (error) {
					console.error(chalk.red(`Error: ${error.message}`));
				}

				while (1) {
					const {userInput} = await inquirer.prompt([
						{
							type: "input",
							name: "userInput",
							message: chalk.green("User >")
						}
					]);
				}

				break;
			default:
				console.error(chalk.red("Undefined Parameter!"));
				break;
		}
	}
}

module.exports = Cli;