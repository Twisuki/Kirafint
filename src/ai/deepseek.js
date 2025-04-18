const fs = require("fs");
const chalk = require("chalk");
import OpenAI from "openai";

// 读取用户JSON
let json = {};
try {
	const data = fs.readFileSync("../config/user.json", "utf8");
	json = JSON.parse(data);
} catch (err) {
	console.error(chalk.red("Can't find user.json!"));
}


// Deepseek接口
const openai = new OpenAI({
	baseURL: "https://api.deepseek.com",
	apiKey: json.key
});

async function main() {
	const completion = await openai.chat.completions.create({
		messages: [{role: "system", content: json.content}],
		model: "deepseek-chat",
	});
}

main();