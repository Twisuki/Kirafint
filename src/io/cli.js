const chalk = require("chalk");
const inquirer = require("inquirer");
const Main = require("../main");

// 主控制
class Cli {
	constructor () {
		this.io = {
			input: async (prompt) => {
				const answer = await inquirer.prompt([
					{
						type: 'input',
						name: 'answer',
						message: chalk.green(`${prompt} >`),
					}
				]);
				return answer.answer;
			},
			output: (msg) => console.log(chalk.blueBright(msg))
		};
	}
	async start () {
		const main = new Main(await this.io);
		await main.start();
	}
}

module.exports = Cli;