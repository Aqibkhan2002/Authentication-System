import React, { useContext, useRef } from 'react'
import { assets } from '../src/assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import { AppContext } from '../context/Appcontext'

function Otp() {
   
    axios.defaults.withCredentials=true

    const inputRefs=useRef([])
    const navigate=useNavigate()
    const {backendUrl,setisLoggedIn}=useContext(AppContext)

    const handleInput=(e,index)=>{
        if(e.target.value.length>0 && index<inputRefs.current.length-1)
            inputRefs.current[index+1].focus()
    }

    const handleKeyDown=(e,index)=>{
        if(e.key==='Backspace'&& e.target.value==''   && index>0)
            inputRefs.current[index-1].focus()
    }

    const handlePaste=(e)=>{
        const paste=e.clipboardData.getData('text').split('')
        paste.forEach((char,index)=>{
            if(inputRefs.current[index])
                inputRefs.current[index].value=char
        })
        inputRefs.current[inputRefs.current.length-1].focus()
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
       try{

         const code = inputRefs.current.map(input => input.value).join('');
           
         const {data}=await axios.post(`${backendUrl}/api/auth/verifyEmail`,{code})

         if(data.success){
            toast.success("Email Verified Successfully")
            setisLoggedIn(true)
            navigate('/dashboard')
         }else
         toast.error(data.message)
       }
       catch(err){
          if(err.response)        // if 400,500 is returning from backend, axios throw its to catch block so you have to check this way in catch block
          toast.error(err.response.data.message)
          toast.error(err.message)
       }
    }
  return (
    <div className='flex justify-center items-center min-h-screen'>

        <img src={assets.logo} alt="" className='sm:w-32 w-28 absolute left-5 sm:left-20 top-5 cursor-pointer '  />

        <form onSubmit={handleSubmit} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
            <p className='text-center mb-6 text-indigo-300'>Enter 6 digit code send to your Email Id</p>
          <div className='flex justify-between mb-8'onPaste={handlePaste} >
            {Array(6).fill(1).map((_,index)=>(
               <input ref={(e)=>inputRefs.current[index]=e}  type="text" maxLength="1" key={index} required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
                onInput={(e)=>handleInput(e,index)} 
                onKeyDown={(e)=>handleKeyDown(e,index)} />
             ))}
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button>
        </form>

    </div>
  )
}

export default Otp