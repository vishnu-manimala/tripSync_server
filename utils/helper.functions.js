const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthToken =process.env.AuthToken;
const AccountSID = process.env.AccountSID;
const  PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log(process.env.DB_URL+"AccountSID"+AccountSID+"AuthToken"+AuthToken)
const twilio = require("twilio")(AccountSID, AuthToken);

const securePassword = async(password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        console.log("hash",hashedPassword);
        return hashedPassword;
    }catch(err){
        console.log(err)
    }
}

const tokenGenerator = async(data)=>{
    console.log(data);
    
    const token  = jwt.sign({userData:data},PRIVATE_KEY,{expiresIn:'10h'});
    console.log(token);
    return token;

}

const generateOTP = ()=> {
    const digits = "0123456789";
    let OTP = "";
  
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log(OTP);
    return OTP;
  }

  const sendOtpTOPhone = async(otp,phone)=>{
    console.log("in send");
    try{
        await twilio.messages //sending message to number
        .create({
          body: otp,
          to: `+91${phone}`, // Text your number
          from: "+16185076078", // From a valid Twilio number
        })
        .then((message) => {
          console.log(message);
        return "success"  ;
        });
    }catch(err){
        console.log("twilio",err);
        return err.message;
    }
    
}
module.exports = {
    tokenGenerator,
    securePassword,
    generateOTP,
    sendOtpTOPhone
}
