import React, { useEffect, useState } from 'react';
import {getMyOrders} from '../api/BookingApi';

export default function OrderPage() {
     
    const [orders,setOrders]=useState([]);
     
   useEffect(()=>{
       const fetchOrders=async()=>{
         
         try{
           const res=await getMyOrders();
           setOrders(res.data.orders);
           }
         catch(error){
           console.log("Failed to fetch orders",error);
           }
          };

       fetchOrders();
       },[]);

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h2 className='text-2xl font-semibold mb-4'>My Orders</h2>
       
       {
        orders.length===0 ?(
            <p>No Orders yet.</p>
        ):(
            <div className='space-y-4'>
                 {
                    orders.map((order)=>(
                         <div key={order._id} className='border p-4 rounded shadow'>
                            <p className='font-medium'>Order ID:{order._id}</p>
                            <p>Status: <strong>{order.status}</strong></p>
                            <p>Total:Rs.{order.totalAmount}</p>
                            <ul className='ml-4 list-disc'>
                                {
                                    order.items.map((item,index)=>(
                                        <li key={index}>
                                            Product ID: {item.productId},
                                            Qty: {item.quantity}
                                        </li>
                                    ))
                                }
                            </ul>
                            <p className='text-sm text-gray-500'>
                                Ordered on: {new Date(order.createdAt).toLocaleString()};
                            </p>
                         </div>
                    ))
                 }
            </div>
        )
       }
    </div>
  )
}
