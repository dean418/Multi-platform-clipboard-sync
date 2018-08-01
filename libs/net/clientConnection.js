// create client connection
const net = require('net');
const Socket = require('./socket');
const socketManager = require('./socketManager');

class ClientSocket extends Socket  {
	static createConnection(port,address){
		 let socket = net.createConnection({port: port, host: address}, () => {
			socketManager.addSocket(new this(socket, socketManager));
		});
	}
}

module.exports = ClientSocket;