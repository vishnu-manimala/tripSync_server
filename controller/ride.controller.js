const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');
const vehicleModel = require('../models/vehicle.model');
const SharedFiles = require('../utils/helper.functions');
const mongoose = require('mongoose');

const publishedRideBasic = async(req,res)=>{
    console.log("request body>>>",req.body.data);
    if(!req.body.data){
        return res.status(400).json({status:"Error",message:"Bad request",data:"", token:""})
    }
    try{
        const data = req.body.data;
        const user = req.user.userData;
        console.log("user>>",user)
        // const createRide = await rideModel({
        //   user_id: user._id,
        //   origin: req.body.data.origin,
        //   destination: req.body.data.destination,
        //   departure_date: req.body.data.date,
        //   departure_time: req.body.data.time,
        //   available_seats: req.body.data.seats,
        // });
        const latO = data.origin['geometry']['location']['lat']
       
        const createRide = await rideModel({
          user_id: user._id,
          origin: data.origin.name,
          destination: data.destination.name,
          originLocation:data.originLocation,
          destinationLocation:data.destinationLocation,
          departure_date: data.date,
          departure_time: data.time,
          available_seats: data.seats,
        });
        const ride = await createRide.save();
        console.log("ride>>",ride);
        if(!ride){
            return res.status(500).json({status:"Error",message:"Something went wrong",data:"", token:""})
        }
        user.rideId = ride._id;
        console.log(user.rideId);
        const token = await SharedFiles.tokenGenerator(user);
        console.log(token);
        return res.status(200).json({
            status: "Success",
            message: "ok",
            data: "ride",
            token: token,
        });
    }catch(err){
        console.log(err);
        return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong",data:"",token:"" });
    }
}

const publishedRideRoute = async(req,res)=>{
    console.log(req.body);
    if(!req.body.data){
        return res.status(400).json({status:"Error",message:"Bad request"})
    }
    try{
        const user = req.user;
        const rideRoute = await rideModel.findOneAndUpdate(
            { _id: user.rideId },
            { $addToSet: { stops: { $each: routeArray } } },
            { new: true }
          );
        console.log("rideRoute>>",rideRoute);
        if(!rideRoute){
            return res.status(500).json({status:"Error",message:"Something went wrong"})
        }
        return res.status(200).json({
            status: "Success",
            message: "ok",
        });
    }catch(err){
        console.log(err);
        return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
    }
}

const publishedRidePayments = async(req,res)=>{
    console.log(req.body);
    if(!req.body.data ){
        return res.status(400).json({status:"Error",message:"Bad request"})
    }
    try{
        const user = req.user;
        const ridePayment = await rideModel.findOneAndUpdate(
            { _id: user.rideId },
            { $addToSet: { availablePaymentMethods: { $each: paymentArray } } },
            { new: true }
          );
        
        console.log("ridePayment>>",ridePayment);
        if(!ridePayment){
            return res.status(500).json({status:"Error",message:"Something went wrong"})
        }
        return res.status(200).json({
            status: "Success",
            message: "ok",
        });
    }catch(err){
        console.log(err);
        return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong"});
    }
}

