const fs = require("fs");
const chalk = require("chalk");
const axios = require('axios');

// 读取用户JSON
let json = {};
try {
	const data = fs.readFileSync("../config/deepseek.json", "utf8");
	json = JSON.parse(data);
} catch (err) {
	console.error(chalk.red("Can't find deepseek.json!"));
}


// Deepseek接口
class Deepseek {
	async chat(messages, model = "deepseek-chat") {
		try {
			const response = await axios.post(
				json.url,
				{
					model,
					messages,
					temperature: 0.7,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${json.key}`,
					},
				}
			);
			return response.data.choices[0].message.content;
		} catch (error) {
			if (error.response) {
				throw new Error(`API Error: ${error.response.data?.error?.message || error.message}`);
			}
			throw new Error(`Unexpected error: ${error.message}`);
		}
	}
}

module.exports = Deepseek;