const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');
const vehicleModel = require('../models/vehicle.model');
const SharedFiles = require('../utils/helper.functions')


const getProfileData = async(req,res)=>{
    console.log(req.query.id)
    try{
        const user = req.user.userData;
        if(req.query.id){
            const userData = await userModel.findOne({_id:req.query.id})
            const rideDatas =  await rideModel.find({user_id:req.query.id})
            const followData = {
            isFollowing : userData.followers.includes(user._id),
            isFollower : userData.following.includes(user._id)
            }
            console.log(rideDatas);
            console.log(userData)
            if(!userData){
                return res.status(404).json({status:"Error",message:"Something went wrong",data:""});
            }
            return res.status(200).json({status:"Success",message:"OK",data:userData,ride:rideDatas.length,rideDatas:rideDatas,followData:followData});
        }else{
            const userData = await userModel.findOne({_id:user._id})
            const rideDatas =  await rideModel.find({user_id:user._id})
            // console.log(rideDatas);
            // console.log(userData)
            if(!userData){
                return res.status(404).json({status:"Error",message:"Something went wrong",data:""});
            }
            return res.status(200).json({status:"Success",message:"OK",data:userData,ride:rideDatas.length,rideDatas:rideDatas,followData:""});
        }
       
    }catch(err){
        console.log(err);
        return res.status(500).json({status:"Error",message:"SOMething went wrong",data:""});
    }
}

const followProfile = async(req,res)=>{
    console.log(req.body.id)
    try{
        if(!req.body.id){
            return res.status(500).json({status:"Error",message:"SOMething went wrong"});
        }
        const user = req.user.userData;
        const following = await userModel.findByIdAndUpdate(user._id,{$push:{following:req.body.id}},{new:true})
        const followers = await userModel.findByIdAndUpdate(req.body.id,{$push:{followers:user._id}},{new:true})
        if(!followers || !following){
            return res.status(500).json({status:"Error",message:"SOMething went wrong"});
        }
        
        return res.status(200).json({status:"Success",message:"OK"});
    }catch(err){
        console.log(err);
        return res.status(500).json({status:"Error",message:"SOMething went wrong"});
    }
}
const unfollowProfile = async(req,res)=>{
    console.log(req.body.id)
    try{
        if(!req.body.id){
            return res.status(500).json({status:"Error",message:"SOMething went wrong"});
        }
        const user = req.user.userData;
        const following = await userModel.findByIdAndUpdate(user._id,{$pull:{following:req.body.id}},{new:true})
        const followers = await userModel.findByIdAndUpdate(req.body.id,{$pull:{followers:user._id}},{new:true})
        if(!followers || !following){
            return res.status(500).json({status:"Error",message:"SOMething went wrong"});
        }
        console.log("follower>>",followers)
        console.log("following>>",following)
        return res.status(200).json({status:"Success",message:"OK"});
    }catch(err){
        console.log(err);
        return res.status(500).json({status:"Error",message:"SOMething went wrong"});
    }
}

module.exports = {
    getProfileData,
    followProfile,
    unfollowProfile
}