const WebSocket = require("ws");
const Precision = require("../mode/precision");
const logger = require("../utils/logger")

const wss = new WebSocket.Server({ port: 2750 });

// 连接处理
wss.on("connection", (ws) => {
	logger.info("客户端已连接");

	// 接收消息
	ws.on("message", (msg) => {
		logger.info(`收到消息: ${msg}`);

		ws.send(`服务器收到消息: ${msg}`);
	});

	// 连接关闭
	ws.on("close", () => {
		logger.info("用户已断开连接");
	})

	ws.send("欢迎连接ws服务器");
	setInterval(() => {
		ws.send(Math.random());
	}, 1000);
});

logger.info("ws正在监听2750端口");