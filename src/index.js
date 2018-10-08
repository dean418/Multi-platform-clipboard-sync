let arrow = document.createElement("div");
let btn = document.getElementById("click");
let settings = document.getElementById("settings");

arrow.id = "arrow";
btn.onclick = makeItem;

function makeItem() {
	let item = document.createElement("div");
	let name = document.createElement("p");

	name.className += "itemContent";
	item.className += "item";

	name.appendChild(document.createTextNode("content"));
	item.appendChild(name);

	let sidebar = document.getElementById("sidebar");
	sidebar.appendChild(item);

	item.onclick = (() => {

		item.appendChild(arrow)
	});
}

settings.onclick = (() => {
	settings.appendChild(arrow);
});