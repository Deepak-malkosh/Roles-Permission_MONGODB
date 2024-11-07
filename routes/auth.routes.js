const express = require('express');
const router = express();

const auth = require('../middleware/auth');

const { registerValidator, loginValidator } = require('../helpers/validator');

const authController = require('../controller/authController');

router.post('/register',registerValidator , authController.registerUser);
router.post('/login',loginValidator , authController.loginUser);

//authenticated route
router.get('/profile', auth, authController.getProfile);


module.exports = router