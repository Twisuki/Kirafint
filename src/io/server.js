const WebSocket = require("ws");
const logger = require("../utils/logger");
const Main = require("../main");
const JsonLoader = require("../config/jsonLoader");

const userData = JsonLoader.getJson("user");

class Server {
	constructor () {
		this.io = {
			input: async (prompt) => {
				return new Promise((resolve) => {
					this.currentWs.send(JSON.stringify({
						type: 'input_request',
						prompt: prompt
					}));

					const listener = (data) => {
						const message = JSON.parse(data);
						if (message.type === 'input_response') {
							this.currentWs.removeListener('message', listener);
							resolve(message.answer);
						}
					};
					this.currentWs.on('message', listener);
				});
			},

			output: (msg) => {
				if (this.currentWs) {
					this.currentWs.send(JSON.stringify({
						type: 'output',
						message: msg
					}));
				}
			}
		};

		this.wss = new WebSocket.Server({port: userData.wsPort});
		this.currentWs = null;

		this.setup();
	}

	setup () {
		this.wss.on("connection", (ws) => {
			logger.info("客户端已连接");
			this.currentWs = ws;

			// 初始化 Main 实例
			const main = new Main(this.io);
			main.start().catch(err => {
				logger.error(`Main 执行错误: ${err}`);
			});

			ws.on("message", (data) => {
				try {
					const message = JSON.parse(data);
					logger.info(`收到消息: ${data}`);
				} catch (e) {
					logger.error(`消息解析错误: ${e}`);
				}
			});

			// 连接关闭
			ws.on("close", () => {
				logger.info("用户已断开连接");
				this.currentWs = null;
			});

			// 欢迎消息
			this.io.output("欢迎连接 WebSocket 服务器");
		});

		logger.info(`WebSocket 正在监听 ${userData.wsPort} 端口`);
	}
}

module.exports = Server;