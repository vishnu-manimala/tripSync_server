const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');
const vehicleModel = require('../models/vehicle.model');
const SharedFiles = require('../utils/helper.functions')


const updateName = async(req,res)=>{
    console.log(req.body,req.user)
    try{
        const user =req.user.userData;
        const userdata = await userModel.findOneAndUpdate({_id:user._id},{$set:{name:req.body.name}},{new:true})
        if(!userdata){
            return res.status(500).json({status:"Error",message:"Something went wrong",data:""})
        }
        return res.status(200).json({status:"Success",message:"OK",data:userdata.name})
    }catch(err){
        return res.status(500).json({status:"Error",message:"Something went wrong",data:""})
    }
}

const updatePhoto = async(req,res)=>{
    console.log(req.file.filename);
    if (!req.file ) {
      return res
      .status(500)
      .json({ status: "Error", message: "files not found"});
    }
    try {
      const user = req.user.userData;
      const updatedPhoto = await userModel.findOneAndUpdate(
        { _id: user._id },
        { $push: { profileImage: req.file.filename } },
        { new: true }
      );
      if (!updatedPhoto) {
        return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
      }
      console.log(updatedPhoto)
      return res
        .status(200)
        .json({ status: "Success", message: "Ok"});
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong"});
    }
  }

  const saveIdPhotos = async(req,res)=>{
    console.log(req.body,req.files);
    if (!req.files || req.files.length === 0 || !req.body.idName) {
        return res
        .status(500)
        .json({ status: "Error", message: "files not found" });
      }
      const imageArray = req.files.map((element) => element.filename);
      try {
        const user = req.user.userData;
        const updatedUser = await userModel.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { idPhotos: { $each: imageArray } },$set:{idName:req.body.idName} },
          { new: true }
        );
        if (!updatedUser) {
          return res
          .status(500)
          .json({ status: "Error", message: "Something went wrong"});
        }
        console.log(updatedUser)
        return res
          .status(200)
          .json({ status: "Success", message: "Ok" });
        } catch (err) {
            console.log(err);
            return res
              .status(500)
              .json({ status: "Error", message: "Something went wrong" });
          }
  }

  const saveLicensePhotos = async(req,res)=>{
    console.log(req.files);
    if (!req.files || req.files.length === 0 ) {
        return res
        .status(500)
        .json({ status: "Error", message: "files not found" });
      }
      const imageArray = req.files.map((element) => element.filename);
      try {
        const user = req.user.userData;
        const updatedUser = await userModel.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { licencePhotos: { $each: imageArray } }},
          { new: true }
        );
        if (!updatedUser) {
          return res
          .status(500)
          .json({ status: "Error", message: "Something went wrong"});
        }
        console.log(updatedUser)
        return res
          .status(200)
          .json({ status: "Success", message: "Ok" });
        } catch (err) {
            console.log(err);
            return res
              .status(500)
              .json({ status: "Error", message: "Something went wrong" });
          }
  }
module.exports = {
    updateName,
    updatePhoto,
    saveIdPhotos,
    saveLicensePhotos
}