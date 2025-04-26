const WebSocket = require("ws");
const logger = require("../utils/logger");
const Main = require("../main");

class Server {
  constructor() {
    this.io = {
      // WebSocket 版本的 input 方法
      input: async (prompt) => {
        return new Promise((resolve) => {
          // 需要保存当前 ws 连接，在 connection 处理中设置
          this.currentWs.send(JSON.stringify({
            type: 'input_request',
            prompt: prompt
          }));

          // 设置响应监听器（一次性）
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

      // WebSocket 版本的 output 方法
      output: (msg) => {
        if (this.currentWs) {
          this.currentWs.send(JSON.stringify({
            type: 'output',
            message: msg
          }));
        }
      }
    };

    this.wss = new WebSocket.Server({ port: 2750 });
    this.currentWs = null; // 当前活跃的 WebSocket 连接

    this.setupWebSocket();
  }

  setupWebSocket() {
    this.wss.on("connection", (ws) => {
      logger.info("客户端已连接");
      this.currentWs = ws; // 设置当前连接

      // 初始化 Main 实例
      const main = new Main(this.io);
      main.start().catch(err => {
        logger.error(`Main 执行错误: ${err}`);
      });

      // 消息处理
      ws.on("message", (data) => {
        try {
          const message = JSON.parse(data);
          logger.info(`收到消息: ${data}`);

          // 可以添加其他消息类型的处理
        } catch (e) {
          logger.error(`消息解析错误: ${e}`);
        }
      });

      // 连接关闭处理
      ws.on("close", () => {
        logger.info("用户已断开连接");
        this.currentWs = null;
      });

      // 发送欢迎消息
      this.io.output("欢迎连接 WebSocket 服务器");
    });

    logger.info("WebSocket 正在监听 2750 端口");
  }
}

// 导出 Server 类
module.exports = Server;