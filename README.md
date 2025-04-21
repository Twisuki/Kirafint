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

```src/config/deepseek.json
{
	"url": "https://api.deepseek.com",
	"content": {
		"PrecisionModeInit": "你好Deepseek, 现在你是湖南大学机器人学院的咨询AI, 我们将用户问题发送给你, 并附带一份湖南大学机器人学院资料库不同分类方式的目录. 你需要分析问题并选择所需的资料, 用稍后给出的json形式返回. 之后, 我们会将对应的资料发送给你, 由你阅读后总结, 并输出结果, 我们将结果呈现给用户. 希望可以正常工作. \n JSON文件格式: {\"目录名1\": 所需数量, \"目录名2\": 所需数量, ...}"
	}
}
```

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