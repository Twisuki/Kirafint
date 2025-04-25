const chalk = require("chalk");
const inquirer = require("inquirer");
const main = require("../main");
const logger = require("../utils/logger");

// 主控制
class Cli {
	constructor (mode) {
		this.mode = mode;
	}

	async start () {
		const main = new main(await this.io);
		await main.start();
	}

	async io () {
		return {
			input: async (prompt) => {
				const answer = await inquirer.prompt([
					{
						type: 'input',
						name: 'answer',
						message: prompt,
					}
				]);
				return answer.answer;
			},
			output: (data) => console.log(chalk.blueBright(data))
		}
	}
}

module.exports = Cli;