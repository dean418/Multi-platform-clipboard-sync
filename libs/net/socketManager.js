// manage a list of socket connections
const EventEmitter = require('events');

class SocketManager extends EventEmitter {
	constructor(){
		super();
		this.sockets = new Set();
	}

	addSocket(socket, addr) {
		this.sockets.add(socket);
		this.emit("newSocket", addr);
	}

	removeSocket(socket){
		this.sockets.delete(socket);
		this.emit("removeSocket", socket);
	}
}

let socketManager = new SocketManager();
module.exports = socketManager;