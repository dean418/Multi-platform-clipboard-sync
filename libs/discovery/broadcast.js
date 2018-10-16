const dgram = require('dgram');
const EventEmitter = require('events');

class Broadcast extends EventEmitter{
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
		super();
		this.socket = socket;
		this.name = name;
		this.addresses = {};
		this.socket.on('message', this.onMesage.bind(this));
		this.socket.on('error', this.onError.bind(this));
	}

	onMesage(msg, rinfo) {
		if (!this.addresses[rinfo.address]) {
			this.emit("newDevice", rinfo);
		} else {
			//do nothing
		}
		this.addresses[rinfo.address] = {address: rinfo.address};
	}

	onError() {
		console.log(`server error:\n${err.stack}`);
		this.socket.close();
	}

	broadcast() {
		this.socket.send(Buffer.from(this.name), 41234, '255.255.255.255'); //'255.255.255.255' ||'0.0.0.0'
	}
}

module.exports = Broadcast;

// (async () => {
// 	let me = await Broadcast.createSocket(41234, "hello");

// 	me.broadcast();
// })();