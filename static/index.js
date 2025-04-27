
function logger (msg) {
	const newDiv = `<div class="log"><span>[LOG]</span>\n${msg}</div>`;
	document.getElementById("chat-box").insertAdjacentHTML('beforeend', newDiv);
}

setInterval(() => logger("尝试连接服务器: 2750..."), 1000);