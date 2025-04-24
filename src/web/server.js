const WebSocket = require("ws");
const logger = require("../utils/logger")

const wss = new WebSocket.Server({ port: 2750 });

// 连接处理
wss.on("connection", (ws) => {
	logger.debug("logger: 客户端已连接");
});