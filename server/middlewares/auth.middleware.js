const jwt = require('jsonwebtoken');
const User = require('../db/models/user.model');

const authenticate = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').split(' ')[1];
        if(!token){
            res.status(403).json({message: 'Unauthorized'})
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.userId);
        if(!user) return res.status(404).json({message:'user not Found'})
        req.user = user;
        next();
    }catch(error){
        res.status(403).json({message: 'Unauthorized'})
    }
}

module.exports = {authenticate}