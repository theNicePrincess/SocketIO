// 使用express创建一个服务器
// 引入express 实例化 app
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);

app.get('/', function (req, res) {
  res.sendFile(__dirname, '/index.html');
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data)
  })
})