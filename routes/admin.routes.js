const express = require('express');
const router = express();

const auth = require('../middleware/auth')

const { permissionAddValidator} = require('../helpers/adminValidator');

const permissionController = require('../controller/admin/permissionController');


router.post('/add-permission',auth, permissionAddValidator, permissionController.addPermission);


module.exports = router;