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

//routing
app.use("/auth",authRoute)//for login,register

app.listen(port,()=>{
    console.log(`server running at http://localhost:3001`);
})
