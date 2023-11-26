const express = require('express');
const ride_route = express();

const publishedRides = require('../controller/ride.controller');
const authMiddleware = require('../middleware/jwt.middleware');
const isBlockedMiddleware = require('../middleware/isBlocked.middleware');


ride_route.get('/getAllPublishedRides',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked, publishedRides.getAllPublishedRides);
ride_route.get('/getPublishedRide',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.getPublishedRide);
ride_route.post('/saveRideBasic',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.publishedRideBasic);
ride_route.post('/saveRideRoute',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.publishedRideRoute);
ride_route.post('/saveRideVehicle',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.publishedRideVehicle);
ride_route.post('/saveRideSettings',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.publishedRideContactOptions);
ride_route.post('/saveRideRPayments',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.publishedRidePayments);
ride_route.post('/getSearchedRide',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.getSearchedRide);
ride_route.get('/get.pages',authMiddleware.verifyJwt,isBlockedMiddleware.isBlocked,publishedRides.getPages);

module.exports =  ride_route;