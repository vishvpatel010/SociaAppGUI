require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const PostScehma = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        max:500,
    },
    img:{
        type: String
    },
    likes:{
        type: Array,
        default:[]
    }
},
{timestamps: true});

module.exports = new mongoose.model("Post", PostScehma);