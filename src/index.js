#!/usr/bin/env node

const {Command} = require("commander");
const Cli = require("./io/cli");

const program = new Command();
program
	.name("Kirafint")
	.description("Kirafint, 基于Deepseek API和本地模型的命令行AI Demo")
	.version("0.0.1")
	.requiredOption("-m, --mode <mode>", "Kirafint Mode")
	.action((options) => {
		const cli = new Cli(options.mode);
		cli.start();
	});

program.parse(process.argv);