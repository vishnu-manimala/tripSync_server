const express = require('express');
const vehicle_route = express();
const multer = require('multer');

const vehicleController = require('../controller/vehicle.controller');
const jwtAuth  = require('../middleware/jwt.middleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

  vehicle_route.get('/get.vehicles.info',jwtAuth.verifyJwt,vehicleController.getVehicleList);

  vehicle_route.post('/add.vehicle',jwtAuth.verifyJwt,vehicleController.addVehicle);
  vehicle_route.get('/vehicle.types',jwtAuth.verifyJwt,vehicleController.getVehicleTypes);
  vehicle_route.post('/save.vehicle',jwtAuth.verifyJwt,vehicleController.saveVehicle);
  vehicle_route.post('/save.registration.data',jwtAuth.verifyJwt,vehicleController.saveRegistrationData);
  vehicle_route.post('/save.insurance.data',jwtAuth.verifyJwt,vehicleController.saveInsuranceData);
  vehicle_route.post('/save.vehicle.photos',jwtAuth.verifyJwt, upload.array('files'),vehicleController.saveVehiclePhoto);
  vehicle_route.get('/get.vehicle.info',jwtAuth.verifyJwt,vehicleController.getVehicleInfo);
  vehicle_route.get('/get.vehicles.info',jwtAuth.verifyJwt,vehicleController.getVehicleList);
  vehicle_route.get('/delete',jwtAuth.verifyJwt,vehicleController.deleteVehicle);
  //@@@@@@@@@@@@@@@@@@@@@@@ Admin @@@@@@@@@@@@@@@@@@@@@@@
  vehicle_route.get('/get.vehicles.list',jwtAuth.verifyJwt,vehicleController.getFullVehicleList);
  vehicle_route.get('/get.vehicle.list',jwtAuth.verifyJwt,vehicleController.getSingleVehicleInfo);
  vehicle_route.get('/block.vehicle',jwtAuth.verifyJwt,vehicleController.blockVehicle);
  vehicle_route.get('/unBlock.vehicle',jwtAuth.verifyJwt,vehicleController.unblockVehicle);
  vehicle_route.get('/verify.vehicle',jwtAuth.verifyJwt,vehicleController.verifyVehicle);


module.exports = vehicle_route;
