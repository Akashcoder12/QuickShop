const mongoose=require("mongoose");
const Cart=require("../models/Cart");

//Add to cart
const addToCart = async (req, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  console.log("UserID:", userId);
  console.log("ProductID:", productId);
  console.log("Quantity:", quantity);

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};


//get user's cart

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ cart: [] }); // Return empty cart if not found
    }
    
    console.log("cart:",cart);
    return res.status(200).json({ cart }); // ✅ Return cart if found
  } catch (error) {
    res.status(500).json({ message: "Failed to get cart", error: error.message });
  }
};


//update quantity
const updateCartItem=async(req,res)=>{
    const {productId,quantity}=req.body;
    const userId = req.user?._id;

     console.log("UserID:", userId);
     console.log("ProductID:", productId);
     console.log("Quantity:", quantity);

    try{
        const cart=await Cart.findOne({userId:req.user._id});

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }

        const item=cart.items.find(
            (item)=>item.productId.toString()===productId
        );

        if(item){
            item.quantity=quantity;
            await cart.save();
            res.status(200).json({message:"Quantity updated",cart});

        }
        else{
            res.status(404).json({
                message:"Item not in cart"
            });
        }
    }

    catch(error){
        res.status(500).json({
            message:"Update failed",
            error:error.message
        });
    }
}

//remove item
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1; // reduce quantity by 1
    } else {
      cart.items.splice(itemIndex, 1); // remove item entirely
    }

    await cart.save();

    res.status(200).json({ message: "Item quantity updated or removed", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Remove failed", error: error.message });
  }
};




module.exports={
     addToCart,
     getCart,
     updateCartItem,
     removeFromCart,
};