const Order=require("../models/Order");
const Cart=require("../models/Cart");

//Place Order
const PlaceOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // 🟢 Populate product details (including price)
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Calculate total using populated productId.price
    const totalAmount = cart.items.reduce((sum, item) => {
      if (!item.productId || typeof item.productId.price !== 'number') {
        throw new Error("Missing product price during order calculation");
      }

      return sum + item.quantity * item.productId.price;
    }, 0);

    // ✅ Create order with productId and quantity only
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
    });

    // ✅ Clear cart after order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed", order });

  } catch (error) {
    res.status(500).json({ message: "Order failed", error: error.message });
  }
};



//get current user's orders

const getMyOrders=async(req,res)=>{

    try{
        const orders=await Order.find({userId:req.user._id}).sort("-createdAt");
        res.status(200).json({orders});
    }
    catch(error){
        res.status(500).json({message:"Could not fetch orders",error:error.message});
    }
};

//get all orders (admin only)

const getAllOrders=async (req,res)=>{
     try{
        const orders=await Order.find({})
        .populate("userId","name email")
        .sort("-createdAt");
        
        res.status(200).json({orders});
     }catch(error){

         res.status(500).json({message:"Failed to fetch all orders",error:error.message});
     }

};


//update order status (admin only)

const updateOrderStatus=async(req,res)=>{

    const {orderId,status}=req.body;

    try{
        const order=await Order.findById(orderId);

        if(!order){
             return res.status(404).json({message:"Order not found"});
        }

        order.status=status;
        await order.save();

        res.status(200).json({message:"Order status updated",order});
    }
    catch(error){
         res.status(500).json({message:"Status update failed",error:error.message});
    }
}


module.exports={
     PlaceOrder,
     getMyOrders,
     getAllOrders,
     updateOrderStatus,
};