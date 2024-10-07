const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';

const userData = require('../backend/schemas/usersignup');

const dbURL = "mongodb+srv://alienshooternp:herecomesthepain12@nodetesting.ljo8jbk.mongodb.net/mern?retryWrites=true&w=majority";

const app = express();
app.use(express.json());  // This parses JSON data from incoming requests
app.use(express.urlencoded({ extended: true }));// Middleware to parse URL-encoded data (form submissions)
app.use(cors());

mongoose.connect(dbURL).then(()=>{
    app.listen(5000);
    console.log("Server Created");
    console.log("Connected to the database");
});

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.post('/signup',async(req,res)=>{
    console.log("Request sent");

    try{
    const { username,email,password, profilePicture } = req.body;

    const existingEmail = await userData.findOne({email});

    if(existingEmail){
        console.log("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new userData({
        username,
        email,
        password: hashedPassword,
        profilePicture // optional profile picture
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
    
}catch(error){
    console.log(error);
    res.status(500).json({ message: 'Server error' });
}
});

app.post('/login',async(req,res)=>{

    try{
    const {email , password} = req.body;
    const user = await userData.findOne({email});
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log('invaid password');
      return res.status(400).json({ message: 'Invalid password' });
    }

    console.log("Logged in");

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });

    }catch(err){
        console.log(err);
    }
})