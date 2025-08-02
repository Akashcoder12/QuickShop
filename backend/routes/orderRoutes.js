const express=require("express");
const router=express.Router();
const { protect, admin } = require("../middleware/auth");

const {
    PlaceOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
     }=require("../controllers/orderController");

router.use(protect);

//user routes
router.post("/",PlaceOrder);
router.get("/",getMyOrders);

//admin routes
router.get("/admin/all",admin,getAllOrders);
router.put("/admin/update-status",admin,updateOrderStatus);


module.exports=router;