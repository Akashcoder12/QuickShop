import React from 'react'
import Hero from '../components/Hero';
import ProductListPage from './ProductListPage';

export default function Home() {
  return (
    <div className='p-4'>
      <Hero/>
      <ProductListPage/>
    </div>
  )
}
