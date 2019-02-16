const PORT = 8558;
 
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
 
var ip = require('ip');

var app = express();
var server = http.Server(app);
var io = socketio(server);

var webapp_nsp = io.of('/webapp')
var middleware = require('socketio-wildcard')();//Để có thể bắt toàn bộ lệnh!
webapp_nsp.use(middleware);

server.listen(process.env.PORT || PORT);//cho heroku
//server.listen(PORT);// cho local

console.log("Server IP: " + ip.address() + ":" + PORT)
app.use(express.static("webapp"))
app.use(express.static("node_modules/socket.io-client"))
app.get('/', function (req, res) {
  res.send('hello world')
})

//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
webapp_nsp.on('connection', function(socket) {
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("da ket noi");
	socket.on("atime", function(packet) {
		console.log("webapp gui data: ", packet);
		webapp_nsp.emit('atime1', packet);
	})
	socket.on('disconnect', function() {
		console.log("disconnect")
	})
});