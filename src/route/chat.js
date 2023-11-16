const express = require('express');
const router = express.Router();
const { Server } = require('socket.io');
const Message = require('../model/chat.model')
const io = new Server();

io.on('connection', (socket) => {
  socket.on('join room', (data) => {
    console.log();
    const { sender, receiver } = data;
    const roomName = getRoomName(sender, receiver);
    socket.join(roomName);
  });

  socket.on('chat message', (data) => {
    const { sender, receiver, content  } = data;
    const roomName = getRoomName(sender, receiver);

      io.to(roomName).emit('chat message', {
        sender: sender,
        receiver: receiver,
        content: content,
      });
   
  });

  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối');
  });
});

function getRoomName(user1, user2) {
  return [user1.toString(), user2.toString()].sort().join('-');
}

router.get('/chat:userName', async(req, res) => {
  try {
    var user = req.session.user ? req.session.user.userName : "";
    const uName = req.params.userName;
    let userName = uName.replace(':', '');
    const listChat = await Message.find({
      $or: [
        { sender: user },
        { receiver: userName }
      ]
    });
    const isReceiver = listChat.map(item => { item.receiver === userName});
    console.log("List chat : " , isReceiver);
    res.render('chat', { userName: userName, user: user  ,listChat : listChat.map(listChat => listChat.toJSON())});
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    return res.send('error', { message: 'Đã xảy ra lỗi' });
  }
});

module.exports = router;
