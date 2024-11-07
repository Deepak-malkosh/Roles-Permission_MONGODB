const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const registerUser = async (req, res) =>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const {name, email, password} = req.body;

        const isUserExist = await User.findOne({email:email});
        if(isUserExist){
            return res.status(200).json({
                success:false,
                msg:'Email already exists',
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
            msg:"User Registered Successfully",
            data:userData
        })


        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}


const generateToken = async (user) =>{
    
    const Token = jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn:'3h'});
    return Token;
}


const loginUser = async (req, res) =>{

    try {

        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(200).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { email, password } = req.body

        const userData = await User.findOne({email : email})
        
        if(!userData){
            return res.status(400).json({
                success:false,
                msg:'Email & Password are incorrect'
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, userData.password);

        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                msg:'Email & Password are incorrect'
            });
        }


        const accessToken = await generateToken({user: userData});

        return res.status(200).json({
            success:true,
            msg:'Login Successfully!',
            token:accessToken,
            tokenType:'Bearer',
            data:userData,
        });


    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        }) 
    }
}


const getProfile = async (req, res) =>{

    try {

        const user_id = req.user._id;
        const userData = await User.findOne({ _id: user_id});


        return res.status(200).json({
            success:true,
            msg:'Profile Data',
            data:userData
        }) 
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        }) 
    }
}


module.exports = {
    registerUser,
    loginUser,
    getProfile
}