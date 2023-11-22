const express = require('express');
const app = express();
const connect = require('./database/mongo.db');
connect();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

//routes
const authRoute = require('./routes/auth.route');
const vehicleRoute =require('./routes/vehicle.route');
const adminRoute =require('./routes/admin.route');

//routing
app.use("/auth",authRoute)//for login,register
app.use('/vehicle',vehicleRoute);//for vehicle routes
app.use('/admin',adminRoute);//for admin requests


app.listen(port,()=>{
    console.log(`server running at http://localhost:3001`);
})
