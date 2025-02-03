import React, { useContext, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { assets } from '../src/assets/assets'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'

function ResetPassword() {
     
     const [isLoading , setIsLoading]=useState(false)
     const {token}=useParams()
     const passwordRef=useRef()
     const confirmPasswordRef=useRef()
     const navigate=useNavigate()
     const [isValidToken,setIsValidToken]=useState(false)

     const {backendUrl}=useContext(AppContext)

     useEffect(()=>{
          
        const validateToken=async()=>{
            
            try{
            const {data}=await axios.post(`${backendUrl}/api/auth/checkparamtoken`,{token})

            if(!data.success){
              navigate("/error")
            }
          }
          catch(err){
            navigate("/error")
          }
        }
        validateToken()

     },[token,navigate])

     const onSubmitHandler=async(e)=>{
        e.preventDefault()
         setIsLoading(true)

         const password=passwordRef.current.value
         const confirmPassword=confirmPasswordRef.current.value

         if(password!=confirmPassword){
            toast.error("Password and Confirm Password must be same")
            setIsLoading(false)
            return
         }
        try{
               console.log("in try block")
             const {data}=await axios.post(`${backendUrl}/api/auth/resetpassword/${token}`,{password})
               console.log("below axios")
             if(data.success){
               toast.success("Password Updated Successfully")
               navigate("/signin")
             }else{
              toast.error(data.message)
             }

        }
        catch(err){
          
          if(err.response)        // if 400,500 is returning from backend, axios throw its to catch block so you have to check this way in catch block
            toast.error(err.response.data.message)
          else
          toast.error(err.message)
          
        }
        setIsLoading(false)
     }

  return (
    <div className='flex items-center justify-center min-h-screen'>
                <img onClick={()=>navigate('/')} src={assets.logo} className='sm:w-32 w-28 absolute left-5 sm:left-20 top-5 cursor-pointer' alt="" />
                <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-sm text-indigo-300'>
    
                    <h2 className='text-3xl font-semibold text-center mb-3 text-white'>Reset Password</h2>
                    <p className='text-center text-sm mb-6'>Update Your Password</p>
            
                    <form onSubmit={onSubmitHandler}>
            
                        <div className='flex py-2.5 px-5 gap-3 w-full mb-4 rounded-full bg-[#333A5C]'>
                            <img src={assets.lock_icon} alt="" />
                            <input ref={passwordRef}  type="password" className='outline-none bg-transparent' placeholder='New Password'required />
                        </div>

                        <div className='flex py-2.5 px-5 gap-3 w-full mb-4 rounded-full bg-[#333A5C]'>
                            <img src={assets.lock_icon} alt="" />
                            <input ref={confirmPasswordRef}  type="text" className='outline-none bg-transparent' placeholder='Confirm New Password'required />
                        </div>
                        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:bg-indigo-50 '>{isLoading?"Loading...":"Submit"}</button> 
                        <p onClick={()=>navigate('/signin')} className='flex justify-center text-xs gap-2 mt-2 text-center cursor-pointer text-blue-400 hover:underline' >Go Back to Login Page </p> 
                    </form>
                    
                </div>
            </div>
        
  )
}

export default ResetPassword