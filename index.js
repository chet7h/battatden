const PORT = 80;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server
 
var http = require('http');
var socketio = require('socket.io');
var express = require('express');
 
var ip = require('ip');

var app = express();
var server = http.Server(app);
var io = socketio(server);
app.listen(PORT);
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
app.use(express.static("webapp"))
/*app.get('/', function (req, res) {
  res.send('hello world')
})*/
//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {	
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	socket.on("atime", function(packet) {
		console.log("esp8266 rev and send to webapp packet: ", packet.message) //in ra để debug
	})
	//Khi socket client bị mất kết nối thì chạy hàm sau.
	socket.on('disconnect', function() {
		console.log("disconnect") 	//in ra màn hình console cho vui
	})
});