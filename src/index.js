#!/usr/bin/env node

const {Command} = require("commander");
const Cli = require("./io/cli");
const Server = require("./io/server");

const program = new Command();

program
	.name("Kirafint")
	.description("基于Deepseek API和本地模型的AI Demo")
	.option("-c, --cli", "命令行模式")
	.option("-s, --server", "服务器模式")

program.parse(process.argv);

const options = program.opts();
if (options.cli) {
	const cli = new Cli();
	cli.start();
} else if (options.server) {
	const server = new Server();
	server.start();
} else if (Object.keys(options).length === 0) {
	program.help();
}