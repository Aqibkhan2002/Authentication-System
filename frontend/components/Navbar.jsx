import React from 'react'
import {assets} from "../src/assets/assets.js"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate=useNavigate()
  return (
    <div className=' w-full flex justify-between items-center sm:p-6 p-4 sm:px-24 absolute top-0 '>
        <img src={assets.logo} alt="" className='sm:w-32 w-28' />
        <button onClick={()=>navigate("/signin")}className='flex
          items-center
          gap-2
          rounded-full
          px-4
          py-2
          border
          border-gray-500
          text-gray-800
          hover:bg-gray-100
            transition-all'>Login <img src={assets.arrow_icon} alt="" /></button>




           
    </div>
  )
}

export default Navbar