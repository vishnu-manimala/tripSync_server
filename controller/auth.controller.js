const User = require("../models/user.model");
const helper = require("../utils/helper.functions");
const bcrypt = require('bcrypt');


//register
const register = async (req, res) => {
  const data = req.body;
  try{
  const securePassword = await helper.securePassword(data.password);
  console.log("secured pwd", securePassword);
  const userData = await User.create({
    name: data.name,
    email: data.email,
    contactNumber: data.phone,
    password: securePassword,
    createdAt: new Date(),
  });
res.status(200).json("success");
  }catch(err){
    console.log(err);
    return  res.status(401).json("Error");
  }

};


//Login With password
const passwordLogin = async (req, res) => {
  const data = req.body;
  try {
    const userData = await User.findOne({ email: data.username });
    if (!userData) {
      return res
        .status(401)
        .json({ data: null, status: "Error", message: "No user found" });
    }
    const passwordMatch = await bcrypt.compare(
      data.password,
      userData.password
    );
    if (userData.isBlocked) {
      return res
        .status(401)
        .json({ data: null, status: "Error", message: "You are blocked!" });
    }

    if (!passwordMatch) {
      return res.status(401).json({
        data: null,
        status: "Error",
        message: "Username & password mismatch",
      });
    }
    const token = await helper.tokenGenerator(userData);
    const userdata = await User.findOne({ email: data.username },{name:1,contactNumber:1,email:1,isIdVerified:1,isPhoneVerified:1,ownsVehicle:1,isAdmin:1,isBlocked:1});
    res.status(200).json({ data: userdata, status: "Success", token: token });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .json({ data: null, status: "Error", message: "Something went wrong" });
  }
};

const sendOtp = async (req, res) => {
  
  if(!req.body.phone ){
    return res.status(400).json({status:"Error",message:"Body empty",data:""})
  }
  try{
    const userData = await User.findOne({ contactNumber: req.body.phone });
    if(!userData){
      return res.status(401).json({status:"Error",message:"Not registered",data:""})
    }
    console.log(userData);
    const otp =  helper.generateOTP();
    //const isOtpSend =await helper.sendOtpTOPhone(otp,req.body.phone);
    const otpUpdated = await User.findOneAndUpdate(
      { contactNumber: req.body.phone },
      { $set: { otp: otp } },{new:true}
    );
    if(!otpUpdated){
      return res.status(401).json({status:"Error",message:"Something went wrong",data:""})
    }
    res.status(200).json({status:"Success",message:"Otp send",data:req.body.phone});
  }catch(err){
    console.log(err.message);
    return  res.status(500).json({status:"Error",message:"Something went wrong",data:""});
  }
};


const authOtp = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({ status:"Error",message: "empty body",data:"" });
  }
  try {
    const userData = await User.find({ contactNumber: req.body.phone },{name:1,contactNumber:1,email:1,isIdVerified:1,isPhoneVerified:1,ownsVehicle:1,isAdmin:1,isBlocked:1});
    if (!userData) {
      return res.status(401).json({ status:"Error",message: "user don't exists",data:"" });
    }
    console.log(userData);
    if (req.body.otp !== userData.otp) {
      return res.status(404).json({ status:"Error",message: "Something went wrong",data:"" });
    }
    const token = await helper.tokenGenerator(userData);
    return res.status(200).json({status:"Success", message: "success",data:userData,token:token });

  } catch (err) {
console.log(err)
    return res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = {
  passwordLogin,
  register,
  sendOtp,
  authOtp
};
