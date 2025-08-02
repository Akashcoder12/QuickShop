import React from 'react';
import { Link } from 'react-router-dom'
import hero_img from '../assets/images/logo.webp';

export default function Hero() {
  return (
    <div className='hero bg-gray-100 p-10 md:flex items-center justify-between'>
      <div className='hero-text max-w-xl'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Discover Amazing Deals on <span>QuickKart</span></h1>
        <p className='text-gray-600 text-lg mb-6'>
            Shop the latest electronics, fashion , and more - all in one place.
        </p>
        <Link to="/products">
            <button className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                Shop Now
            </button>
        </Link>
      </div>

      <div className='hero-image mt-10 md:mt-0'>
         <img 
         src={hero_img} 
         alt="Hero Banner"
         className='rounded-lg shadow-lg w-full max-w-md' />
      </div>
    </div>
  )
}
