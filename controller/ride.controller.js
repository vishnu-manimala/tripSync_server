const rideModel = require("../models/ride.model");
const userModel = require("../models/user.model");
const vehicleModel = require("../models/vehicle.model");
const SharedFiles = require("../utils/helper.functions");
const reviewModel = require('../models/review.model')
const mongoose = require("mongoose");
const Razorpay = require("razorpay");

const publishedRideBasic = async (req, res) => {
  console.log("request body>>>", req.body.data);
  if (!req.body.data) {
    return res
      .status(400)
      .json({ status: "Error", message: "Bad request", data: "", token: "" });
  }
  try {
    const data = req.body.data;
    const user = req.user.userData;
    console.log("user>>", user);
    const latO = data.origin["geometry"]["location"]["lat"];

    const createRide = await rideModel({
      user_id: user._id,
      origin: data.origin.name,
      destination: data.destination.name,
      originLocation: data.originLocation,
      destinationLocation: data.destinationLocation,
      departure_date: data.date,
      departure_time: data.time,
      available_seats: data.seats,
    });
    const ride = await createRide.save();
    console.log("ride>>", ride);
    if (!ride) {
      return res.status(500).json({
        status: "Error",
        message: "Something went wrong",
        data: "",
        token: "",
      });
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "Error",
      message: "Something went wrong",
      data: "",
      token: "",
    });
  }
};

