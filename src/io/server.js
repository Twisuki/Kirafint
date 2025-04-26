const { WebSocketServer } = require("ws");
const logger = require("../utils/logger");
const Main = require("../main");
const JsonLoader = require("../config/jsonLoader");

const userData = JsonLoader.getJson("user");

class Server {
    constructor() {
        this.wss = null;
        this.currentSocket = null; // 保存当前连接的socket
        this.pendingResolve = null; // 用于保存input的resolve函数

        this.io = {
            input: async (prompt) => {
                if (!this.currentSocket) {
                    throw new Error("No client connected");
                }

                // 发送提示给客户端
                this.currentSocket.send(prompt);

                // 返回一个Promise，等待客户端响应
                return new Promise((resolve) => {
                    // 保存resolve函数，待收到消息时调用
                    this.pendingResolve = resolve;
                });
            },
            output: (msg) => {
                if (this.currentSocket) {
                    this.currentSocket.send(msg);
                }
            }
        };
    }

    async start() {
        this.wss = new WebSocketServer({ port: userData.wsPort });

        this.wss.on("connection", (socket) => {
            logger.info("New client connected");
            this.currentSocket = socket;

            // 监听客户端消息
            socket.on("message", (message) => {
                const msg = message.toString();
                if (this.pendingResolve) {
                    // 如果有等待中的input，则解析Promise
                    const resolve = this.pendingResolve;
                    this.pendingResolve = null;
                    resolve(msg);
                }
            });

            // 处理连接关闭
            socket.on("close", () => {
                logger.info("Client disconnected");
                this.currentSocket = null;
                if (this.pendingResolve) {
                    // 如果连接关闭时有等待中的input，则拒绝Promise
                    const resolve = this.pendingResolve;
                    this.pendingResolve = null;
                    resolve(null); // 或者可以 reject
                }
            });

            // 启动主程序
            const main = new Main(this.io);
            main.start().catch(err => {
                logger.error("Main error:", err);
            });
        });
    }
}

module.exports = Server;