const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const {CustomAPIError} = require('../errors/customapierror');


const register = async (req, res) => {
const user = await User.create({...req.body});
const token = user.createJWT(); 

res.status(StatusCodes.CREATED).json({name: user.username, token});
};

const login = async (req, res) => {
    //validating inputs
    const {email, password} = req.body;
    if(!email || !password){
        throw new CustomAPIError('Email & Password Must be provided!');
    };
    //validating user
    const user = await User.findOne({email});
    if(!user){
        throw new CustomAPIError('Invalid');
    };
    
    //compare passwords
    const isPasswordCorrect = user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomAPIError('Invalid password!');
    };

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({name: {name: user.username}, token});

};

module.exports = {register, login};