const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.DB_URL
module.exports = async(req, res)=>{
    
    try{
      
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(()=>{
           
            console.log("Server connected to database...");
        }).catch((err)=>{
            console.log(err)
        })
    } catch(err){
        console.log(err.message);
    }
}
