const Post = require('../models/postModel');

const { validationResult } = require('express-validator');



const addPost = async (req, res) =>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { title, description } = req.body;

        var postObj = {
            title : title,
            description : description
        }

        if(req.body.categories){
            postObj.categories = req.body.categories
        }

        const post = new Post( postObj );

        const postData = await post.save();

        const fullPostData = await Post.findOne({ _id: postData._id }).populate('categories');

        return res.status(200).json({
            success:true,
            msg:'Post Created Successfully!',
            data:fullPostData
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}



const getPosts = async (req, res) =>{

    try {
        
        const postData = await Post.find({ }).populate('categories');

        return res.status(200).json({
            success:true,
            msg:'Post Fetched Successfully!',
            data:postData
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


const deletePost = async (req, res) =>{

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

        const isPostExist = await Post.findOne({ _id : id});
        if(!isPostExist){
            return res.status(400).json({
                success:false,
                msg:'Post does not Exist!',
            });
        }

        await Post.findByIdAndDelete({ _id:id });

        return res.status(200).json({
            success:true,
            msg:'Post Delete Successfully!',
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


const updatePost = async (req, res) =>{

    try {
        
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { id, title, description } = req.body;

        const isPostIdExist = await Post.findOne({ _id : id});
        if(!isPostIdExist){
            return res.status(400).json({
                success:false,
                msg:'Post does not Exist!',
            });
        }

        const updateObj = {
            title : title,
            description : description
        }

        if(req.body.categories){
            updateObj.categories = req.body.categories
        }

        const updatePostData = await Post.findByIdAndUpdate({ _id:id}, {
            $set: updateObj
        }, { new : true });


        return res.status(200).json({
            success:true,
            msg:'Post Updated Successfully!',
            data:updatePostData
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


module.exports = {
    addPost,
    getPosts,
    deletePost,
    updatePost
}