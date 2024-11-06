const express = require('express');
const router = express();

const { registerValidator, loginValidator } = require('../helpers/validator');

const authController = require('../controller/authController');

router.post('/register',registerValidator , authController.registerUser);
router.post('/login',loginValidator , authController.loginUser);



module.exports = router