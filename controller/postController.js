const Post = require('../models/post.models');

const { validationResult } = require('express-validator');


const createPost = async (req, res) =>{
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Validation errors',
               errors:errors.array()
           });
        }

        const { title, description } = req.body;

        var postObj = {
            title,
            description
        }

        if(req.body.categories){
            postObj.categories = req.body.categories
        }

        const post =  new Post(postObj);

        const postData = await post.save();

        const postFullData = await Post.findOne({ _id : postData._id }).populate('categories')

        return res.status(200).json({
            success:true,
            msg:'Post Created Successfully !!',
            data:postFullData
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}


const getPosts = async (req, res) => {
    try {

        const posts = await Post.find({}).populate('categories');

        return res.status(200).json({
            success:true,
            msg:'Post Fetched Successfully !!',
            data:posts
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}



const updatePost = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Validation errors',
               errors:errors.array()
           });
        }

        const { id, title, description } = req.body;

        const isPostExists = await Post.findOne({ _id : id });
        if(!isPostExists){
            return res.status(400).json({
                success:false,
                msg:"Post doesn't exists !"
            });
        } 
        
        const updatedObj = {
            title,
            description
        }

        if(req.body.categories){
            updatedObj.categories = req.body.categories
        }


        const updatedPost = await Post.findByIdAndUpdate({_id:id},{
            $set:updatedObj
        },{ new : true});

        return res.status(200).json({
            success:true,
            msg:'Post Update Successfully !!',
            data:updatedPost
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:"Post doesn't exist"
        });
    }
}



const deletePost = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Validation errors',
               errors:errors.array()
           });
        }

        const { id } = req.body;

        const isPostExists = await Post.findOne({ _id : id });
        if(!isPostExists){
            return res.status(400).json({
                success:false,
                msg:"Post doesn't exists !"
            });
        }

        const deletedPost = await Post.findByIdAndDelete({ _id : id });

        return res.status(200).json({
            success:true,
            msg:'Post Deleted Successfully !!',
            data:deletedPost
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:"Post doesn't exist"
        });
    }
}



module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}