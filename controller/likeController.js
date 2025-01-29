const Like = require('../models/like.models');

const { validationResult } = require('express-validator');


const postLike = async (req, res) =>{
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Validation errors',
               errors:errors.array()
           });
        }

        const { user_id, post_id } = req.body;

        const isLiked = await Like.findOne({
            user_id,
            post_id
        });

        if(isLiked){
            return res.status(400).json({
                success:false,
                msg:'Already Liked !'
            })
        }


        const like = new Like({
            user_id,
            post_id
        });

        const likedData = await like.save();

        return res.status(200).json({
            success:true,
            msg:'Post Like Successfully !!',
            data:likedData
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });  
    }
}



const postUnLike = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Validation errors',
               errors:errors.array()
           });
        }

        const { user_id, post_id } = req.body;

        const isLiked = await Like.findOne({
            user_id,
            post_id
        });

        if(!isLiked){
            return res.status(400).json({
                success:false,
                msg:'Not liked this post !'
            })
        }

        await Like.deleteOne({
            user_id,
            post_id
        });

        return res.status(200).json({
            success:true,
            msg:'Post UnLike !!',
        });

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });  
    }
}



const postLikeCount = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Validation errors',
               errors:errors.array()
           });
        }

        const { post_id } = req.body;

        const likeCount = await Like.findOne({ post_id }).countDocuments();

        return res.status(200).json({
            success:true,
            msg:'Post Like count!!',
            count:likeCount
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });  
    }
}


module.exports = {
    postLike,
    postUnLike,
    postLikeCount
}