const clipboard = require('./libs/clipboard');
const server = require('./libs/net/serverConnection');
const client = require('./libs/net/clientConnection');
const socketManager = require('./libs/net/socketManager');
const broadcast = require('./libs/discovery/broadcast');
const ui = require('./libs/UI');

(async () => {
	let button = document.getElementById("syncBtn");
	let Clipboard = new clipboard(button);

	let UI = new ui();

	server.createServer(7070);

	// connect to a target device
	client.createConnection(7070, '10.154.73.79');

	// creates instance of Broadcast class inside the createSocket method
	let broadcaster = await broadcast.createSocket(41234, "hello"); 

	// boradcast current device every 5 seconds
	function broadcastNow(){
		broadcaster.broadcast();
		setTimeout(broadcastNow, 5000);
	}

	broadcastNow();

	//when the broadcaster recieves a ping from another device
	broadcaster.on("newDevice", (deviceInfo) => {
		UI.addDevice(deviceInfo);
	});

	// when the sync button is pressed (test button for now)
	Clipboard.on("send", (buffer) => {
		for (let device of socketManager.sockets.values()) {
			device.socket.write(buffer);
		}
	});
})();


/* dynamically update target device

X.on("updateTarget", (ip) => {
	client.createConnection(7070, ip);
})
*/

/* allow user to start and stop broadcasting

let broadcastTimeout
onupdate(){
	clearTimeout(broadcastTimeout)
	if(checkbox.checked){
		let broadcastTimeout = setTimeout(emit.broadcast,1500)
	}
}
onupdate()
checkbox.onchange = onupdate
*/




/*(socketManager.on("removeSocket", (socket) => {
	// remove from UI
});*/
