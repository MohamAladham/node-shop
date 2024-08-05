const express = require('express');

const {
    getCoupon,
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} = require('../http/controllers/couponController');

const authService = require('../http/controllers/authController');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('admin', 'manager'));

router.route('/').get(getCoupons).post(createCoupon);
router.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
