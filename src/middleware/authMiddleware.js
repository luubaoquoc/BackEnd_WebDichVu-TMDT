const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {

    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN,(err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'The authemtication token is invalid or expired',
            });
        }
        
        if(user.isAdmin){
            next();
        }else{
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to perform this action',
            });
        }
        
    
    });
}
const authUserMiddleware = (req, res, next) => {

    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN,(err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'The authemtication token is invalid or expired',
            });
        }
        
        if(user.isAdmin || user.id === userId){
            next();
        }else{
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to perform this action',
            });
        }
        
    
    });
}


module.exports = {
    authMiddleware,
    authUserMiddleware
}