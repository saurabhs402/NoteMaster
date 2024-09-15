const express = require('express')
const authController = require('../Controllers/authController')


const router = express.Router();

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)



module.exports = router;