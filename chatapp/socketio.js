// 将io导出来 拿出来可以使用
let socketio = {}
function getSocket(server) {
  socketio.io = require('socket.io')(server)

  let io = socketio.io;
  io.on('connection', function (socket) {
    // 此处的socket是当前浏览器某个浏览器与服务器连接对象

    // 当新的用户连接进来时，向所有人广播此人的id
    io.sockets.emit('addUser', {
      id: socket.id,
      content: '新用户加入'
    })


    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data)
      console.log(socket.id)
      socket.emit('hello', { content: '学习前端' })

    });

    // 向某个用户发送消息 ，小明的id ZwPEkexC-qk_zl5TAAAB
    socket.on('sendUser', function (data) {
      // data = {
      //   from: '发送者ID',
      //   to: '收到者ID',
      //   content: "你好啊你好啊"
      // }

      socket.to(data.to).emit('sendClient', data)
    })
  })


  // 命名空间
  let qq = io.of('/qq')
  qq.on("connection", function () {
    qq.emit('news', {
      content: 'qq命名空间发送过来的内容'
    })
  })




}

socketio.getSocket = getSocket;

module.exports = socketio