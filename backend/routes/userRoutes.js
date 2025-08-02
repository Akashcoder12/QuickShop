const express=require("express");
const router=express.Router();
const {registerUser,loginUser}=require('../controllers/userController');
const {protect,admin}=require("../middleware/auth");

//Post /api/register
router.post("/register",registerUser);

//Post /api/login
router.post("/login",loginUser);

router.get("/profile",protect,(req,res)=>{
    res.status(200).json({
        message:"Profile accessed",
        user:req.user,
    });
})

module.exports=router;