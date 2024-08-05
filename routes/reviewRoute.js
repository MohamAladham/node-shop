const express = require('express');

const {
    createReviewValidator,
    updateReviewValidator,
    getReviewValidator,
    deleteReviewValidator,
} = require('../http/validators/reviewValidator');

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    createFilterObj,
} = require('../http/controllers/reviewController');

const authService = require('../http/controllers/authController');
const setURLIdToBody = require("../utils/setURLIdToBody");

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(createFilterObj, getReviews)
    .post(
        authService.protect,
        authService.allowedTo('user'),
        setURLIdToBody('product','productId'),
        createReviewValidator,
        createReview
    );
router
    .route('/:id')
    .get(getReviewValidator, getReview)
    .put(
        authService.protect,
        authService.allowedTo('user'),
        updateReviewValidator,
        updateReview
    )
    .delete(
        authService.protect,
        authService.allowedTo('user', 'manager', 'admin'),
        deleteReviewValidator,
        deleteReview
    );

module.exports = router;
