const rideModel = require("../models/ride.model");
const userModel = require("../models/user.model");
const User = require("../models/user.model");
const vehicleModel = require("../models/vehicle.model");
const reviewModel = require('../models/review.model')
const Vehicle = require('../models/vehicle.model')

const getPages = async(req,res)=>{
    console.log(req.query.page)
    try{
        let data = 1;
        switch (req.query.page) {
            case 'user':
                data = await userModel.countDocuments({});
                break;
            case 'vehicle':
                data = await vehicleModel.countDocuments({});
                console.log("vehicle:",data)
                break;
            case 'ride':
                data = await rideModel.countDocuments({});
                console.log("ridepage:",data)
                break;
            case 'review':
                data = await reviewModel.countDocuments({});
                console.log("ridepage:",data)
                break;
            default:
                data = 0;
                break;
        }
      
      
      if(!data){
        return res.status(500).json(0);
      }
      let pageCount = Math.ceil(+data / 10);
      console.log("pages", pageCount);
      return res.status(200).json(pageCount);
    } catch (err) {
      console.log(err);
      return res.status(500).json(0);
    }
}

const getAdminData = async(req,res)=>{
    try{
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth()+1;
        const startOfMonth =  new Date(currentYear,currentMonth-1,1);
        const endOfMonth = new Date(currentYear,currentMonth,0, 23, 59, 59, 999);

        //retreiving data
        //counts
        const totalUsers = await userModel.find().count();
        const totalVehicles = await vehicleModel.find().count();
        const totalRides = await rideModel.find().count();
        const currentMonthUsers = await userModel.find({createdAt:{
            $gte: startOfMonth,
            $lt: endOfMonth
          }}).count();

        //datas
        const newUsers = await userModel.find({createdAt:{
            $gte: startOfMonth,
            $lt: endOfMonth
          }}).sort({createdAt:-1}).limit(5);
        const users = await userModel.find().sort({createdAt:-1}).limit(5);
        const vehicles = await vehicleModel.find().sort({createdAt:-1}).limit(5);
        const newVehicles = await vehicleModel.find({createdAt:{
            $gte: startOfMonth,
            $lt: endOfMonth
          }}).sort({createdAt:-1}).limit(5);
          const rides = await rideModel.find().sort({createdAt:-1}).limit(5);
          const newRides = await rideModel.find({createdAt:{
            $gte: startOfMonth,
            $lt: endOfMonth
          }}).sort({createdAt:-1}).limit(5);
        //data to be send
        const adminData = {
            totalUsers:totalUsers,
            totalNewUsers:currentMonthUsers,
            totalVehicles:totalVehicles,
            totalRides:totalRides,
            newUsers:newUsers,
            newVehicles:newVehicles,
            newRides:newRides,
            users:users,
            vehicles:vehicles,
            rides:rides
        }
        console.log("newUsers",newUsers)
        console.log("adminData",adminData)
        return res.status(200).json({status:"Success",message:"OK",data:adminData})
    }catch(err)
    {
        console.log(err)
        return res.status(500).json({status:"Error", message:"Something went wrong",data:''})
    }
}

