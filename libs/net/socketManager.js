// manage a list of socket connections
const EventEmitter = require('events');

class SocketManger extends EventEmitter {
	constructor(){
		super();
		this.sockets = new Set();
	}

	addSocket(socket) {
		this.sockets.add(socket);
		this.emit("newSocet", socket);
	}

	removeSocket(socket){
		this.sockets.delete(socket);
		this.emit("removeSocket", socket);
	}
}

let socketManger = new SocketManger();
module.exports = socketManger;