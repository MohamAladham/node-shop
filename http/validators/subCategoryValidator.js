const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const SubCategory = require('../../models/subCategoryModel');
const ApiError = require("../../utils/apiError");

exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required')
        .isLength({ min: 2 })
        .withMessage('Too short Subcategory name')
        .isLength({ max: 32 })
        .withMessage('Too long Subcategory name')
        .custom(async (val, { req }) => {
            // check for duplication
            const subCat = await SubCategory.findOne({ name: val })

            if (subCat) {
                throw new ApiError('SubCategory already exist', 400)
            }
        })
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),
    check('category')
        .notEmpty()
        .withMessage('subCategory must be belong to category')
        .isMongoId()
        .withMessage('Invalid Category id format'),
    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    body('name').custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id format'),
    validatorMiddleware,
];
