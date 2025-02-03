const mongoose = require('mongoose');

const routerPermissionSchema = new mongoose.Schema({

    router_endpoint:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0 
    },
    permission:{
        type:Number,
        required:true
    }
});


module.exports = mongoose.model('RouterPermissionSchema',routerPermissionSchema);