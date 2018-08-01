import { clearTimeout } from 'timers';

const clipboard = require('./libs/clipboard');
const server = require('./libs/net/serverConnection');
const client = require('./libs/net/clientConnection');
const socketManager = require('./libs/net/socketManager');

let button = document.getElementById("test"); 

let Clipboard = new clipboard(button);

server.createServer(7070);
client.createConnection(7070,'localhost');

socketManager.on("newSocket", (socket) => {
	// send to UI class
});

socketManager.on("removeSocket", (socket) => {
	// remove from UI
});

Clipboard.on("send", (buffer) => {
	for (let socket of socketManager.sockets.values()) {
		socket.socket.write(buffer);
	}
});

// let broadcastTimeout
// onupdate(){
// 	clearTimeout(broadcastTimeout)
// 	if(checkbox.checked){
// 		let broadcastTimeout = setTimeout(emit.broadcast,1500)
// 	}
// }
// onupdate()
// checkbox.onchange = onupdate