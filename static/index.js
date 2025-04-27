function logger (msg) {
	const newDiv = `<div class="log"><span>[LOG]</span>\n${msg}</div>`;
	const chatBox = document.getElementById("chat-box");
	chatBox.insertAdjacentHTML('beforeend', newDiv);

	chatBox.scrollTo({
		top: chatBox.scrollHeight,
		behavior: 'smooth'
	});
}

function showMsg (msg) {
	const newDiv = `<div class="chat chat-server"><span>[SERVER]</span>\n${msg}</div>`;
	const chatBox = document.getElementById("chat-box");
	chatBox.insertAdjacentHTML('beforeend', newDiv);

	chatBox.scrollTo({
		top: chatBox.scrollHeight,
		behavior: 'smooth'
	});
}

function sendMsg () {
	const inputText = document.getElementById('input-text');
	if (inputText.readOnly) {
		return
	}

	const msg = inputText.value.trim();
	socket.send(msg);

	inputText.value = "";
	inputText.placeholder = "消息已发送";
	inputText.readOnly = true;

	const newDiv = `<div class="chat chat-user"><span>[USER]</span>\n${msg}</div>`;
	const chatBox = document.getElementById("chat-box");
	chatBox.insertAdjacentHTML('beforeend', newDiv);

	chatBox.scrollTo({
		top: chatBox.scrollHeight,
		behavior: 'smooth'
	});
}

function getInput (prompt) {
	const inputText = document.getElementById("input-text");
	inputText.placeholder = prompt;

	document.getElementById("input-btn").addEventListener("click", sendMsg);
	inputText.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			sendMsg();
		}
	})
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
			if (json.input) {
				document.getElementById("input-text").readOnly = false;
				getInput(json.msg);
			} else {
				showMsg(json.msg);
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
