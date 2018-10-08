const clipboard = require('./libs/clipboard');
const server = require('./libs/net/serverConnection');
const client = require('./libs/net/clientConnection');
const socketManager = require('./libs/net/socketManager');
const broadcast = require('./libs/discovery/broadcast');

(async () => {
	let button = document.getElementById("test");
	let Clipboard = new clipboard(button);

	server.createServer(7070);
	client.createConnection(7070, '192.168.0.20');// connect to a target device

	let ping = await broadcast.createSocket(41234, "hello");

	// boradcast this device every 5 seconds
	function broadcastNow(){
		ping.broadcast();
		setTimeout(broadcastNow, 5000);
	}

	broadcastNow();

	socketManager.on("newSocket", (socket) => {
		// console.log(socket)
		// send to UI class
	});

	socketManager.on("removeSocket", (socket) => {
		// remove from UI
	});

	Clipboard.on("send", (buffer) => { // when the sync button is pressed (test button for now)
		for (let socket of socketManager.sockets.values()) {
			socket.socket.write(buffer);
		}
	});
})();


// let broadcastTimeout
// onupdate(){
// 	clearTimeout(broadcastTimeout)
// 	if(checkbox.checked){
// 		let broadcastTimeout = setTimeout(emit.broadcast,1500)
// 	}
// }
// onupdate()
// checkbox.onchange = onupdate
// 