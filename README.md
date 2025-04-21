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
│   │   └── user.json
│   ├── data
│   ├── mode
│   │   └── precision.js
│   ├── util
│   └── index.js
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
└── README.md
```

## 配置

```src/config/user.json
{
	"name": "Twisuki",
	"dsKey": YOUR_DEEPSEEK_API_KEY
}
```

## 使用

```bash
pnpm install
./kf
```