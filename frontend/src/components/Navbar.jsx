import React from 'react'
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between items-center'>
      <Link to="/" className="text-xl font-white p-4 flex justify-between items-center">QuickKart</Link>
      <div className='space-x-4'>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/user">Dashboard</Link>
      </div>
    </nav>
  )
}
