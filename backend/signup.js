const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



/*
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if password is modified
  
    const salt = await bcrypt.genSalt(10); // Salt generation
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  });*/