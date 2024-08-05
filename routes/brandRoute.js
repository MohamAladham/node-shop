const express = require('express');
const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require('../http/validators/brandValidator');

const authService = require('../http/controllers/authController');

const {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage,
} = require('../http/controllers/brandController');

const router = express.Router();

router
    .route('/')
    .get(getBrands)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadBrandImage,
        resizeImage,
        createBrandValidator,
        createBrand
    );
router
    .route('/:id')
    .get(getBrandValidator, getBrand)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadBrandImage,
        resizeImage,
        updateBrandValidator,
        updateBrand
    )
    .delete(
        authService.protect,
        authService.allowedTo('admin'),
        deleteBrandValidator,
        deleteBrand
    );

module.exports = router;
