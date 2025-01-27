const express = require('express');
const router = express();

const auth = require('../middleware/auth');

const { onlyAdminCanAccess } = require('../middleware/adminMiddleware');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator} = require('../helpers/adminValidator');

const permissionController = require('../controller/admin/permissionController');


// admin Routes
router.post('/add-permission',auth, onlyAdminCanAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission',auth, onlyAdminCanAccess, permissionController.getPermissions);
router.put('/update-permission',auth, onlyAdminCanAccess, permissionUpdateValidator, permissionController.updatePermission);
router.delete('/delete-permission',auth, onlyAdminCanAccess, permissionDeleteValidator, permissionController.deletePermission);



module.exports = router;