const getAllUsers = async (req,res)=>{
    console.log("in get all",req.query.id);
    try{
        const page = +req.query.id;
        const limit = 10;
        const skip = 10*(page-1);   
        const usersData = await User.find({}).limit(limit).skip(skip).sort({createdAt:-1});
        if(!usersData){
            return res.status(400).json({status:"Error", message:"Something went wrong",data:''})
        }
        console.log(usersData)
        return res.status(200).json({status:"Success", message:"Data fetched",data:usersData})
    }catch(err){
        console.log(err)
        return res.status(500).json({status:"Error", message:"Something went wrong",data:''})
    }
}
const verifyCredential = async (req,res)=>{
    console.log("verifyUser",req.body.id)
    if(!req.body.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        let verifiedData;
        switch(req.body.path){
            case 'ID'       : verifiedData = await User.findOneAndUpdate({_id:req.body.id},{$set:{isIdVerified:true}},{new:true});
                                break;
            case 'License'  : verifiedData = await User.findOneAndUpdate({_id:req.body.id},{$set:{islicenceVerified:true}},{new:true});
                                break;
            default         : verifiedData = "";
                                break;
        }
        
        if(!verifiedData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"Data fetched",data:verifiedData})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

const verifyUser = async (req,res)=>{
    console.log("verifyUser",req.body.id)
    if(!req.body.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const verifiedData = await User.findOneAndUpdate({_id:req.body.id},{$set:{isIdVerified:true}});
        if(!verifiedData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"Data fetched"})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

const blockUser = async (req,res)=>{
    console.log("block",req.body.id)
    if(!req.body.id){
        return res.status(400).json({status:"Error", message:"NO id to block"})
    }
    try{
        const blockedData = await User.findOneAndUpdate({_id:req.body.id},{$set:{isBlocked:true}},{new:true});
        console.log(blockedData);
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
    console.log("unBlockUser",req.body.id)
    if(!req.body.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const unBlockUserData = await User.findOneAndUpdate({_id:req.body.id},{$set:{isBlocked:false}});
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
        console.log("Vehicle",req.query.id)
        const page = +req.query.id;
        const limit = 10;
        const skip = 10*(page-1);   
      const vehicleList = await Vehicle.find({}).limit(limit).skip(skip).sort({createdAt:-1});
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
    console.log("in unblock",req.body.id)
    try {
        console.log("in unblock")
        const vehicleList = await Vehicle.findOneAndUpdate({_id:req.body.id},{$set:{isBlocked:false}},{new:true});
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
    console.log("in block",req.body.id)
    try {
        const vehicleList = await Vehicle.findOneAndUpdate({_id:req.body.id},{$set:{isBlocked:true}},{new:true});
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

  const verifyVehicle = async(req,res)=>{
    console.log("in block",req.body.id)
    try {
        const vehicleList = await Vehicle.findOneAndUpdate({_id:req.body.id},{$set:{isVerified:true}},{new:true});
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


  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ RIDE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const getRideList = async(req,res)=>{
    try{
        const page = +req.query.id;
        const limit = 10;
        const skip = 10*(page-1);   
        const rideData = await rideModel.find({}).sort({created_at:-1}).limit(limit).skip(skip);
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
    console.log("block ride",req.body.id)
    try{
        
       const isBlocked = await rideModel.findOneAndUpdate({_id:req.body.id},{$set:{isBlocked:true}},{new:true});
        if(!isBlocked){
            console.log("ride block",isBlocked)
            return res
            .status(500)
            .json({status:"Error",message:"Something went wrong"})
        }
        console.log("isBlocked")
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

const getHomeData = async(req,res)=>{
    const user =  req.user.usersData;
    const userId = user._id; 

const userRidesPipeline = [
    {
        $match: { userId: mongoose.Types.ObjectId(userId) }
    },
    {
        $project: {
            _id: 1,
            userId: 1,
           
        }
    }
];

const followingRidesPipeline = [
    {
        $match: { userId: { $in: [mongoose.Types.ObjectId(userId), ...user.following] } }
    },
    {
        $project: {
            _id: 1,
            userId: 1,
          
        }
    }
];

const allRidesPipeline = [
    {
        $facet: {
            userRides: userRidesPipeline,
            followingRides: followingRidesPipeline
        }
    },
    {
        $project: {
            allRides: {
                $concatArrays: ['$userRides', '$followingRides']
            }
        }
    },
    {
        $unwind: '$allRides'
    },
    {
        $replaceRoot: { newRoot: '$allRides' }
    }
];

const result = await Ride.aggregate(allRidesPipeline);

console.log("result",result);
}

const getReviews = async(req,res)=>{
    try{
        const page = +req.query.id;
        const limit = 10;
        const skip = 10*(page-1);
        
        const reviewData = await reviewModel.find(
            {})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);
        let userId = new Array();
        if(!reviewData){
            return res.status(500).json({ status: "Error", message: "Something went wrong!!" })
        }
        reviewData.forEach(item=>{
          if(!userId.includes(item.userId.toString())){
            userId.push(item.userId.toString());
          }
          item.reply.forEach(reply=>{
            if(!userId.includes(reply.userId.toString())){
              userId.push(reply.userId.toString())
            }
          })
        })
        console.log("userId>>",userId)
        const userData = await userModel.find({_id: { $in: userId }})
        let reviewSet = new Array();
        reviewData.forEach(review=>{
          let reviewInfo= {}
          const user = userData.find(user=>user._id.toString() === review.userId.toString())
          reviewInfo.rideId = review.rideId;
          reviewInfo._id = review._id;
          reviewInfo.userId = review.userId;
          reviewInfo.message = review.message;
          reviewInfo.likes = review.likes;
          reviewInfo.createdAt = review.createdAt;
          reviewInfo.isLiked = review.isLiked;
          reviewInfo.username = user.name;
          reviewInfo.likedUsers = review.likedUsers;
          reviewInfo.profileImage = user.profileImage[user.profileImage.length-1];
          reviewInfo.reply = new Array();
          review.reply.forEach(comment=>{
            const userDetails = userData.find(user=>user._id.toString() === comment.userId.toString());
            const replyList = {
              replyId:comment._id,
              replyComment : comment.message,
              replyUserName: user.name,
              replyProfileImage:user.profileImage[user.profileImage.length-1],
              replyUserId:comment.userId,
              replyLikes:comment.likes,
              replyCreatedAt:comment.createdAt,
              likedUsers:comment.likedUsers
            }
            reviewInfo.reply.push(replyList);
          })
          reviewSet.push(reviewInfo);
        })
        return res.status(200).json({ status: "Success", message: "Ok",data: reviewSet})
    }catch(err){
        console.log(err);
        return res.status(500).json({ status: "Error", message: "Something went wrong!!" })
    }
}

module.exports = {
    getAdminData,
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
    unBlockRide,
    getPages,
    verifyVehicle,
    verifyCredential,
    getHomeData,
    getReviews
}