const express = require('express');
const review_route = express();

const reviewController = require('../controller/review.controller')

review_route.post('/saveComment',reviewController.saveComment);
review_route.patch('/reviewLike',reviewController.reviewLike);
review_route.patch('/replyLike',reviewController.replyLike);
review_route.patch('/saveReply',reviewController.saveReply);
review_route.delete('/deleteReview',reviewController.deleteReview);
review_route.delete('/deleteReply',reviewController.deleteReply);

module.exports = review_route;