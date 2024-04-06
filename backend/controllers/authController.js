const authController = require("express").Router();
const User = require("../models/User"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

// Register
authController.post("/register", async (req, res) => {
    try {

        const isExhisting = await User.findOne({email: req.body.email});  //it is to see the user is already exhist or not 
        if(isExhisting){
            throw new Error("User already exhist");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); //it is to hash the password

        const newUser = await User.create({email:req.body.email,username: req.body.username, password: hashedPassword}); //it is to create a new user
        const {password, ...others} = newUser._doc; //it is to hide the password
        const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: "3d"}); //it is to create a token   
        
        return res.status(201).json({others, token}); //it is to send the response
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

// Login




module.exports = authController; //it is to export the authController
