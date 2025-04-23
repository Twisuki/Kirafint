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
		"custom": {
			"INIT": true,
			"GET": true,
			"RES": true,
			"JSON": true,
			"all": false,
			"default": true
		}
	}
}
```

## 使用

```bash
pnpm install
./kf
```