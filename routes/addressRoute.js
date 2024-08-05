const express = require('express');

const authService = require('../http/controllers/authController');

const {
    addAddress,
    removeAddress,
    getLoggedUserAddresses,
} = require('../http/controllers/addressController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;
