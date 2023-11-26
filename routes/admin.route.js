const express = require('express');
const admin_route = express();

const adminController = require('../controller/admin.controller')

admin_route.get('/users',adminController.getAllUsers);
admin_route.patch('/block',adminController.blockUser);
admin_route.patch('/verify',adminController.verifyUser); 
admin_route.patch('/unBlock',adminController.unBlockUser);
admin_route.get('/get.user.pages',adminController.getUserPagesCount);

//vehicle
admin_route.get('/getFullVehicleList',adminController.getFullVehicleList);
admin_route.patch('/unblock.vehicles',adminController.unBlockVehicle);
admin_route.patch('/block.vehicles',adminController.blockVehicle);
admin_route.get('/get.pages',adminController.getPagesCount);
module.exports = admin_route;




