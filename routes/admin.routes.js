const express = require('express');
const router = express();

const auth  = require('../middleware/auth');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator} = require('../helpers/adminValidator');

const  { onlyAdminAccessed }  = require('../middleware/adminMiddleware');

const permissionController = require('../controller/admin/permissionController');


//permission routes
router.post('/add-permission', auth, onlyAdminAccessed, permissionAddValidator, permissionController.addPermission)
router.get('/get-permission', auth, onlyAdminAccessed, permissionController.getPermissions);
router.delete('/delete-permission', auth, onlyAdminAccessed, permissionDeleteValidator, permissionController.deletePermission)
router.put('/update-permission', auth, onlyAdminAccessed, permissionUpdateValidator, permissionController.updatePermission)




module.exports = router