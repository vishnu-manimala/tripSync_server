const mongoose = require('mongoose');
const userModel =require('./user.model');
const vehicleModel = require('./vehicle.model');

const rideSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel,
        required:true
    },
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    originLocation:{
        lat:{
            type:String
        },
        lng:{
            type:String
        }
    },
    destinationLocation:{
        lat:{
            type:String
        },
        lng:{
            type:String
        }
    },
    departure_date:{
        type:Date,
        required:true
    },
    departure_time:{
        type:String   
    },
    available_seats:{
        type:Number,
        required:true
    },
    vehichle_type:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    isIntstantBooking:{
       type:Boolean
    },
    isAfterDiscussion:{
        type:Boolean
     },
    coRiderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel,
       
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type:Date
    },
    stops:{
        type: [String]
    },
    isChat:{
        type:Boolean,
        default:true
    },
    isOpenForCall:{
        type:Boolean,
        default:false
    },
    isOpenForVideoCall:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    vehichle_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:vehicleModel
    },
    likes:{
        type:Number,
        default:0
    },
    likedUsers:[],
    rideRequest:[
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: userModel
            },
            status: {
                type: String,
                default: "pending"
            },
            razorpay_payment_id:{
                type: String,
                default:""
            },
            razorpay_order_id:{
                type: String,
                default:""
            },
            amount:{
                type:Number,
                default:0
            },
            requestedAt:{
                type:Date
            },
            payedAt:{
                type:Date
            }
        }
    ],
    })
    module.exports = mongoose.model('ride',rideSchema);