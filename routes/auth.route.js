const express = require('express');
const auth_route = express();

const authController = require('../controller/auth.controller')


auth_route.post('/register',authController.register);
auth_route.post('/password_login',authController.passwordLogin);
auth_route.post('/send_otp',authController.sendOtp);
auth_route.post('/verify_otp',authController.authOtp);
auth_route.post('/reset_password',authController.resetPassword);
module.exports = auth_route;