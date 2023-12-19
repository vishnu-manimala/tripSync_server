const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");
const SharedFiles = require('../utils/helper.functions');
const vehicleModel = require("../models/vehicle.model");


//###########################  full vehicle list retrieval for user #####################################
const getVehicleList = async (req, res) => {
  try {
    console.log(req.query)
    const user = req.user.userData;
    console.log("inVehicle list>>", user);
    if (!user) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong",data:'' });
    }
    const page = +req.query.id;
    const limit = 2;
    const skip = 2*(page-1);   
    const vehicleList = await Vehicle.find({ userId: user._id, isBlocked:false }).limit(limit).skip(skip);
    if (!vehicleList) {
      return res
      .status(404)
      .json({ status: "Error", message: "Data not found",data:'' });
    }
    console.log("vehicleList>>", vehicleList);
    return res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleList });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong",data:'' });
  }
};

//###########################  Add vehicle first part optional #####################################
const addVehicle = async (req, res) => {
  try {
    const user = req.user.userData;
    const { twoWheeler, fourWheeler } = req.body;

    if (!twoWheeler && !fourWheeler) {
      return res.status(400).json({ status: "Error", message: "Bad request",data:'' });
    }

    const category = [];
    if (twoWheeler) {
      category.push("two wheeler");
    }
    if (fourWheeler) {
      category.push("four wheeler");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { ownsVehicle: true }, $push: { vehicleCategory: category } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong",data:'' });
    }

    return res
      .status(200)
      .json({ status: "Success", message: "Success", data: updatedUser });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong",data:'' });
  }
};

//########################### Get vehicle type : may discard later #####################################
const getVehicleTypes = async (req, res) => {
  const user = req.user.userData;
  try {
    const vehicleTypes = await User.findOne(
      { _id: user._id },
      { $project: { vehicleCategory: 1, _id: 0 } }
    );
    console.log("types", vehicleTypes);
    if (!vehicleTypes) {
      return res
        .status(404)
        .json({ status: "Not Found", message: "Nothing found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Data found", data: vehicleTypes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

//###########################  Add vehicle second part vehicle basic data #####################################
const saveVehicle = async (req, res) => {
  console.log("save vehicle", req.body);
  if (!req.body) {
    return res.status(400).json({ status: "Error", message: "No body" });
  }
  const user = req.user.userData;
  try {
    const savedData = await Vehicle({
      category: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
      yearOfManufacture: req.body.year,
      color: req.body.color,
      userId: user._id,
    });
    const vehicleData = await savedData.save();
    console.log(vehicleData);
    user.vehicleId = vehicleData._id;
    console.log(user.vehicleId);
    const newToken = await SharedFiles.tokenGenerator(user);
    console.log(newToken);
    return res.status(200).json({
      status: "Success",
      message: "ok",
      data: vehicleData,
      token: newToken,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

//###########################  Add vehicle registration details #####################################
const saveRegistrationData = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ status: "Error", message: "NO body" });
  }
  const user = req.user.userData;
  try {
    const reg = {
      registrationNumber: req.body.registrationNumber,
      expiryDate: req.body.expiryDate,
    };
    const data = await Vehicle.findOne({
      "registration.registrationNumber": req.body.registrationNumber,
    });
    if (data) {
      return res.status(409).json({
        status: "Error",
        message: "Register number already Exists!!!",
      });
    }
    const regData = await Vehicle.findOneAndUpdate(
      { _id: user.vehicleId },
      { $set: { registration: reg } },
      { new: true }
    );
    if (!regData) {
      return res
        .status(500)
        .json({ status: "Error", message: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: regData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong" });
  }
};

//###########################  Add Insurance details part optional #####################################
const saveInsuranceData = async (req, res) => {
  if (!req.body) {
    return res
      .status(500)
      .json({ status: "Error", message: "No body!", data:"" });
  }

  try {
    const user = req.user.userData;
    const insurance = {
      insuranceCompany: req.body.insuranceCompany,
      policyNumber: req.body.policyNumber,
      expiryDate: req.body.expiryDate,
    };
    const insuranceData = await Vehicle.findOneAndUpdate(
      { _id: user.vehicleId },
      { $set: { insurance: insurance } },
      { new: true }
    );
    if (!insuranceData) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!", data:"" });
    }
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: insuranceData });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!", data:"" });
  }
};

//###########################  Add vehicle photo #####################################
const saveVehiclePhoto = async (req, res) => {
  console.log(req.files);
  if (!req.files || req.files.length === 0) {
    return res
      .status(500)
      .json({ status: "Error", message: "Files not found!", data:"" });
  }
  const imageArray = req.files.map((element) => element.filename);
  try {
    const user = req.user.userData;
    const vehiclePhoto = await Vehicle.findOneAndUpdate(
      { _id: user.vehicleId },
      { $set: { VehiclePhotos: imageArray, status: "completed" } },
      { new: true }
    );
    if (!vehiclePhoto) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!", data:"" });
    }
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: vehiclePhoto });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong!", data:"" }); }
};

//###########################  single vehicle info retrieval #####################################
const getVehicleInfo = async (req, res) => {
  console.log("in vehicle info");
  const user = req.user.userData;
  const vehicleId = req.query.id || user.vehicleId;
  if (!vehicleId) {
    return res
      .status(500)
      .json({ status: "Error", message: "Id not found", data:"" });
  }
  try {
    const vehicleInfo = await Vehicle.findOne({ _id: vehicleId });
    if (!vehicleInfo) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data:"" });
    }
    console.log("vehicleInfo", vehicleInfo);
    return res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleInfo });
    
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data:"" });
  }
};

