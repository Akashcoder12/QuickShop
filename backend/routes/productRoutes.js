const express=require("express");
const { protect, admin } = require("../middleware/auth");
const router=express.Router();
const {
   createProduct,
   getAllProducts,
   getProductById,
   updateProduct,
   deleteProduct,
}=require("../controllers/productController"); 


//public routes
router.get("/",getAllProducts);
router.get("/:id",getProductById);

//protected routes

router.post("/",protect,admin,createProduct);
router.put("/:id",protect,admin,updateProduct);
router.delete("/:id",protect,admin,deleteProduct);

module.exports=router;