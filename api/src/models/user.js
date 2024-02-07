require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const UserScehma = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        unique: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        max: 50
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error('Invalid Email');
        //     }
        // }
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max:55
    },
    profilePicture:{
        type: String,
        default: '',
    },
    coverPicture:{
        type: String,
        default: '',
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 100,
    },
    city:{
        type: String,
        max: 30,
    },
    from:{
        type: String,
        max: 30,
    },
    relationship:{
        type: Number,
        enum: [1,2,3]
    }
},
{timestamps: true});

module.exports = new mongoose.model("User", UserScehma);