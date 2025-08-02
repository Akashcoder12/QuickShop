import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import {placeOrder} from '../api/BookingApi';

export default function CartPage() {
  const { cartItems, removeItem ,addItem} = useCart();

  const totalPrice = Array.isArray(cartItems) && cartItems.length
    ? cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      ).toFixed(2)
    : '0.00';


    const handlePlaceOrder=async()=>{
       try{
         await placeOrder();
         alert("Order placed successfully!");
         window.location.href="/orders";
       }
       catch(error){
         alert("Failed to place order");
         console.error(error);
       }
    }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h2 className='text-3xl font-semibold mb-6'>Your Cart</h2>
      {!cartItems || cartItems.length === 0 ? (
        <p className='text-gray-600'>
          Cart is empty.{" "}
          <Link to="/" className='text-blue-500 underline'>
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className='space-y-6'>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='flex items-center justify-between border-b pb-4'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className='w-20 object-cover rounded'
                />
                <div>
                  <h3 className='text-lg font-semibold'>{item.productId.name}</h3>
                  <p className='text-sm text-gray-500'>
                    Rs.{item.productId.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.productId._id)}
                className='text-red-500 hover:underline'
              >
                Remove
              </button>

               <button
                onClick={() => addItem(item.productId._id,1)}
                className='text-green-500 hover:underline'
              >
               Add
              </button>


            </div>
          ))}
          <div className='flex justify-between items-center pt-6 border-t'>
            <h3 className='text-xl font-bold'>Total: Rs. {totalPrice}</h3>
            <button onClick={handlePlaceOrder} className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700'>
             Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
