const {app, BrowserWindow} = require('electron');
const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		height: 600,
		width: 800
	});

	mainWindow.loadURL('file://' + __dirname + '/index.html');
  
	io.on('connection', function(socket){
	  console.log('a user connected');
	  socket.on('disconnect', function(){
		console.log('user disconnected');
	  });
	});
	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});
	express.set('view engine', 'html');
	express.get('/', function (req, res) {
	  res.render('index', {});
	});
});