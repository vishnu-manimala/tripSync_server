const express = require('express');
const profile_route = express();

const profileController = require('../controller/profile.controller');
const authMiddleware = require('../middleware/jwt.middleware');
const isBlockedMiddleware = require('../middleware/isBlocked.middleware');


profile_route.get('/getProfileData',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,profileController.getProfileData);
profile_route.patch('/followProfile',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,profileController.followProfile);
profile_route.patch('/unfollowProfile',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,profileController.unfollowProfile);
module.exports =  profile_route;