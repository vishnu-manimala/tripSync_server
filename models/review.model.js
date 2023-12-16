const mongoose = require("mongoose");
const rideModel = require("./ride.model");
const userModel = require("./user.model");

const reviewSchema = new mongoose.Schema({
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: rideModel,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedUsers: [],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  },
  message: {
    type: String,
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reply: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
      },
      message: {
        type: String,
      },
      likes: {
        type: Number,
        default: 0,
      },
      likedUsers: [],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
