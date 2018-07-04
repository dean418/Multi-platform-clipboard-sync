// manages socket events
const clipboard = require('../clipboard');

class Socket {
	constructor(socket, socketManager) {
		this.socket = socket;
		this.socketManager = socketManager;
		socket.on('data', this.onData.bind(this));
		socket.on('close', this.onClose.bind(this));
	}

	onData(data) {
		console.log(data);
		clipboard.decode(data);
	}

	onClose() {
		this.socketManager.removeSocket(this);
	}
}

module.exports = Socket;