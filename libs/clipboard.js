const {clipboard} = require('electron');
const nativeImage = require('electron').remote.nativeImage;
const protobuf = require('protobufjs');
const EventEmitter = require('events');

const formats = require('../formats.json');

class Clipboard extends EventEmitter {
	constructor(button) {
		super();
		this.button = button;
		this.button.onclick = this.selectFormat.bind(this);

		this.root = protobuf.Root.fromJSON(formats);
	}

	selectFormat() {
		let availableFormats = clipboard.availableFormats();
		let message = {}


		if (availableFormats.indexOf("image/png") > -1) {
			message['image'] = clipboard.readImage().toPNG();
		}
		if (availableFormats.indexOf("text/rtf") > -1) {
			message['rtf'] = clipboard.readRTF();
		}
		if (availableFormats.indexOf("text/html") > -1) {
			message['html'] = clipboard.readHTML();
		}
		if (availableFormats.indexOf("text/plain") > -1) {
			message['text'] = clipboard.readText();
		}
		this.encode(message);
	}

	encode(protoMessage) {
		let type = this.root.lookupType("baseMessage.formats");

		let message = type.create(protoMessage);
		let buffer = type.encode(message).finish();

		this.emit("send", buffer)
	}

	static decode(buffer) {
		clipboard.clear();
		let root = protobuf.Root.fromJSON(formats);
		let type = root.lookupType("baseMessage.formats");
		let data = type.decode(buffer)
		let output = {}
		if (data["text"]) {
			output['text'] = data['text'];
		}
		if (data["rtf"]) {
			output['rtf'] = data['rtf'];
		}
		if (data["html"]) {
			output['html'] = data['html'];
		}
		if (data["image"].length > 0 ) {
			output["image"] = nativeImage.createFromBuffer(data["image"])
		}
		console.log(output)
		clipboard.write(output)
	}
}

module.exports = Clipboard;