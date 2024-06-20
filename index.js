const express = require('express');
const app = express();
const path = require('path')
const connect = require('./database/mongo.db');
connect();
require('dotenv').config();
const http = require('http').createServer(app);
http.listen(3002);


const cors = require('cors');
const cookieParser = require('cookie-parser');
// app.use(cors());

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());



const { initializeChatModule } = require('./utils/chatModule')

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));


//routes
const authRoute = require('./routes/auth.route');
const vehicleRoute =require('./routes/vehicle.route');
const adminRoute =require('./routes/admin.route');
const rideRoute = require('./routes/ride.route');
const profileRoute = require('./routes/profile.route');
const accountRoute = require('./routes/account.route');
const reviewRoutes = require('./routes/review.routes')
//routing
  app.get('/',(req,res)=>{
    res.send('API is running...')
  })
app.use("/auth",authRoute)//for login,register
app.use('/vehicle',vehicleRoute);//for vehicle routes
app.use('/admin',adminRoute);//for admin requests
app.use('/ride',rideRoute);//for rides
app.use('/profile',profileRoute);//for rides
app.use('/accounts',accountRoute);
app.use('/review',reviewRoutes);

// if(nodeEnv === 'PRODUCTION'){
//   const __dirname= path.resolve();
//   app.use(express.static(path.join(__dirname,'/frontend/dist/client')));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'frontend','dist','client','index.html'))
//   });
// }else{
//   app.get('/',(req,res)=>{
//     res.send('API is running...')
//   })
// }


 const server = app.listen(port,()=>{
 
    console.log(`server running at http://localhost:3001`);
})
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200', 
            methods: ['GET', 'POST'],
  },
});

initializeChatModule(io);
