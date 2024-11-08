const express = require('express');
const router = express();

const auth  = require('../middleware/auth');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator,
    storeRoleValidator   } = require('../helpers/adminValidator');

const  { onlyAdminAccessed }  = require('../middleware/adminMiddleware');

const permissionController = require('../controller/admin/permissionController');


const roleController = require('../controller/admin/roleController');


//permission routes
router.post('/add-permission', auth, onlyAdminAccessed, permissionAddValidator, permissionController.addPermission)
router.get('/get-permission', auth, onlyAdminAccessed, permissionController.getPermissions);
router.delete('/delete-permission', auth, onlyAdminAccessed, permissionDeleteValidator, permissionController.deletePermission)
router.put('/update-permission', auth, onlyAdminAccessed, permissionUpdateValidator, permissionController.updatePermission)


//role routes
router.post('/store-role', auth, onlyAdminAccessed, storeRoleValidator, roleController.storeRole)
router.get('/get-role', auth, onlyAdminAccessed, roleController.getRole);




module.exports = router