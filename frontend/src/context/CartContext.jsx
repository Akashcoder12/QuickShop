import React, { useState,useEffect,useContext,createContext} from 'react';

import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
} from '../api/CartApi'


export const CartContext = createContext();
export const useCart = () => useContext(CartContext);
 

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
   
  const fetchCart = async () => {
  try {
    const res = await getCart();
    setCartItems(res.data.cart.items);  
  } catch (error) {
    console.error("Failed to fetch cart", error);
  }
};

    
  useEffect(()=>{
      fetchCart();
  },[]);

    const addItem=async(productId,quantity=1)=>{
       try {
        await addToCart(productId, quantity);
        await fetchCart();
       alert("Item added to cart successfully!");
       } catch (error) {
      console.error("Error adding item to cart", error);
       alert("Failed to add item to cart.");
     }
    };

    const updateItem=async(productId,quantity)=>{
       await updateCartItem(productId,quantity);
       fetchCart();
    };

    const removeItem=async(productId)=>{
        await removeCartItem(productId);
        fetchCart();
    }

  return (
    <CartContext.Provider
      value={{ cartItems,addItem,updateItem,removeItem,fetchCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
