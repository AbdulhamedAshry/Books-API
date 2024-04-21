const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username must be provided!'],
    },
    email:{
        type: String,
        required: [true, 'Email must be provided!'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a vaild email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password must be provided!'],
        minlength:6,
    },
});

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 

userSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
};

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(this.password, password);
    return isMatch; 
};

module.exports = mongoose.model('user', userSchema);