const express = require('express');
const admin_route = express();

const adminController = require('../controller/admin.controller')

admin_route.get('/users',adminController.getAllUsers);
admin_route.get('/block',adminController.blockUser);
admin_route.get('/verify',adminController.verifyUser); 
admin_route.get('/unBlock',adminController.unBlockUser);



module.exports = admin_route;




