const express = require('express');

const authService = require('../http/controllers/authController');

const {
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist,
} = require('../http/controllers/wishlistController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;
