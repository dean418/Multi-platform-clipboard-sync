// create client connection
const uuidv4 = require('uuid/v4');
const net = require('net');
const Socket = require('./socket');
const socketManager = require('./socketManager');

class ClientSocket extends Socket {
	static createConnection(port,address){
		 let socket = net.createConnection({port: port, host: address}, () => {
			let address = socket.address().address;
			socketManager.addSocket(new this(socket, socketManager), address);
		});
	}
}

module.exports = ClientSocket;