const publishedRideVehicle = async(req,res)=>{
    console.log(req.body);
    if(!req.body.data ){
        return res.status(400).json({status:"Error",message:"Bad request"})
    }
    try{
        const user = req.user.userData;
        console.log(user)
        const rideVehicle = await rideModel.findOneAndUpdate(
            { _id: user.rideId },
            { $set: { vehichle_id: req.body.data} },
            { new: true }
          );
        
        console.log("rideVehicle>>",rideVehicle);
        if(!rideVehicle){
            return res.status(500).json({status:"Error",message:"Something went wrong"})
        }
        return res.status(200).json({
            status: "Success",
            message: "ok",
        });
    }catch(err){
        console.log(err);
        return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong"});
    }
}
const publishedRideContactOptions = async(req,res)=>{
    console.log(req.body.data);
    if(!req.body.data ){
        return res.status(400).json({status:"Error",message:"Bad request"})
    }
    try{
        const user = req.user.userData;
        const rideContact = await rideModel.findOneAndUpdate(
            { _id: user.rideId },
            { $set: { isOpenForCall: req.body.data.call, isOpenForVideoCall:req.body.data.video} },
            { new: true }
          );
        
        console.log("rideContact>>",rideContact);
        if(!rideContact){
            return res.status(500).json({status:"Error",message:"Something went wrong"})
        }
        return res.status(200).json({
            status: "Success",
            message: "ok",
        });

    }catch(err){
        console.log(err);
        return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong"});
    }
}   

    const getAllPublishedRides = async(req,res)=>{
   console.log("in data",req.query.id)
        try{
            const user = req.user.userData;
            const page =req.query.id;
            const limit = 3;
            const skip = 2*(page-1);  
            const publishedRides = await rideModel.find({user_id:user._id}).limit(limit).skip(skip);
            console.log("publishedRides>>",publishedRides);
            if(!publishedRides){
                return res.status(500).json({status:"Error",message:"Something went wrong",data:""})
            }
            return res.status(200).json({
                status: "Success",
                message: "ok",
                data: publishedRides
            });
        }catch(err){
            console.log(err);
            return res
          .status(500)
          .json({ status: "Error", message: "Something went wrong",data:""});
        }
    }

    const getPublishedRide = async(req,res)=>{
        console.log(req.query.id);
        if(!req.query.id){
            return res.status(400).json({status:"Error",message:"Bad request",data:''})
        }
        try{
            const publishedRide = await rideModel.find({_id:req.query.id}) 
            console.log("publishedRide>>",publishedRide);
            if(!ride){
                return res.status(500).json({status:"Error",message:"Something went wrong",data:""})
            }
            return res.status(200).json({
                status: "Success",
                message: "ok",
                data: publishedRide
            });
        }catch(err){
            console.log(err);
            return res
          .status(500)
          .json({ status: "Error", message: "Something went wrong",data:""});
        }
    }

   const getSearchedRide = async(req,res)=>{
    console.log(req.body);
    if(!req.body){
        return res.status(400).json({status:"Error",message:"Bad request",data:''})
    }
    try{
        const user = req.user.userData;
        const userId = new mongoose.Types.ObjectId(user._id);
        console.log(userId)
        // const searchData = await rideModel.find({origin:req.body.origin,destination:req.body.destination,departure_date:req.body.date})
       const searchdata = await rideModel.aggregate([
        {
        $match: {
            origin: {
                $regex: new RegExp(req.body.origin, 'i')
              },
              destination: {
                $regex: new RegExp(req.body.destination, 'i')
              },
          departure_date: new Date(req.body.date),
          user_id: { $ne: userId }
        }
      },{
        $lookup: {
          from: 'vehicles', // Assuming the collection name is 'vehicles'
          localField: 'vehichle_id',
          foreignField: '_id',
          as: 'vehicleDetails'
        }
      },
      {
        $unwind: {
          path: '$vehicleDetails',
          preserveNullAndEmptyArrays: true
        }
      },{
        $lookup: {
          from: 'users', // Assuming the collection name is 'users'
          localField: 'vehicleDetails.userId',
          foreignField: '_id',
          as: 'vehicleDetails.userDetails'
        }
      },{
        $unwind: {
          path: '$vehicleDetails.userDetails',
          preserveNullAndEmptyArrays: true
        }
      },
    ])
    
        console.log(searchdata);
       
        if(!searchdata){
            return res.status(500).json({status:"No rides Available",message:"Nothing found",data:''});
        }
        //console.log(searchdata)
        return res.status(200).json({status:"Success",message:"Ok",data:searchdata})
        
    }catch(err){
        console.log(err);
        return res.status(500).json({status:"Error",message:"Something went wrong!!!",data:''});
    }
   }

   const getPages = async(req,res)=>{
    try{
      const data = await rideModel.find({user_id:req.user.userData._id}).count();
      console.log("count",data);
      let pageCount = Math.ceil(+data/2);
      console.log("pages",pageCount);
      return res
        .status(200)
        .json({ page:pageCount });
    }catch(err){
      console.log(err);
      return res
        .status(500)
        .json({ page:'1' });
    }
  }

module.exports = {
    getPublishedRide,
    getAllPublishedRides,
    publishedRideContactOptions,
    publishedRideVehicle,
    publishedRidePayments,
    publishedRideRoute,
    publishedRideBasic,
    getSearchedRide,
    getPages
}