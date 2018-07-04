const clipboard = require('./libs/clipboard');
const server = require('./libs/net/serverConnection');
const client = require('./libs/net/clientConnection');
const socketManger = require('./libs/net/socketManager')

let button = document.getElementById("test"); 

let Clipboard = new clipboard(button);

server.createServer(7070)
client.createConnection(7070,'localhost')
Clipboard.on("send", (buffer) => {
	
	for (let socket of socketManger.sockets.values()) {
		socket.socket.write(buffer);
	}
});