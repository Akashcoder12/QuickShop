import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
   const [formData,setFormData]=useState({email:'',password:''});
   const navigate=useNavigate();

   const handleChange=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value});
   };

   const handleSubmit=async(e)=>{
     e.preventDefault();
     try{
       const res=await axiosInstance.post('/login',formData);
       localStorage.setItem('token',res.data.token);
       alert(res.data.message);
       navigate('/');
   }
   catch(error){
    alert(error.response.data.message || 'Login Failed');

   }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form className='bg-white p-6 rounded-lg shadow-md w-full max-w-md' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <input 
        name="email"
        onChange={handleChange}
        placeholder='Email'
        className='w-full p-2 border mb-3' 
        required/>
        
        <input 
        name="password"
        onChange={handleChange} 
        placeholder='Password'
        className='w-full p-2 border mb-4'
        required />

        <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded'>Login</button>
      </form>
    </div>
  )
};