const publishedRideRoute = async (req, res) => {
  console.log(req.body);
  if (!req.body.data) {
    return res.status(400).json({ status: "Error", message: "Bad request" });
  }
  try {
    const user = req.user;
    const rideRoute = await rideModel.findOneAndUpdate(
      { _id: user.rideId },
      { $addToSet: { stops: { $each: routeArray } } },
      { new: true }
    );
    console.log("rideRoute>>", rideRoute);
    if (!rideRoute) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res.status(200).json({
      status: "Success",
      message: "ok",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const publishedRidePayments = async (req, res) => {
  console.log(req.body);
  if (!req.body.data) {
    return res.status(400).json({ status: "Error", message: "Bad request" });
  }
  try {
    const user = req.user;
    const ridePayment = await rideModel.findOneAndUpdate(
      { _id: user.rideId },
      { $addToSet: { availablePaymentMethods: { $each: paymentArray } } },
      { new: true }
    );

    console.log("ridePayment>>", ridePayment);
    if (!ridePayment) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res.status(200).json({
      status: "Success",
      message: "ok",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const publishedRideVehicle = async (req, res) => {
  console.log(req.body);
  if (!req.body.data) {
    return res.status(400).json({ status: "Error", message: "Bad request" });
  }
  try {
    const user = req.user.userData;
    console.log(user);
    const rideVehicle = await rideModel.findOneAndUpdate(
      { _id: user.rideId },
      { $set: { vehichle_id: req.body.data } },
      { new: true }
    );

    console.log("rideVehicle>>", rideVehicle);
    if (!rideVehicle) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res.status(200).json({
      status: "Success",
      message: "ok",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};
const publishedRideContactOptions = async (req, res) => {
  console.log(req.body.data);
  if (!req.body.data) {
    return res.status(400).json({ status: "Error", message: "Bad request" });
  }
  try {
    const user = req.user.userData;
    const rideContact = await rideModel.findOneAndUpdate(
      { _id: user.rideId },
      {
        $set: {
          isOpenForCall: req.body.data.call,
          isOpenForVideoCall: req.body.data.video,
        },
      },
      { new: true }
    );

    console.log("rideContact>>", rideContact);
    if (!rideContact) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res.status(200).json({
      status: "Success",
      message: "ok",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const getAllPublishedRides = async (req, res) => {
  console.log("in data", req.query.id);
  try {
    const user = req.user.userData;
    const page = req.query.id;
    const limit = 3;
    const skip = 2 * (page - 1);
    const publishedRides = await rideModel
      .find({ user_id: user._id })
      .sort({ departure_date: -1 })
      .limit(limit)
      .skip(skip);
    console.log("publishedRides>>", publishedRides);
    if (!publishedRides) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong", data: "" });
    }
    return res.status(200).json({
      status: "Success",
      message: "ok",
      data: publishedRides,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data: "" });
  }
};

const getPublishedRide = async (req, res) => {
  console.log(req.query.id);
  if (!req.query.id) {
    return res
      .status(400)
      .json({ status: "Error", message: "Bad request", data: "" });
  }
  try {
    const publishedRide = await rideModel.find({ _id: req.query.id });
    console.log("publishedRide>>", publishedRide);
    if (!ride) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong", data: "" });
    }
    return res.status(200).json({
      status: "Success",
      message: "ok",
      data: publishedRide,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data: "" });
  }
};

const getSearchedRide = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res
      .status(400)
      .json({ status: "Error", message: "Bad request", data: "" });
  }
  try {
    const user = req.user.userData;
    const userId = new mongoose.Types.ObjectId(user._id);
    console.log(userId);
    // const searchData = await rideModel.find({origin:req.body.origin,destination:req.body.destination,departure_date:req.body.date})
    const searchdata = await rideModel.aggregate([
      {
        $match: {
          origin: {
            $regex: new RegExp(req.body.origin, "i"),
          },
          destination: {
            $regex: new RegExp(req.body.destination, "i"),
          },
          departure_date: new Date(req.body.date),
          user_id: { $ne: userId },
        },
      },
      {
        $lookup: {
          from: "vehicles", // Assuming the collection name is 'vehicles'
          localField: "vehichle_id",
          foreignField: "_id",
          as: "vehicleDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the collection name is 'users'
          localField: "vehicleDetails.userId",
          foreignField: "_id",
          as: "vehicleDetails.userDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails.userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    console.log("searchdata>>", searchdata);

    if (!searchdata) {
      return res.status(500).json({
        status: "No rides Available",
        message: "Nothing found",
        data: "",
      });
    }
    //console.log(searchdata)
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: searchdata });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!!!", data: "" });
  }
};

const getPages = async (req, res) => {
  try {
    const data = await rideModel
      .find({ user_id: req.user.userData._id })
      .count();
    // console.log("count",data);
    let pageCount = Math.ceil(+data / 2);
    console.log("pages", pageCount);
    return res.status(200).json(pageCount);
  } catch (err) {
    console.log(err);
    return res.status(500).json(1);
  }
};

const requestRide = async (req, res) => {
  console.log("request>>",req.body)
  try {
    if (!req.body) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    const user = req.user.userData;
    let rideRequest;
    if(req.body.requestId){

      rideRequest = await rideModel.findOneAndUpdate(
        { "rideRequest._id": req.body.requestId },
        { $set: { "rideRequest.$.status": "requested" } },
        { new: true }
      );

    }else{
      const request = {
        userId: user._id,
        status: "requested",
      };

      rideRequest = await rideModel.findByIdAndUpdate(
        req.body.rideId,
        { $push: { rideRequest: request } },
        { new: true }
      );
    }
   
    if (!rideRequest) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    // console.log("rideRequest>>",rideRequest)
    return res.status(200).json({ status: "Success", message: "requested" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const cancelRideRequest = async (req, res) => {
  console.log("request>>", req.body);
  console.log("what")
  if (!req.body) {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
  const user = req.user.userData;
  try {
    const updatedRide = await rideModel.findByIdAndUpdate(
      req.body.rideId,
      { $pull: { rideRequest: { _id: req.body.requestId } } },
      { new: true }
    );
    if (!updatedRide) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    console.log("Ride updated successfully:", updatedRide);
    return res.status(200).json({ status: "Success", message: "updated" });
  } catch (err) {
    console.error("Error updating ride:", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const getRide = async (req, res) => {
  console.log("In get single ride", req.query.id);
  try {
    if (!req.query.id) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    const rideId = new mongoose.Types.ObjectId(req.query.id);
    const searchdata = await rideModel.aggregate([
      {
        $match: {
          _id: rideId,
        },
      },
      {
        $lookup: {
          from: "vehicles", // Assuming the collection name is 'vehicles'
          localField: "vehichle_id",
          foreignField: "_id",
          as: "vehicleDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the collection name is 'users'
          localField: "vehicleDetails.userId",
          foreignField: "_id",
          as: "vehicleDetails.userDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails.userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
   
     console.log("searchdata", searchdata);
    if (!searchdata) {
      return res.status(500).json({
        status: "No rides Available",
        message: "Nothing found",
        data: "",
      });
    }

    //reviewData
    const reviewData = await reviewModel.find({rideId:rideId});
    //userData
    let userId = new Array();
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
    //get userdata using userIds
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
    console.log("reviewSet",reviewSet);
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: searchdata,review:reviewSet });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const rideRequestedUser = async (req, res) => {
  console.log("rideRequestedUser", req.body.data);
  try {
    const dataArray = req.body.data;
    const userIds = dataArray.map((item) => item.userId);
    console.log("userIds", userIds);
    const userData = await userModel.find({ _id: { $in: userIds } });
    const resultArray = dataArray.map((item) => ({
      ...item,
      userData: userData.find(
        (user) => user._id.toString() === item.userId.toString()
      ),
    }));
    console.log("resultArray", resultArray);
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", userData: resultArray });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", userData: [] });
  }
};

const acceptRequest = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
  try {
    const acceptedReq = await rideModel.findOneAndUpdate(
      { "rideRequest._id": req.body.id },
      { $set: { "rideRequest.$.status": "accepted" } },
      { new: true }
    );
   // console.log("acceptedReq", acceptedReq);
    if (!acceptedReq) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong"});
    }
    //const data = acceptedReq.rideRequest.filter(item=>item._id.toString() === req.body.id.toString())
    console.log("data>>>>",acceptedReq.rideRequest)
    return res.status(200).json({ status: "Success", message: "ok" ,data:acceptedReq.rideRequest });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};
const rejectRequest = async (req, res) => {
  console.log(req.body);
  if (!req.body.id) {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", userData: [] });
  }
  try {
    const rejectReq = await rideModel.findOneAndUpdate(
      { "rideRequest._id": req.body.id },
      { $set: { "rideRequest.$.status": "rejected" } },
      { new: true }
    );
    if (!rejectReq) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res.status(200).json({ status: "Success", message: "ok" ,data:rejectReq.rideRequest});
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};
const cancelRequest = async (req, res) => {
  console.log("cancel>>",req.body);
  if (!req.body) {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
  try {
    let cancelReq;
    console.log("in paid")
    switch (req.body.action) {
      case 'paid':
      console.log("in paid")
        cancelReq = await rideModel.findOneAndUpdate(
          { "rideRequest._id": req.body.requestId },
          { $set: { "rideRequest.$.status": "payment returned" } },
          { new: true }
        );
        break;
      case 'cancel':
        cancelReq = await rideModel.findOneAndUpdate(
          { "rideRequest._id": req.body.requestId },
          { $set: { "rideRequest.$.status": "cancelled" } },
          { new: true }
        );
        break;
      default:cancelReq = "";
                break;
    }
    //  cancelReq = await rideModel.findOneAndUpdate(
    //   { "rideRequest._id": req.body.id },
    //   { $pull: { rideRequest: { _id: req.body.id } } },
    //   { new: true }
    // );
    if (!cancelReq) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res.status(200).json({ status: "Success", message: "ok" ,data:cancelReq.rideRequest});
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const createOrder = async (req, res) => {
  console.log("req.body.amount>>");
  try {
    const user = req.user.userData;
    console.log("req.body.amount>>", req.body.amount);
    const instance = new Razorpay({
      key_id: "rzp_test_0wPeTmtyc9nQDT",
      key_secret: "vH3hgvmM5FDh83KoeIwuDrSJ",
    });
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: user.email,
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.error("unexpected", err);
        return res
          .status(500)
          .json({ status: "Error", message: "Something went wrong" });
      }
      res
        .status(200)
        .json({ status: "Success", message: "OK", data: order.id });
    });
  } catch (err) {
    console.log("crate error>>", err.message);

    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const savePayment = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.ride) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    const rideData = req.body.ride;
    const amount = req.body.amount;
    const rzpData = req.body.data;
    const paymentUpdate = await rideModel.findOneAndUpdate(
      { "rideRequest._id": rideData.rideID },
      {
        $set: {
          "rideRequest.$.razorpay_payment_id": rzpData.razorpay_payment_id,
          "rideRequest.$.razorpay_order_id": rzpData.razorpay_order_id,
          "rideRequest.$.amount": amount,
          "rideRequest.$.payedAt": new Date(),
          "rideRequest.$.status": "paid",
        },
      },
      {
        new: true,
      }
    );
    console.log("crate error>>", paymentUpdate);
    return res
      .status(200)
      .json({ status: "Success", message: "payment saved" });
  } catch (err) {
    console.log("crate error>>", err.message);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const getRideData = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 5;
    const skip = 2 * (page - 1);
    const user = req.user.userData;
    const rides = await rideModel.aggregate([
      {
        $match: {
          "rideRequest.userId": new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          from: "vehicles", // Assuming the collection name is 'vehicles'
          localField: "vehichle_id",
          foreignField: "_id",
          as: "vehicleDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the collection name is 'users'
          localField: "vehicleDetails.userId",
          foreignField: "_id",
          as: "vehicleDetails.userDetails",
        },
      },
      {
        $unwind: {
          path: "$vehicleDetails.userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
  
    if (!rides) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    console.log(">>>>>>>>>>>>>>>>>>>", rides);
    return res
      .status(200)
      .json({ status: "Success", message: "OK", data: rides });
    // console.log("userRides>>>>>>>>>>>>>>>>>>>>>>",userRides)
  } catch (err) {
    console.log("crate error>>", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

const rideLike = async(req,res)=>{
  console.log("rideLike>>",req.body)
  try{
    if(!req.body){
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
    }
    const ride = await rideModel.findOne( {_id:req.body.rideId})
    let liked;
    if(ride.likedUsers.includes(req.body.userId)){
      liked = await rideModel.findOneAndUpdate(
        {_id:req.body.rideId},
        { $pull: { likedUsers: req.body.userId },
        $inc: { likes: -1 }})
    }else{
      liked = await rideModel.findOneAndUpdate(
        {_id:req.body.rideId},
        { $push: { likedUsers: req.body.userId },
        $inc: { likes: 1 }})
    }
    if(!liked){
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
    }
    return res
    .status(200)
    .json({ status: "Success", message: "OK" });
  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });

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
  getPages,
  requestRide,
  getRide,
  cancelRideRequest,
  rideRequestedUser,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  createOrder,
  savePayment,
  getRideData,
  rideLike
};
