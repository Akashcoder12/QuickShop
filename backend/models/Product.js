const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    image:{
         type:String,
         default:"https://via.placeholder.com/150",
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
        default:0,
    },
 },
  
 {
    timestamps:true
 }

);

module.exports=mongoose.model("Product",productSchema);