# Kirafint, 基于Deepseek API和本地模型的命令行AI Demo

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
│   ├── cli
│   │   └── cli.js
│   ├── config
│   │   ├── deepseek.json
│   │   ├── jsonLoader.js
│   │   └── user.json
│   ├── data
│   │   └── catalogue.json
│   ├── mode
│   │   ├── jsonAnalysis.js
│   │   └── precision.js
│   ├── util
│   │   └── logger.js
│   └── index.js
├── kf.bat
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
└── README.md
```

## 配置

```src/config/user.json
{
	"name": "Twisuki",
	"dsKey": YOUR_DEEPSEEK_API_KEY,
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

## 使用

```bash
pnpm install
./kf 1
```