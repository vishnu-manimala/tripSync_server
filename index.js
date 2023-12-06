const express = require('express');
const app = express();
const connect = require('./database/mongo.db');
connect();
require('dotenv').config();
const http = require('http').createServer(app);
http.listen(3002);
//const socket = require('socket.io');
// const io = require('socket.io')(http,{
// cors:{
//     origin:'*'
// }
// })

const cors = require('cors');
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:4200',
//     credentials: true
//   }));

//   app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
//     res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     res.append('Access-Control-Allow-Credentials', true);
//     next();
// });

const { initializeChatModule } = require('./utils/chatModule')

const port = process.env.PORT;

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

//routing
app.use("/auth",authRoute)//for login,register
app.use('/vehicle',vehicleRoute);//for vehicle routes
app.use('/admin',adminRoute);//for admin requests
app.use('/ride',rideRoute);//for rides
app.use('/profile',profileRoute);//for rides
app.use('/accounts',accountRoute)

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