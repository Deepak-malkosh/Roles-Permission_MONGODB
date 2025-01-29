const Category = require('../models/category.models');

const { validationResult } = require('express-validator');


const addCategory = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Errors',
               errors:errors.array()
           });
        }

        const { category_name } = req.body;
 
        const isCatExists = await Category.findOne({
            name:{
                $regex: category_name,  // check category in small and capital letter
                $options : 'i'
            }
        });

        if(isCatExists){
            return res.status(400).json({
                success:false,
                msg:'Category already exists!',
            });
        }

        const category = new Category({
            name : category_name
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success:true,
            msg:'Category created Successafully!',
            data:categoryData
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}


const getCategories = async (req, res) =>{
    try {

        const categories = await Category.find({});

        return res.status(200).json({
            success:true,
            msg:'Category fetched Successafully!',
            data:categories
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}



const deleteCategory = async (req, res) =>{
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

        const isCatExists = await Category.findOne({ _id : id});
        if(!isCatExists){
            return res.status(200).json({
                success:false,
                msg:"Category id doesn't exists!"
            });
        }

        await Category.findByIdAndDelete({ _id : id});

        return res.status(200).json({
            success:true,
            msg:'Category deleted Successafully!',
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}


const updateCategory = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Errors',
               errors:errors.array()
           });
        }

        const { id, category_name } = req.body;

        const isCatExists = await Category.findOne({ _id : id });
        if(!isCatExists){
            return res.status(200).json({
                success:false,
                msg:"Category id doesn't exists!"
            });
        }

        const isExists = await Category.findOne({
            _id : { $ne : id},
            name: {
                $regex:category_name,
                $options:'i'
            }
        });

        if(isExists){
            return res.status(400).json({
                success:false,
                msg:'Category name is already assigned to another category!',
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate({_id:id},{
            $set:{
                name:category_name
            }
        },{new : true});

        return res.status(200).json({
            success:true,
            msg:'Category update Successafully!',
            data:updatedCategory
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

module.exports = {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory
}