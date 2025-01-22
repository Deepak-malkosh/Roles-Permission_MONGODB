const express = require('express');
const router = express();

const auth = require('../middleware/auth')

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator} = require('../helpers/adminValidator');

const permissionController = require('../controller/admin/permissionController');


router.post('/add-permission',auth, permissionAddValidator, permissionController.addPermission);

router.get('/get-permission',auth, permissionController.getPermissions);

router.put('/update-permission',auth, permissionUpdateValidator, permissionController.updatePermission);

router.delete('/delete-permission',auth, permissionDeleteValidator, permissionController.deletePermission);



module.exports = router;