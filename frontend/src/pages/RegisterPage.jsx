import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [formData,setFormData]=useState({name:'',email:'',password:''});
  const navigate=useNavigate();

  const handleChange=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit=async (e)=>{
     e.preventDefault();

     try{
       const res=await axiosInstance.post('/register',formData);
       alert(res.data.message);
       navigate('/login');

     }
     catch(error){
      alert(error.response.data.message || 'Registration failed');
     }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
        <form className='bg-white p-6 rounded-lg shadow-md w-full max-w-md' onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
           name="name"
           onChange={handleChange}
           placeholder='Name'
           className='w-full p-2 border mb-3'
           required
           />

          <input
           name="email"
           onChange={handleChange}
           placeholder='Email'
           className='w-full p-2 border mb-3'
           required
           />
         <input
           name="password"
           onChange={handleChange}
           placeholder='Password'
           className='w-full p-2 border mb-3'
           required
           />
          <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded'>Register</button> 
        </form>
    </div>
  )
}
