const {clipboard} = require('electron');
const nativeImage = require('electron').remote.nativeImage;
const protobuf = require('protobufjs');
const formats = require('../formats.json');

class Clipboard {
	constructor(button) {
		this.button = button;
		this.button.onclick = this.selectFormat.bind(this);

		this.root = protobuf.Root.fromJSON(formats);
	}

	selectFormat() {
		let availableFormats = clipboard.availableFormats();
		let clipboardData;
		let format = "";

		if (availableFormats.indexOf("image/png") > -1) {
			clipboardData = clipboard.readImage().toPNG();
			format = "image";

		} else if (availableFormats.indexOf("text/rtf") > -1) {
			clipboardData = clipboard.readRTF();
			format = "rtf"

		} else if (availableFormats.indexOf("text/html") > -1) {
			clipboardData = clipboard.readHTML();
			format = "html";

		} else if (availableFormats.indexOf("text/plain") > -1) {
			clipboardData = clipboard.readText();
			format = "text";
		}

		this.encode(format, clipboardData);
	}

	encode(format, content) {
		let type = this.root.lookupType("baseMessage.formats");
		let image;

		let protoMessage = {}
		protoMessage[format] = content;

		let message = type.create(protoMessage);
		let buffer = type.encode(message).finish();
	}

	decode(buffer, format) {
		if (format == "image") {
			let content = type.decode(buffer)["image"];
			image = nativeImage.createFromBuffer(content);
			clipboard.writeImage(image);

		} else if (format == "rtf") {
			let content = type.decode(buffer)["rtf"];
			clipboard.writeRTF(content);

		} else if (format == "html") {
			let content = type.decode(buffer)["html"];
			clipboard.writeHTML(content);

		} else {
			let content = type.decode(buffer)["text"];
			clipboard.writeText(content);
		}
	}
}

module.exports = Clipboard;