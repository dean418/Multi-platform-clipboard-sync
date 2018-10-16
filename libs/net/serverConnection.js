// create server and listen on port
const net = require('net');
const Socket = require('./socket');
const socketManger = require('./socketManager');

class ServerSocket extends Socket {
	static createServer(port) {
		let server = net.createServer((socket) => {
			let address = socket.address().address;
			socketManger.addSocket(new this(socket, socketManger), address);
		});
		server.listen(port);
	}
}

module.exports = ServerSocket;