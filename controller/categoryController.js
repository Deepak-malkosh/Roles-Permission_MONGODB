const Category = require('../models/categoryModel');

const { validationResult } = require('express-validator');



const addCategory = async (req, res) =>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { category_name } = req.body;

        const isCategoryExist = await Category.findOne({
            
            name:{
                $regex: category_name,
                $options: 'i' 
            }
        });

        if(isCategoryExist){
            return res.status(400).json({
                success:false,
                msg:`${category_name} category is already exist`
            });
        }


        const category = new Category({
            name : category_name
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success:true,
            msg:'Category Created Successfully!',
            data:categoryData
        }); 
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


const getCategory = async (req, res) =>{

    try {

        const categoryData = await Category.find({});

        return res.status(200).json({
            success:true,
            msg:'Categories Fetch Successfully',
            data:categoryData
        })  
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


const deleteCategory = async (req, res) =>{

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

        const categoryData = await Category.findOne({ _id : id});

        if(!categoryData){
            return res.status(400).json({
                success:false,
                msg:'Category id does not exist'
            })
        }

        await Category.findByIdAndDelete({ _id : id});

        return res.status(200).json({
            success:true,
            msg:'Categories Deleted Successfully',
            data:categoryData
        })  
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


const updateCategory = async (req, res) =>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { id, category_name } = req.body;

        const isIdExists = await Category.findOne({ _id : id});

        if(!isIdExists){
            return res.status(400).json({
                success:false,
                msg:'Category id does not exist'
            })
        }


        const isCategoryNameExist = await Category.findOne({
            _id:{ $ne : id },
            name:{
                $regex: category_name,
                $options: 'i' 
            }
        });

        if(isCategoryNameExist){
            return res.status(400).json({
                success:false,
                msg:`${category_name} category is already exist`
            });
        }        


        const updatedCategory = await Category.findByIdAndUpdate({ _id : id},{
            $set:{
                name:category_name
            }
        }, { new : true});

        return res.status(200).json({
            success:true,
            msg:'Categories Update Successfully',
            data:updatedCategory
        })  
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}

module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}