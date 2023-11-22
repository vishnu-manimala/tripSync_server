const User = require("../models/user.model");


const getAllUsers = async (req,res)=>{
    console.log("in get all");
    try{
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
        });
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
    console.log("verifyUser")
    if(!req.query.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const verifiedData = await User.find({_id:req.query.id},{$set:{isIdVerified:true}});
        if(!verifiedData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"Data fetched"})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

const blockUser = async (req,res)=>{
    console.log("block")
    if(!req.query.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const blockedData = await User.find({_id:req.query.id},{$set:{isBlocked:true}});
        if(!blockedData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"userBlocked"})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

const unBlockUser = async (req,res)=>{
    console.log("unBlockUser")
    if(!req.query.id){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    try{
        const unBlockUserData = await User.find({_id:req.query.id},{$set:{isBlocked:false}});
        if(!unBlockUserData){
            return res.status(400).json({status:"Error", message:"Something went wrong"})
        }
        return res.status(200).json({status:"Success", message:"userBlocked"})
    }catch(err){
        return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
}

module.exports = {
    getAllUsers,
    verifyUser,
    blockUser,
    unBlockUser
}