const getVehicles = async(req,res)=>{
  const user = req.user.userData;
  
  if (!user) {
    return res
      .status(500)
      .json({ status: "Error", message: "Id not found", data:"" });
  }
  try {
    const vehicleInfo = await Vehicle.find({ userId: user._id, isBlocked:false });
    if (!vehicleInfo) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data:"" });
    }
    console.log("vehicleInfo", vehicleInfo);
    return res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleInfo });
    
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data:"" });
  }
}
const deleteVehicle = async(req,res)=>{
  console.log(req.query);
  if(!req.query.id){
    return res.status(400).json({status:"Error", message:"vehicle id is not available"})
  }
  try{
    const deletedVehicle = await vehicleModel.findOneAndUpdate({_id:req.query.id},{$set:{isBlocked:true}},{new:true});
    
    if(!deletedVehicle){
      return res.status(400).json({status:"Error", message:"Something went wrong"})
    }
    console.log(deletedVehicle);
    return res.status(200).json({status:"Success", message:"Deleted"})
  }catch(err){
    console.log(err);
    return res.status(500).json({status:"Error", message:"Something went wrong"})
  }
}

const updateVehicle = async(req,res)=>{
  console.log("body",req.body,"query",req.query)
  try{
    if(!req.body || !req.query.id){
      return res.status(404).json({status:"Error",message:"No body"});
    }
    const updatedData = await vehicleModel.findOneAndUpdate({_id:req.query.id},{$set:{brand:req.body.brand,model:req.body.model,year:req.body.year,color:req.body.color}},{new:true});
    if(!updatedData){
      return res.status(500).json({status:"Error",message:"Something went wrong"});
    }
    return res.status(200).json({status:"Success",message:"Successfully updated"});

  }catch(err){
    console.log(err);
    return res.status(500).json({status:"Error",message:"Something went wrong"});
  }
}

const updateRegistration = async(req,res)=>{
  console.log("body",req.body,"query",req.query)
  try{
    if(!req.body || !req.query.id){
      return res.status(404).json({status:"Error",message:"No body"});
    }
    const updatedData = await vehicleModel.findOneAndUpdate({_id:req.query.id},{$set:{
      'registration.registrationNumber': req.body.registrationNumber,
      'registration.expiryDate':req.body.expiryDate,
    }},{new:true});
    if(!updatedData){
      return res.status(500).json({status:"Error",message:"Something went wrong"});
    }
    return res.status(200).json({status:"Success",message:"Successfully updated"});

  }catch(err){
    console.log(err);
    return res.status(500).json({status:"Error",message:"Something went wrong"});
  }
}

const updateInsurance = async(req,res)=>{
  console.log("body",req.body,"query",req.query)
  try{
    if(!req.body || !req.query.id){
      return res.status(404).json({status:"Error",message:"No body"});
    }
    const updatedData = await vehicleModel.findOneAndUpdate({_id:req.query.id},{$set:{
      'insurance.insuranceCompany': req.body.insuranceCompany,
      'insurance.policyNumber':req.body.policyNumber,
      'insurance.expiryDate':req.body.expiryDate,
    }},{new:true});
    if(!updatedData){
      return res.status(500).json({status:"Error",message:"Something went wrong"});
    }
    return res.status(200).json({status:"Success",message:"Successfully updated"});

  }catch(err){
    console.log(err);
    return res.status(500).json({status:"Error",message:"Something went wrong"});
  }
}

