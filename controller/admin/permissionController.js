const Permission = require('../../models/permission.models')

const { validationResult } = require('express-validator');


const addPermission = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Errors',
               errors:errors.array()
           });
        }

        const { permission_name } = req.body;

        const isPermissionExist = await Permission.findOne({ permission_name : permission_name });
        if(isPermissionExist){
            return res.status(400).json({
                success:false,
                msg:"Permission name is already exist"
            });
        }

        var obj = {
            permission_name
        };

        if(req.body.default){
            obj.is_default = parseInt(req.body.default);
        }


        const permission = new Permission( obj );

        const newPermission = await permission.save();

        return res.status(200).json({
            success:true,
            msg:"Permission added successfully !",
            data:newPermission
        });
        
    } catch (error) {
            return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}



module.exports = {
    addPermission
}