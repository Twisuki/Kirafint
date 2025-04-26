const {WebSocketServer} = require("ws");
const logger = require("../utils/logger");
const Main = require("../main");
const JsonLoader = require("../config/jsonLoader");

const userData = JsonLoader.getJson("user");

class Server {
	constructor () {
		this.wss = null;

		this.io = {
			input: async (prompt) => {
				this.wss.on("connection", (socket) => {
					socket.send(prompt);
					this.wss.on("message", (msg) => {
						return msg;
					});
				});
			},
			output: (msg) => {
				this.wss.on("connection", (socket) => {
					socket.send(msg);
				});
			}
		};
	}

	async start () {
		this.wss = new WebSocketServer({port: userData.wsPort});

		this.wss.on("connection", (socket) => {
			const main = new Main(this.io);
			main.start();
		});
	}
}

module.exports = Server;