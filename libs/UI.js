class UI {
	constructor() {

	}

	addDevice(deviceInfo) {
		let address = deviceInfo.address

		let item = document.createElement("div");
		let name = document.createElement("p");

		name.className += "itemContent";
		item.className += "item";

		name.appendChild(document.createTextNode(address));
		item.appendChild(name);

		let sidebar = document.getElementById("sidebar");
		sidebar.appendChild(item);

		item.onclick = (() => {
			item.appendChild(arrow);
		});
	}
}

module.exports = UI;