const PORT = 8558;
 
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
 
var ip = require('ip');

var app = express();
var server = http.Server(app);
var io = socketio(server);

//var webapp_nsp = io.of('/webapp');
//var esp8266_nsp = io.of('/esp8266');
//var middleware = require('socketio-wildcard')();//Để có thể bắt toàn bộ lệnh!
//webapp_nsp.use(middleware);

server.listen(process.env.PORT || PORT);//cho heroku
//server.listen(PORT);// cho local

console.log("Server IP: " + ip.address() + ":" + PORT)
app.use(express.static("webapp"))

//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("webapp da ket noi ");
	socket.on("atime", function(packet) {
		console.log("webapp gui data: ", packet);
		io.emit('atime1', packet);
		io.emit('pong');
	})
	socket.on("ping", function(packet) {
		console.log("ping data: ", packet);
		socket.emit("pong", "1");
	})
	socket.on("messageType", function(packet) {
		console.log("messageType data: ", packet);
	})
	var interval = setInterval(function() {
		io.emit("LED");
		console.log("send LED");
	}, 10000)
	socket.on('disconnect', function() {
		console.log("webapp da ngat ket noi")
		clearInterval(interval)
	})
});