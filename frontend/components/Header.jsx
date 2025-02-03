import React from 'react'
import { assets } from '../src/assets/assets'
import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate=useNavigate()

  return (
    <div className='flex flex-col items-center mt-28 text-gray-800  text-center'>
      
      <img src={assets.header_img} className='w-36 h-36 mb-6 rounded-full' alt="" />

      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Developer <img className='w-8 aspect-square' src={assets.hand_wave} alt="" /></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to Our App</h2>
      <p className='mb-8 max-w-md'>Lets start with a quick platform tour and we will have you up and running in no time!</p>
      <button className='
          rounded-full
          px-8
          py-2.5
          border
          border-gray-500
          text-gray-800
          hover:bg-gray-200
            transition-all' onClick={()=>navigate("/signin")}>Get Started</button>
    </div>
  )
}

export default Header