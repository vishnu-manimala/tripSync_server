const chatRooms =  require('../models/chat.model')

 function initializeChatModule(io) {
  let count;
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('join', async(data) => {
        socket.join(data.room);
        try{
          const rooms = await chatRooms.find({})
          count = 0;
          rooms.forEach((room) => {
            if(room.name === data.room){
              count++;
            }
          });
          if(count === 0){
            chatRooms.insertMany({name:data.room,messages:[]});
          }
        }catch(err){
          console.log(err);
          return false;
        }
       
      });
      
    socket.on('message', async (data) => {
      try {
        await io.in(data.room).emit('new message', { user: data.user, message: data.message });
        await chatRooms.updateOne({ name: data.room }, { $push: { messages: { user: data.user, message: data.message } } });
      } catch (err) {
        console.error(err);
      }
    });
     
     socket.on('typing',(data)=>{
      socket.broadcast.in(data.room).emit('typing',{data:data,isTyping:true});
     });
    });
  }
  
  module.exports = {
    initializeChatModule,
  };