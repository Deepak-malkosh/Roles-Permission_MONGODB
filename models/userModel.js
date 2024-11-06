const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default: 0  // 0 -> Normal user, 1 -> Admin, 2 -> Sub-Admion, 3 -> editor
    }

});


module.exports = mongoose.model("User", userSchema);

