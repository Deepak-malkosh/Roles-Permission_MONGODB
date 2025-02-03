const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { onlyAdminCanAccess } = require('../middleware/adminMiddleware');

const { permissionAddValidator, permissionDeleteValidator, permissionUpdateValidator, storeRoleValidator} = require('../helpers/adminValidator');

const permissionController = require('../controller/admin/permissionController');

const roleController = require('../controller/admin/roleController');

const routerController = require('../controller/admin/routerController')

// admin Routes
router.post('/add-permission',auth, onlyAdminCanAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permission',auth, onlyAdminCanAccess, permissionController.getPermissions);
router.put('/update-permission',auth, onlyAdminCanAccess, permissionUpdateValidator, permissionController.updatePermission);
router.delete('/delete-permission',auth, onlyAdminCanAccess, permissionDeleteValidator, permissionController.deletePermission);



//role Routes
router.post('/store-role',auth, onlyAdminCanAccess, storeRoleValidator, roleController.storeRole);
router.get('/get-roles',auth, onlyAdminCanAccess, roleController.getRoles);


// router.get('/all-routes', auth, onlyAdminCanAccess, routerController.getAllRoutes);

module.exports = router;