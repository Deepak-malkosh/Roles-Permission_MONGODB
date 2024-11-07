const { check } = require('express-validator');

exports.permissionAddValidator = [
    
    check('permission_name', 'Permission name is required').not().isEmpty(),
   
];

exports.permissionDeleteValidator = [
    
    check('id', 'Id is required').not().isEmpty(),
   
];

exports.permissionUpdateValidator = [
    
    check('id', 'Id is required').not().isEmpty(),
    check('permission_name', 'Permission name is required').not().isEmpty(),
   
];

 