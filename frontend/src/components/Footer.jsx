import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-gray-800 text-white text-center p-4 mt-auto'>
      <p>&copy; {new Date().getFullYear()} QuickKart. All rights reserved.</p>
    </footer>
  )
}
