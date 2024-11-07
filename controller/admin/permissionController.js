const Permission = require('../../models/permissionModel');

const { validationResult } = require('express-validator');

const addPermission = async (req, res) =>{

    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { permission_name } = req.body;

        const isExists = await Permission.findOne({ permission_name : permission_name});
        if(isExists){
            return res.status(400).json({
                success:false,
                msg:"Permission name is already exist"
            })
        }


        var obj = {
            permission_name:permission_name
        }

        if(req.body.default != null){
            obj.is_default = req.body.default
        }

        const permission = new Permission(obj);

        const new_permission = await permission.save();

        return res.status(200).json({
            success:true,
            msg:'Permission added Successfully',
            data:new_permission
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        }) 
    }
}


const getPermissions = async (req, res) =>{

    try {
        
        const permissionData = await Permission.find({});

        return res.status(200).json({
            success:true,
            msg:'Permissions Fetch Successfully',
            data:permissionData
        })  

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        }) 
    }
}


const deletePermission = async (req, res) =>{

    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { id } = req.body;

        const permissionData = await Permission.findByIdAndDelete({ _id : id});

        return res.status(200).json({
            success:true,
            msg:'Permissions Delete Successfully',
            data:permissionData
        }); 

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        }) 
    }
}



const updatePermission = async (req, res) =>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { id, permission_name} = req.body;

        const isIDExist = await Permission.findOne({ _id:id});

        if(!isIDExist){
            return res.status(400).json({
                success:false,
                msg:"Permission Id not found"
            });
        }


        // Check if the permission name is already assigned to a different permission
        const isNameAssigned = await Permission.findOne({
            permission_name,
            _id: { $ne: id } 
        });   
        
        if (isNameAssigned) {
            return res.status(400).json({
                success: false,
                msg: "Permission name is already assigned to another permission"
            });
        }

        var updatePermissionObj = {
            permission_name:permission_name
        }

        // if('default' in req.body){
        //     updatePermissionObj.is_default = req.body.default
        // }

        if(req.body.default != null){
            updatePermissionObj.is_default = req.body.default
        }

        const updatedPermission = await Permission.findByIdAndUpdate({ _id:id},{
            $set:updatePermissionObj
        },{ new:true});

        return res.status(200).json({
            success:true,
            msg:'Permission Updated Successfully!',
            data:updatedPermission
        })

    } catch (error) {
            return res.status(400).json({
                success:false,
                msg:error.message
            }) 
        
    }
}

module.exports = {
    addPermission,
    getPermissions,
    deletePermission,
    updatePermission
}