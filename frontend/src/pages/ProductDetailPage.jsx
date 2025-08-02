import React, {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const {addItem}=useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        setError('Product not found: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if(loading){
    return <div className='text-center p-10'>Loading...</div>
  };
  if(error){
    return <div className='text-center p-10 text-red-600'>{error}</div>
  };

  return (
      
    <div  className='p-6 max-w-4xl mx-auto'>
       <div className='flex flex-col md:flex-row gap-6'>
          <img src={product.image} alt={product.name} className='w-full md:w-1/2 rounded-lg'></img>
       </div>
       
       <div className='flex flex-col justify-between'>
         <div>
           <h2 className='text-3xl font-bold mb-2'>{product.name}</h2>
           <p className='text-gray-700 mb-4'>{product.description}</p>
           <p className='text-lg font-semibold'>Rs.{product.price}</p>
           <p className='mt-2 text-sm text-gray-500'>{product.stock>0 ? `In Stock (${product.stock})`:'Out of Stock'}</p>
         </div>
       </div>

       <button 
        onClick={() => addItem(product._id, 1)}
        className={`mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 
        ${
         product.stock===0 ? 'opacity-50 cursor-not-allowed':''
        }
        disabled={product.stock===0}
       `}
       >
        Add to Cart
       </button>
    </div>
  );
}
