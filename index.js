const express = require('express');
const app = express();
const connect = require('./database/mongo.db');
connect();
require('dotenv').config();
const http = require('http').createServer(app);
http.listen(3002);
const io = require('socket.io')(http,{
cors:{
    origin:'*'
}
})

// io.on('connection', (socket) => {
//     console.log("a user connected");
// });

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));

const { initializeChatModule } = require('./utils/chatModule')

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
 initializeChatModule(io);

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

app.listen(port,()=>{
    console.log(`server running at http://localhost:3001`);
})
