#!/usr/bin/env node

const {Command} = require("commander");
const Cli = require("./io/cli");

const program = new Command();

program.action(() => {
	const cli = new Cli();
	cli.start();
});

program.parse(process.argv);
