const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) =>{

    const token = req.body.token || req.query.token || req.headers["authorizarion"];

    if(!token){

        return res.status(403).json({
            success:false,
            msg:'A token is required for authentication'
        });
    }

    try {
        
        const bearer = token.split(' ');
        const bearerToken = bearer[1];

        const decode = jwt.verify(bearerToken, process.env.SECRET_TOKEN);

        req.user = decode.user;

    } catch (error) {
        return res.status(400).json({
            success:false,
            msg:'Invalid Token!'
        });
    }

    return next();
}




module.exports = verifyToken