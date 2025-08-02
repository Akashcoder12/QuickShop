const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");

const registerUser=async (req,res)=>{
    try{
        const {name,email,password,isAdmin}=req.body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create new user
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            isAdmin

        });

        //create jwt token

        const token=jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });

        res.status(201).json({
            message:"User registered successfully",
            user:{
                 id:newUser._id,
                 name:newUser.name,
                 email:newUser.email,
                 isAdmin:newUser.isAdmin
            },
            token,
        });
    }catch(error){
        res.status(500).json({message:"Registration failed",error:error.message});
    }
};

const loginUser=async (req,res)=>{
     try{
        const {email,password}=req.body;

        //check if user exists
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //check password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        };

        //create jwt
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });

        res.status(200).json({
            message:"Login successful",
            user:{
                 id:user._id,
                 name:user.name,
                 email:user.email,
                 isAdmin:user.isAdmin,
            },
            token,
        })
     }catch(error){
        res.status(500).json({message:"Login failed",error:error.message});
     }
};

module.exports={registerUser,loginUser};