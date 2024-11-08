const User = require('../models/userModel');

const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const createUser = async (req, res) =>{

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                msg:'Errors',
                errors:errors.array()
            });
        }

        const { name, email } = req.body;

        const isUserExists = await User.findOne({ email : email});
        if(isUserExists){
            return res.status(400).json({
                success:false,
                msg:"Email is already Exists",
            });
        }


        const password = randomstring.generate(6);
        const hashPassword = await bcrypt.hash(password, 10);

        var userObj = {
            name : name,
            email : email,
            password : hashPassword
        }

        if(req.body.role && req.body.role == 1){
            return res.status(400).json({
                success:false,
                msg:"You can't create Admin",
            });
        }
        else if(req.body.role){
            userObj.role = req.body.role;
        }

        const user = new User( userObj );

        const userData = await user.save();

        console.log("password===>",password);
        return res.status(200).json({
            success:true,
            msg:"User Created Successfully",
            data:userData
        });

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:error.message
        })
    }
}





module.exports = {
    createUser,
}