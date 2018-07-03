const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

function createWindow() {
	let win = new BrowserWindow({});

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

app.on('ready', createWindow);