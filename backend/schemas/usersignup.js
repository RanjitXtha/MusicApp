const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Username Required'],
        unique:true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Email Required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    },
    profilePic:{
        type: String, 
        default: ''    
    }
},{timestamps:true});

module.exports = mongoose.model('userData',userSchema);
