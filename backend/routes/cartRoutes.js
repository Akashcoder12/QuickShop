const express=require("express");
const router=express.Router();
const {protect,admin}=require("../middleware/auth");

const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,

}=require("../controllers/cartController");

router.use(protect);

router.post("/add",addToCart);
router.get("/",getCart);
router.put("/update",updateCartItem);
router.delete("/remove/:productId", removeFromCart);


module.exports=router;