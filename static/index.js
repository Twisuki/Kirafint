function logger (msg) {
	const newDiv = `<div class="log"><span>[LOG]</span>\n${msg}</div>`;
	document.getElementById("chat-box").insertAdjacentHTML('beforeend', newDiv);
}

function getMsg (msg) {
	const newDiv = `<div class="chat chat-server"><span>[SERVER]</span>\n${msg}</div>`;
	document.getElementById("chat-box").insertAdjacentHTML('beforeend', newDiv);
}

function sendMsg (msg) {
	const newDiv = `<div class="chat chat-user"><span>[USER]</span>\n${msg}</div>`;
	document.getElementById("chat-box").insertAdjacentHTML('beforeend', newDiv);
}

function getInput () {
	logger("get input")
}

const socket = new WebSocket("ws://localhost:2750");

logger("等待建立连接 ...");

// 连接成功
socket.onopen = function (event) {
	logger("连接已建立.");

	// 接收消息
	socket.onmessage = function (event) {
		try {
			const json = JSON.parse(event.data);
			getMsg(json.msg);
			if (json.input) {
				getInput();
			}
		} catch (err) {
			logger(`收发错误: ${err}`)
		}
	}

	// 关闭连接
	socket.onclose = function (event) {
		if (event.wasClean) {
			logger("连接已关闭.");
		} else {
			logger(`连接异常关闭, Code: ${event.code} Reason: ${event.reason}`);
		}
	}
}

// 错误
socket.onerror = function (error) {
	logger("WebSocket错误: ", error);
};
