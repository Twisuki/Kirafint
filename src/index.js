#!/usr/bin/env node

const Cli = require("./io/cli");

async function main () {
	const cli = new Cli();
	await cli.start();
}