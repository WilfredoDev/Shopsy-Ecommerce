const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');
const Customer = require('../db/models/customer.model')


const register = async(req, res, next) =>{
    const {firstName,lastname, email, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastname,
            email,
            password: hashedPassword
        });
        await newUser.save();

        const newCustomer = new Customer({
            firstName,
            lastname,
            email,
            userId: newUser._id
        });
        await newCustomer.save();
        res.status(201).json({message: 'Registration successful', data: newUser});
    }catch(error){
        next(error);
    }
};

const login = async(req, res, next)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({result:false, message:'Invalid Credentials'});
        
        const passwordMatch = await await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.status(404).json({message:'Invalid password'});

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        res.status(200).json({result:true,token:token, user:user});
    }catch(error){
        next(error);
    }
};

module.exports = {register, login};