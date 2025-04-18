#!/usr/bin/env node

const {Command} = require('commander');

const Cli = require("./cli/cli");

const program = new Command();

program
	.name("Kirafint")
	.description("Kirafint, 基于Deepseek API和本地模型的命令行AI Demo")
	.version("0.0.1")
	.requiredOption("-m <key>", "Kirafint Mod")
	.action((option) => {
		const cli = new Cli(option.key);
		cli.start();
	});