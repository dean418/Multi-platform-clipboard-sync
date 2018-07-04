// manages connections
class SocketManger {
	constructor(){
		this.sockets = new Set();
	}
	addSocket(socket) {
		this.sockets.add(socket);
	}
	removeSocket(socket){
		this.sockets.delete(socket);
	}
}

let socketManger = new SocketManger();
module.exports = socketManger;