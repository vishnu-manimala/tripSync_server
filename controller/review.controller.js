const { query } = require("express");
const reviewModel = require("../models/review.model");
const userModel = require("../models/user.model");
const saveComment = async (req, res) => {
  try {
    const data = req.body;
    const review = {};
    const newReview = await reviewModel.create({
      rideId: data.rideId,
      userId: data.userId,
      message: data.review,
    });
    const savedReview = await newReview.save();

    if (!savedReview) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong!" });
    }

    console.log("Review saved successfully!", savedReview);

    return res.status(200).json({ status: "Success", message: "ok" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
  }
};
const reviewLike = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
  }
  try {
    const review = await reviewModel.findOne({ _id: req.body.reviewId });
    let like;
    if (review.isLiked && review.likedUsers.includes(req.body.userId)) {
      like = await reviewModel.findOneAndUpdate(
        { _id: req.body.reviewId },
        {
          $set: { isLiked: false },
          $pull: { likedUsers: req.body.userId },
          $inc: { likes: -1 }
        },
        { new: true }
      );
    } else {
      like = await reviewModel.findOneAndUpdate(
        { _id: req.body.reviewId },
        {
          $set: { isLiked: true },
          $push: { likedUsers: req.body.userId },
          $inc: { likes: 1 }
        },
        { new: true }
      );
    }
    if (!like) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong!" });
    }
    return res.status(200).json({ status: "Success", message: "Ok" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
  }
};
const replyLike = async (req, res) => {

  console.log("replyLikes",req.body);
  if (!req.body) {
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
  }
  try {
    const review = await reviewModel.findOne({ 'reply._id': req.body.replyId });
    console.log("review>>",review)
    let like;
    const replyElement = review.reply.find(element=>element._id.toString()===req.body.replyId.toString())
    console.log("replyElement<<",replyElement.likedUsers.includes(req.body.userId))
    if (replyElement.likedUsers.includes(req.body.userId)) {
      like = await reviewModel.findOneAndUpdate(
        { 'reply._id': req.body.replyId },
        {
          $pull: { 'reply.$.likedUsers': req.body.userId }, // Use '$' to reference the matched element
          $inc: { 'reply.$.likes': -1 } // Use '$' to reference the matched element
        },
        { new: true }
      );
    } else {
      like = await reviewModel.findOneAndUpdate(
        { 'reply._id': req.body.replyId },
        {
          $push: { 'reply.$.likedUsers': req.body.userId }, // Use '$' to reference the matched element
          $inc: { 'reply.$.likes': 1 } // Use '$' to reference the matched element
        },
        { new: true }
      );
    }
    console.log(like)
    if (!like) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong!" });
    }
    return res.status(200).json({ status: "Success", message: "Ok" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
  }
};

const saveReply = async(req,res)=>{
  console.log("saveReply",req.body)
  try{

    if(!req.body){
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
    }
    const data =req.body;
    const reply = {userId:data.userId,message:data.reply}
    const savedReply = await reviewModel.findOneAndUpdate({_id:data.reviewId},
              {$push:{reply:reply}},
              {new:true})
    if(!savedReply){
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
    }
    console.log("savedReply",savedReply);
    return res
    .status(200)
    .json({ status: "Success", message: "Ok" });          
  }catch(err){
    console.log(err);
    return res
    .status(500)
    .json({ status: "Error", message: "Something went wrong!" });
  }
}

const deleteReply = async(req,res)=>{
  try{
    if(!req.query){
      return res
    .status(500)
    .json({ status: "Error", message: "Something went wrong!" });
    }
  const deletedReply = await reviewModel.updateOne(
    { 'reply._id': req.query.id },
    { $pull: { reply: { _id: req.query.id } } },
    {new:true}
  );
  if(!deletedReply){
    return res
    .status(500)
    .json({ status: "Error", message: "Something went wrong!" });
  }
  return res
  .status(200)
  .json({ status: "Success", message: "Ok" });          
  }catch(err){
    console.log(err);
    return res
    .status(500)
    .json({ status: "Error", message: "Something went wrong!" });
  }
}
const deleteReview = async(req,res)=>{
  try{
    if(!req.query){
      return res
    .status(500)
    .json({ status: "Error", message: "Something went wrong!" });
    }
    const deletedReview = await reviewModel.findOneAndDelete({ _id: req.query.id });
    if(!deletedReview){
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!" });
    }
    console.log("deletedReview>>",deletedReview)
    return res
  .status(200)
  .json({ status: "Success", message: "Ok" }); 
  }catch(err){
    console.log(err);
    return res
    .status(500)
    .json({ status: "Error", message: "Something went wrong!" });
  }
}
module.exports = {
  saveComment,
  reviewLike,
  replyLike,
  saveReply,
  deleteReply,
  deleteReview
};
