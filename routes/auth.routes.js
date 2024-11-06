const express = require('express');
const router = express();

const { registerValidator } = require('../helpers/validator');

const authController = require('../controller/authController');

router.post('/register',registerValidator , authController.registerUser);


module.exports = router