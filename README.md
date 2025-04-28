# Kirafint, 基于Deepseek API和本地模型的AI Demo

[Twisuki](https://twis.uk)

---

## 模式

```text
1. 精准模式
```

## 结构

```FilesTree
Kirafint
├── src
│   ├── ai
│   │   ├── deepseek.js
│   │   └── local.js
│   ├── config
│   │   ├── deepseek.json
│   │   ├── jsonLoader.js
│   │   └── user.json
│   ├── data
│   │   └── catalogue.json
│   ├── io
│   │   ├── cli.js
│   │   └── server.js
│   ├── mode
│   │   ├── jsonAnalysis.js
│   │   └── precision.js
│   ├── util
│   │   └── logger.js
│   ├── index.js
│   └── main.js
├── static
│   ├── img/shizuku.png
│   ├── index.css
│   └── index.js
├── .gitignore
├── index.html
├── kf.bat
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
└── README.md
```

## 配置

src/config/user.json
```src/config/user.json
{
	"name": "Twisuki",
	"dsKey": YOUR_DEEPSEEK_API_KEY,
	"wsPort": YOUR_FREE_IP_PORT,
	"log": {
		"info": true,
		"debug": true,
		"error": true,
		"custom": true,
		"tag": {
			"all": true,
			"default": {
				"color": "#00ff88",
				"enabled": true
			},
			"INIT": {
				"color": "#00aaff",
				"enabled": true
			},
			"GET": {
				"color": "#ff8800",
				"enabled": true
			},
			"RES": {
				"color": "#88ff00",
				"enabled": true
			},
			"JSON": {
				"color": "#ffff00",
				"enabled": true
			}
		}
	}
}
```

.gitignore
```.gitignore
.gitignore
.idea/
.vscode/
node_modules/
src/config/user.json

```

## 安装

```bash
pnpm install
```

## 使用

### 1. 启动

- `./kf -h, --help` 显示帮助
- `./kf -c, --cli` 命令行模式
- `./kf -s, --server` 服务器模式

若启动服务器模式, 可运行`index.html`客户端, 若客户端显示`[LOG] WebSocket错误:`, 请启动服务器后刷新.

不要同时启动多个`index.html`客户端, 同时注意端口占用. 

服务器端口可在`src/config/user.json`中`wsPort`修改.

客户端端口默认为`2750`, 可在`static/index.js`中第58行手动修改.

```js
const socket = new WebSocket("ws://localhost:2750");
```

### 2. 模式选择

```txt
Mode 1: Precision, Mode 2: Balanced.
Please type in your mode.
```

命令行模式输入`1`(服务器模式发送`1`)进入精准模式, 其余模式尚在开发.

### 3. 对话

命令行模式会对话和日志混合输出, 可在`src/config/user.json`中关闭`log.tag.all`以关闭日志输出.

```json
{
	"log": {
		"custom": true,
		"tag": {
			"all": true,
			"default": true
		}
	}
}
```

服务器模式日志会打印在终端, 不会产生混淆.
