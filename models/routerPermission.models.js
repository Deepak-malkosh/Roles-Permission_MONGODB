const mongoose = require('mongoose');

const routerPermissionSchema = new mongoose.Schema({

    router_endpoint:{
        type:String,
        required:true
    },
    role:{  // 0,1,2,3
        type:Number,
        default:0 
    },
    permission_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Permission'
    },
    permission:{
        type:Array, // 0,1,2,3
        required:true
    }
});


module.exports = mongoose.model('RouterPermissionSchema',routerPermissionSchema);