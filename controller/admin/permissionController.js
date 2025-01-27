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

        const isPermissionExist = await Permission.findOne({ 
            permission_name:{
                $regex : permission_name,
                $options : 'i'
            }
         });

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


const getPermissions = async (req, res) =>{
    try {

        const permissions = await Permission.find({});

        return res.status(200).json({
            success:true,
            msg:'Permissions fetch successfully !',
            data:permissions
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}


const deletePermission = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Errors',
               errors:errors.array()
           });
        }

        const { id } = req.body;

        const deletePermission = await Permission.findByIdAndDelete({ _id : id });

        return res.status(200).json({
            success:true,
            msg:'Permission Deleted Successfully !'
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}



const updatePermission = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Errors',
               errors:errors.array()
           });
        }

        const { id, permission_name } = req.body;

        const isPermissionExists = await Permission.findOne({ _id : id});
        if(!isPermissionExists){
            return res.status(400).json({
                success:false,
                msg:'Permissions ID not found!'
            });
        }

        const isPer_NameExists = await Permission.findOne({
            _id : { $ne : id},
            permission_name:{
                $regex : permission_name,
                $options : 'i'
            }
        });

        if(isPer_NameExists){
            return res.status(400).json({
                success:false,
                msg:'Permissions name is already assign to anther permission!'
            });
        }

        const updatePermission = {
            permission_name
        }

        if(req.body.default != null){
            updatePermission.is_default = parseInt(req.body.default);
        }

        const updatedPermissionData = await Permission.findByIdAndUpdate({ _id:id},{
            $set: updatePermission
        },{ new : true});

        return res.status(200).json({
            success:true,
            msg:'Permission Updated Successfully !',
            data:updatedPermissionData
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}



module.exports = {
    addPermission,
    getPermissions,
    deletePermission,
    updatePermission
}