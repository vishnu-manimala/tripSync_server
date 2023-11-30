const rideModel = require("../models/ride.model");
const userModel = require("../models/user.model");
const User = require("../models/user.model");
const vehicleModel = require("../models/vehicle.model");
const Vehicle = require('../models/vehicle.model')

const getAllUsers = async (req,res)=>{
    console.log("in get all");
    try{
        const page = +req.query.id;
        const limit = 2;
        const skip = 2*(page-1);   
        const usersData = await User.find({},{ 
            name :1,
            email:1,
            contactNumber:1,
            profileImage:1,
            createdAt:1,
            isIdVerified:1,
            isPhoneVerified:1,
            isEmailVerified:1,
            isAdmin:1,
            isBlocked:1,
            _id:1
        }).limit(limit).skip(skip);
        if(!usersData){
            return res.status(400).json({status:"Error", message:"Something went wrong",data:''})
        }
        console.log(usersData)
        return res.status(200).json({status:"Success", message:"Data fetched",data:usersData})
    }catch(err){
        console.log(err)
        return res.status(400).json({status:"Error", message:"Something went wrong",data:''})
    }
}

const verifyUser = async (req,res)=>{
    console.log("verifyUser",req.query.id)
    if(!req.query.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const verifiedData = await User.findOneAndUpdate({_id:req.query.id},{$set:{isIdVerified:true}});
        if(!verifiedData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"Data fetched"})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

const blockUser = async (req,res)=>{
    console.log("block",req.query.id)
    if(!req.query.id){
        return res.status(400).json({status:"Error", message:"NO id to block"})
    }
    try{
        const blockedData = await User.findOneAndUpdate({_id:req.query.id},{$set:{isBlocked:true}});
        if(!blockedData){
            return res.status(404).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"userBlocked"})
    }catch(err){
        console.log(err);
        return res.status(500).json({status:"Error", message:"Something went wrong"})
    }
}

const unBlockUser = async (req,res)=>{
    console.log("unBlockUser")
    if(!req.query.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const unBlockUserData = await User.findOneAndUpdate({_id:req.query.id},{$set:{isBlocked:false}});
        if(!unBlockUserData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"userunBlocked"})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

const getUserPagesCount =  async(req,res)=>{
    console.log("in get page")
    try{
        const count = await User.find({}).count();
        const pages = Math.ceil(+count/2);
        console.log("pages>>",pages)
        return res
      .status(200)
      .json({ page:pages });
    }catch(err){
        console.log(err);
        return res
        .status(200)
        .json({ page:"" });
    }
  }



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Full Vehicle data @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const getFullVehicleList = async (req, res) => {
    console.log("in vehiclelist")
    try {
        const page = +req.query.id;
        const limit = 4;
        const skip = 4*(page-1);   
      const vehicleList = await Vehicle.find({}).limit(limit).skip(skip);
      console.log("Vehicle list", vehicleList);
      if (!vehicleList) {
        return res.status(400).json({ status: "Error", message: "Something went wrong!!", data:"" })
      }
      return res
        .status(200)
        .json({ status: "Success", message: "OK", data: vehicleList });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ status: "Error", message: "Something went wrong!!", data:"" })
    }
  };

  const unBlockVehicle = async(req,res)=>{
    console.log("in unblock",req.query.id)
    try {
        console.log("in unblock")
        const vehicleList = await Vehicle.findOneAndUpdate({_id:req.query.id},{$set:{isBlocked:false}},{new:true});
        console.log("Vehicle list", vehicleList);
        if (!vehicleList) {
          return res.status(400).json({ status: "Error", message: "Something went wrong!!" })
        }
        return res
          .status(200)
          .json({ status: "Success", message: "OK"});
      } catch (err) {
        console.log(err);
        return res.status(400).json({ status: "Error", message: "Something went wrong!!" })
      }
  }

  const blockVehicle = async(req,res)=>{
    console.log("in block",req.query.id)
    try {
        const vehicleList = await Vehicle.findOneAndUpdate({_id:req.query.id},{$set:{isBlocked:true}},{new:true});
        console.log("Vehicle list", vehicleList);
        if (!vehicleList) {
          return res.status(400).json({ status: "Error", message: "Something went wrong!!" })
        }
        return res
          .status(200)
          .json({ status: "Success", message: "OK"});
      } catch (err) {
        console.log(err);
        return res.status(500).json({ status: "Error", message: "Something went wrong!!" })
      }
  }

  const getPagesCount = async(req,res)=>{
    console.log("in get page")
    try{
        const count = await vehicleModel.find({}).count();
        const pages = Math.ceil(+count/4);
        console.log("pages>>",pages)
        return res
      .status(200)
      .json({ page:pages });
    }catch(err){
        console.log(err);
        return res
        .status(500)
        .json({ page:"" });
    }
  }
const getRideList = async(req,res)=>{
    try{
        const rideData = await rideModel.find({});
        if(!rideData){
            return res
            .status(500)
            .json({status:"Error",message:"Something went wrong",data:[]})
        }
        return res
        .status(200)
        .json({status:"Success",message:"OK",data:rideData})

    }catch(err){
        console.log(err);
        return res
                .status(500)
                .json({status:"Error",message:"Something went wrong",data:[]})

    }
}

const blockRide = async(req,res)=>{
    console.log(req.body.id)
    try{
        const isBlocked = await rideModel.findByIdAndUpdate(req.body.id,{$set:{isBlocked:true}},{new:true});
        if(!isBlocked){
            return res
            .status(500)
            .json({status:"Error",message:"Something went wrong"})
        }
        return res
        .status(200)
        .json({status:"Success",message:"Blocked"})

    }catch(err){
        console.log(err);
        return res
                .status(500)
                .json({status:"Error",message:"Something went wrong"})
    }
}
const unBlockRide = async(req,res)=>{
    console.log(req.body.id)
    try{
        const isBlocked = await rideModel.findByIdAndUpdate(req.body.id,{$set:{isBlocked:false}},{new:true});
        if(!isBlocked){
            return res
            .status(500)
            .json({status:"Error",message:"Something went wrong"})
        }
        return res
        .status(200)
        .json({status:"Success",message:"Blocked"})

    }catch(err){
        console.log(err);
        return res
                .status(500)
                .json({status:"Error",message:"Something went wrong"})
    }
}
module.exports = {
    getAllUsers,
    verifyUser,
    blockUser,
    unBlockUser,
    getFullVehicleList,
    unBlockVehicle,
    blockVehicle,
    getPagesCount,
    getUserPagesCount,
    getRideList,
    blockRide,
    unBlockRide
}