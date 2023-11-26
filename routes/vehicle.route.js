const express = require('express');
const vehicle_route = express();
const multer = require('multer');

const vehicleController = require('../controller/vehicle.controller');
const jwtAuth  = require('../middleware/jwt.middleware');
const isBlockedMiddleware = require('../middleware/isBlocked.middleware');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

  vehicle_route.get('/get.vehicles.info',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.getVehicleList);

  vehicle_route.post('/add.vehicle',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.addVehicle);
  vehicle_route.get('/vehicle.types',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.getVehicleTypes);
  vehicle_route.post('/save.vehicle',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.saveVehicle);
  vehicle_route.post('/save.registration.data',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.saveRegistrationData);
  vehicle_route.post('/save.insurance.data',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.saveInsuranceData);
  vehicle_route.post('/save.vehicle.photos',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked, upload.array('files'),vehicleController.saveVehiclePhoto);
  vehicle_route.get('/get.vehicle.info',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.getVehicleInfo);
  vehicle_route.get('/get.vehicles.info',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.getVehicleList);
  vehicle_route.delete('/delete',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.deleteVehicle);
  vehicle_route.patch('/update.vehicle',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.updateVehicle);
  vehicle_route.patch('/update.registration',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.updateRegistration);
  vehicle_route.patch('/update.insurance',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.updateInsurance);
  vehicle_route.patch('/update.image',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked, upload.array('files'),vehicleController.updateImages);
  vehicle_route.post('/delete.image',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked, upload.array('files'),vehicleController.deleteImage);
  vehicle_route.get('/get.pages',jwtAuth.verifyJwt,isBlockedMiddleware.isBlocked,vehicleController.getPages);


  //@@@@@@@@@@@@@@@@@@@@@@@ Admin @@@@@@@@@@@@@@@@@@@@@@@
 
  vehicle_route.get('/get.vehicle.list',jwtAuth.verifyJwt,vehicleController.getSingleVehicleInfo);
  vehicle_route.get('/block.vehicle',jwtAuth.verifyJwt,vehicleController.blockVehicle);
  vehicle_route.get('/unBlock.vehicle',jwtAuth.verifyJwt,vehicleController.unblockVehicle);
  vehicle_route.get('/verify.vehicle',jwtAuth.verifyJwt,vehicleController.verifyVehicle);


module.exports = vehicle_route;
