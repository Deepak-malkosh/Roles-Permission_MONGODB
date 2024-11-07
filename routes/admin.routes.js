const express = require('express');
const router = express();

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator} = require('../helpers/adminValidator');

const auth  = require('../middleware/auth');

const permissionController = require('../controller/admin/permissionController');


//permission routes
router.post('/add-permission', auth, permissionAddValidator, permissionController.addPermission)
router.get('/get-permission', auth, permissionController.getPermissions);
router.delete('/delete-permission', auth, permissionDeleteValidator, permissionController.deletePermission)
router.put('/update-permission', auth, permissionUpdateValidator, permissionController.updatePermission)




module.exports = router