const socketIo = require('socket.io');

function configureSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('welcome', 'Chào mừng bạn đến với ứng dụng của chúng tôi!');
    
    socket.on('chat message', (msg) => {
      console.log('Message received: ', msg);
      io.emit('chat message', msg); // Gửi tin nhắn cho tất cả các client kết nối
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
}

module.exports = configureSocket;