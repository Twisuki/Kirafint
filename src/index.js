#!/usr/bin/env node

const {Command} = require("commander");
const Cli = require("./io/cli");
const Server = require("./io/server");

const program = new Command();

program.action(() => {
	if (0) {
		const cli = new Cli();
		cli.start();
	} else {
		const server = new Server();
		server.start();
	}
});

program.parse(process.argv);