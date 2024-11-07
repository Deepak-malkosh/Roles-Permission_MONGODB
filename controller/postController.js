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

module.exports = {
    addPost,
    getPosts
}