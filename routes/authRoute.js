const express = require('express');
const {
    signupValidator,
    loginValidator,
} = require('../http/validators/authValidator');

const {
    signup,
    login,
    forgotPassword,
    verifyPassResetCode,
    resetPassword,
} = require('../http/controllers/authController');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;
