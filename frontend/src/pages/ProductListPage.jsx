import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

export default function ProductListPage() {
      const [products,setProducts]=useState([]);
      //Fetch products from backend
      useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const res=await axiosInstance.get('/products');
                setProducts(res.data.products);
            }
            catch(err){
                 console.error('Failed to fetch products:',err.message);
            }
         };
         fetchProducts();
      },[]);
  return (
    <div>
       <h2 className='text-2xl font-semibold mt-10 mb-4 text-center'>Featured Products</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
         {
            products.map((product)=>(
                <div key={product._id} className='border p-4 rounded-lg shadow hover:shadow-lg'>
                     <img src={product.image} alt={product.name} className='w-full  object-cover rounded'></img>
                     <h3 className='mt-2 text-lg font-bold'>{product.name}</h3>
                     <p className='text-gray-700'>Rs.{product.price}</p>
                     <Link to={`/products/${product._id}`}>
                        <button className='mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>
                           View Details
                        </button>
                     </Link>
                </div>
            ))
         }
        </div>
    </div>
  )
}
