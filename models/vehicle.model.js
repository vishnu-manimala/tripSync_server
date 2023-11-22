const mongoose = require('mongoose');
const userModel = require('./user.model');

const vehicleSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
   userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel
   },
    brand:{
        type:String,
       
    },
    model:{
        type:String,
        
    },
    yearOfManufacture:{
        type:String,
      
    },
    color:{
        type:String,
      
    },
    registration:{
        registrationNumber:{
            type:String,
          
        },
        expiryDate:{
            type:Date,
          
        },
    },
    insurance:{
        insuranceCompany:{
            type:String,
        },
        policyNumber:{
            type:String
        },
        expiryDate:{
            type:Date
        }
    },
    VehiclePhotos:[],
    ratingAndReview:[{
        rating:{
            type:Number,
        },
        review:{
                type:String
        },
       
    }],
    isBlocked:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    },
    status:{
        type:String,
        default:"pending"
    }
})

module.exports = mongoose.model('vehicle',vehicleSchema);