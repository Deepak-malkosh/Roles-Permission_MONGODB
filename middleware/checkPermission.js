
const helper = require('../helpers/helper');

const checkPermission = async (req, res, next) =>{
    try {

        if(req.user.role != 1){  //if user not admin


           const routerPermission = await helper.getRouterPermission(req.path, req.user.role);

           if(!routerPermission){

            return res.status(400).json({
                success:false,
                msg:"You haven't permission to access this route!"
            });

           }

        }


        return next();
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:'something went wrong'
        });
    }
}



module.exports = checkPermission;