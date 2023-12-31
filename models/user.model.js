const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    contactNumber:{
        type:Number,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:[],
    createdAt:{
        type:Date,
        default:Date.now
    },
    idName:{
            type:String,
    },
    idPhotos:[],
    updatedAt:{
        type:Date
    },
    islicenceVerified:{
        type:Boolean,
        default:false
    },
    isIdVerified:{
        type:Boolean,
        default:false
    },
    isPhoneVerified:{
        type:Boolean,
        default:false
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    ownsVehicle:{
        type:Boolean,
        default:false
    },
    vehicleCategory:[],
    licencePhotos:[],
    following:[],
    followers:[],
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number
        }
        
    
})

module.exports = mongoose.model('user',userSchema);