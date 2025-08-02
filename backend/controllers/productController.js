const Product=require("../models/Product");

const createProduct=async(req,res)=>{
     
    try{
        const {name,description,price,image,category,stock}=req.body;

        const newProduct=await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock,

        });
        res.status(201).json({message:"Product created",product:newProduct});
    }
    catch(error){
        res.status(500).json({message:"Product creation failed",error:error.message});
    }
};

//get all products

const getAllProducts=async (req,res)=>{
     try{
        const products=await Product.find({});
        res.status(200).json({products});
     }
     catch(error){
        res.status(500).json({message:"Failed to fetch products",error:error.message});
     }
};

//product by id
const getProductById=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({product});
    }
    catch(error){
        res.status(500).json({message:"Failed to fetch product",error:error.message});
    }
};

//update product 

const updateProduct=async(req,res)=>{
     try{
         const updated=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
         });
         if(!updated){
            return res.status(404).json({message:"Product not found"});
         }
         res.status(200).json({message:"Product updated",product:updated});
       }
       catch(error){
        res.status(500).json({message:"Updated failed",error:error.message});
       }
     };

// delete product
     const deleteProduct=async(req,res)=>{
         try{
             const deleted =await Product.findByIdAndDelete(req.params.id);

             if(!deleted){
                return res.status(404).json({message:"Product not found"});
             }

             res.status(200).json({message:"Product deleted"});
         }
         catch(error){
            res.status(500).json({message:"Delete failed",error:error.message});
         }
     };

     module.exports={
        createProduct,
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProduct,
     };
