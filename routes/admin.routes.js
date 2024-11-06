const express = require('express');
const router = express();

const { permissionAddValidator } = require('../helpers/adminValidator');

const permissionController = require('../controller/admin/permissionController');

router.post('/add-permission', permissionAddValidator, permissionController.addPermission)


module.exports = router