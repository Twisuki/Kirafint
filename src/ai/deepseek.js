const chalk = require("chalk");
const axios = require("axios");

// 读取JSON
let dsData = {};
try {
	dsData = require("../config/deepseek.json");
} catch (err) {
	console.error(chalk.red("Can't find deepseek.json!"));
}
let userData = {}
try {
	userData = require("../config/user.json");
} catch (err) {
	console.error(chalk.red("Can't find user.json!"));
}

// Deepseek接口
class Deepseek {
	async chat(messages, model = "deepseek-chat") {
		try {
			const response = await axios.post(
				dsData.url,
				{
					model,
					messages,
					temperature: 0.7,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${userData.dsKey}`,
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