// const socketIo = require('socket.io');

function initializeChatModule(io) {
  // const io = require('socket.io')(server,{
  //   cors:{
  //       origin:'*'
  //   }
  //   })
  
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`${socket.id} joined chat room for user ${userId}`);
      });
      socket.on('save-message', (data) => {
        console.log(data);
        io.emit('new-message', { message: data });        
    });
    
      socket.on('chat message', async ({ sender, receiver, message }) => {
        // Save the message to the database
        try {
          const newChatMessage = new Chat({ sender, receiver, message });
          await newChatMessage.save();
  
          // Broadcast the message to the sender and receiver
          socket.broadcast.to(receiver).emit(`chat message-${receiver}`, { sender, message });
          io.to(socket.id).emit(`chat message-${sender}`, { receiver, message });
        } catch (error) {
          console.error('Error saving chat message to the database:', error);
        }
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
  
  module.exports = {
    initializeChatModule,
  };