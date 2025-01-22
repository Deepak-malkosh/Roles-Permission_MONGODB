const User = require('../models/user.models');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const registerUser = async (req, res) =>{

    try {

         const errors = validationResult(req);
         if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
         }

         const {name, email, password} = req.body;

         const isUserExist = await User.findOne({ email});
         if(isUserExist){
            return res.status(400).json({
                success:false,
                msg:'Email already exist!'
            });
         }

         const hashPassword = await bcrypt.hash(password, 10);

         const user = new User({
            name,
            email,
            password:hashPassword
         });

         const userData = await user.save();

         return res.status(200).json({
            success:true,
            msg:'Registered Successfully!',
            data:userData
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}

const generateToken = async (user) =>{
    const token = jwt.sign(user, process.env.ACCESS_SECRETE_KEY, { expiresIn:"5h"});
    return token;
}



const loginUser = async (req, res) =>{
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return res.status(400).json({
               success:false,
               msg:'Errors',
               errors:errors.array()
           });
        }   
        
        const {email, password} = req.body;

        const userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({
                success:false,
                msg:'Email & password are not matched !'
            });
        }

        const isPassMatched = await bcrypt.compare(password, userData.password);
        if(!isPassMatched){
            return res.status(400).json({
                success:false,
                msg:'Email & password are not matched !'
            });
        }   

        const accessToken = await generateToken({user:userData});

        return res.status(200).json({
            success:true,
            msg:'Login Successfully !',
            accessToken: accessToken,
            tokenType:'Bearer',
            data:userData
        });
        
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}


const getProfile = async (req, res) =>{

    try {

        const user_id = req.user._id;

        const userData = await User.findOne({ _id : user_id});

        return res.status(200).json({
            success:true,
            msg: 'User Profile data',
            data:userData
        });
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfile
}