const updateImages = async(req,res)=>{
  console.log(req.files);
  if (!req.files || req.files.length === 0) {
    return res
    .status(500)
    .json({ status: "Error", message: "files not found", data: "" });
  }
  const imageArray = req.files.map((element) => element.filename);
  try {
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { _id: req.query.id },
      { $addToSet: { VehiclePhotos: { $each: imageArray } } },
      { new: true }
    );
    if (!updatedVehicle) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data: "" });
    }
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: updatedVehicle });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data: "" });
  }
}


const deleteImage = async(req,res)=>{
  console.log(req.body, req.query.id);
  if (!req.body || !req.query.id) {
    return res
    .status(500)
    .json({ status: "Error", message: "Data not found", data: "" });
  }
  try {
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { _id: req.query.id },
      { $pull: { VehiclePhotos: req.body.image} },
      { new: true }
    );
    console.log("check",updatedVehicle)
    if (!updatedVehicle) {
      return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data: "" });
    }
    console.log(updatedVehicle)
    return res
      .status(200)
      .json({ status: "Success", message: "Ok", data: updatedVehicle });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Something went wrong", data: "" });
  }
}

const getPages = async(req,res)=>{
  try{
    const data = await vehicleModel.find({userId:req.user.userData._id,isBlocked:false}).count();
    console.log(data);
    let pageCount = Math.floor(+data/2);
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


//*****************************************ADMIN SIDE *************************************************




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Single Vehicle data @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const getSingleVehicleInfo = async (req, res) => {
 
  const vehicleId = req.query.id;
  if (!vehicleId) {
    return sendErrorResponse(res, "Something went wrong");
  }
  try {
    const vehicleInfo = await Vehicle.findOne({ _id: vehicleId });
    if (!vehicleInfo) {
      return sendErrorResponse(res, "Something went wrong");
    }
    console.log("vehicleInfo", vehicleInfo);
    return res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleInfo });
    
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, "Something went wrong");
  }
};

const blockVehicle = async (req, res) => {
  if (!req.query.id) {
    return sendErrorResponse(res, "No id");
  }
  try {
    const vehicleData = await Vehicle.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { isBlocked: true } },
      { new: true }
    );
    if (!vehicleData) {
      return sendErrorResponse(res, "Something went wrong");
    }
    res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleData });
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, "Something went wrong");
  }
};

const unblockVehicle = async (req, res) => {
  if (!req.query.id) {
    return sendErrorResponse(res, "No id");
  }
  try {
    const vehicleData = await Vehicle.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { isBlocked: false } },
      { new: true }
    );
    if (!vehicleData) {
      return sendErrorResponse(res, "Something went wrong");
    }
    res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleData });
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, "Something went wrong");
  }
};

const verifyVehicle = async (req, res) => {
  if (!req.query.id) {
    return sendErrorResponse(res, "No id");
  }
  try {
    const vehicleData = await Vehicle.findOneAndUpdate(
      { _id: req.query.id },
      { $set: { isVerified: true } },
      { new: true }
    );
    if (!vehicleData) {
      return sendErrorResponse(res, "Something went wrong");
    }
    res
      .status(200)
      .json({ status: "Success", message: "OK", data: vehicleData });
  } catch (err) {
    console.log(err);
    return sendErrorResponse(res, "Something went wrong");
  }
};

const cancelPublishing = async(req,res)=>{
  try{
    const user = req.user.userData;
    const cancelledvehicle = await vehicleModel.findByIdAndDelete(user.vehicleId);
    if(!cancelledvehicle){
      return res
      .status(500)
      .json({ status:"Error", message:"SOmething went wrong" });
    }
    return res
    .status(200)
    .json({ status:"Success", message:"ok" });

  }catch(err){
    console.log(err);
    return res
      .status(500)
      .json({ status:"Error", message:"SOmething went wrong" });
  }

}

module.exports = {
  getVehicleList,
  addVehicle,
  getVehicleTypes,
  saveVehicle,
  saveRegistrationData,
  saveInsuranceData,
  saveVehiclePhoto,
  getVehicleInfo,
  
  getSingleVehicleInfo,
  blockVehicle,
  unblockVehicle,
  verifyVehicle,
  deleteVehicle,
  updateVehicle,
  updateRegistration,
  updateInsurance,
  updateImages,
  deleteImage,
  getPages,
  getVehicles,
  cancelPublishing
};
