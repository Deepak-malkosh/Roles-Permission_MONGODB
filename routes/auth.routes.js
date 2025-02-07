const express = require('express');
const router = express();

const authController = require('../controller/authController');

const { registerValidator, loginValidator} = require('../helpers/validator');

const auth = require('../middleware/auth')

router.post('/register', registerValidator, authController.registerUser);

router.post('/login', loginValidator, authController.loginUser);

router.get('/profile', auth, authController.getProfile);

router.get('/refresh-permissions', auth, authController.getUserPermissions);


module.exports = router;