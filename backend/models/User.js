const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter your name"],
        },

        email:{
             type:String,
             required:[true,"Please enter your email"],
             unique:true,
             match:[
                 /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                 "Please add a valid email",
             ],
        },

        password:{
            type:String,
            required:[true,"Please enter a password"],
            minlength:6,
        },
        isAdmin:{
             type:Boolean,
             default:false,
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("User",userSchema);