

const express = require('express');
const account_route = express();
const multer = require('multer');


const accountController = require('../controller/account.controller')
const jwtMiddleware = require('../middleware/jwt.middleware')
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

account_route.patch('/updateName',jwtMiddleware.verifyJwt,isBlockedMiddleware.isBlocked, accountController.updateName);
account_route.post('/saveProfilephoto',jwtMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,upload.single('file'),accountController.updatePhoto);
account_route.post('/saveIdPhotos',jwtMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,upload.array('files'),accountController.saveIdPhotos);
account_route.post('/saveLicensePhotos',jwtMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,upload.array('files'),accountController.saveLicensePhotos);
account_route.get('/getUserData',jwtMiddleware.verifyJwt,isBlockedMiddleware.isBlocked, accountController.getUserData);


module.exports = account_route;