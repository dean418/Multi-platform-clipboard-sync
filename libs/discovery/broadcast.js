const dgram = require('dgram');

class Broadcast {
	static async createSocket(port, name) {
		let socket = dgram.createSocket({type: 'udp4', reuseAddr: true});
		await new Promise((resolve, reject) => {
			socket.bind({
				port: port,
				exclusive: false,
				address: '255.255.255.255'
			}, (err) => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});

		socket.setBroadcast(true);
		return new Broadcast(socket, name);
	}

	constructor(socket, name) {
		this.socket = socket;
		this.name = name;
		this.socket.on('message', this.onMesage.bind(this));
		this.socket.on('error', this.onError.bind(this));
	}

	onMesage(msg, rinfo) {
	}

	onError() {
		console.log(`server error:\n${err.stack}`);
		this.socket.close();
	}

	broadcast() {
		this.socket.send(Buffer.from(this.name), 41234, '255.255.255.255');
	}
}

module.exports = Broadcast;

// (async () => {
// 	let me = await Broadcast.createSocket(41234, "hello");

// 	me.broadcast();
// })();