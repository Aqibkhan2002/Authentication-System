import React, { useContext,useRef, useState } from 'react'
import { assets } from '../src/assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'


function Resetmail() {
    
    const [isLoading,setIsLoading]=useState(false)
    const {backendUrl}=useContext(AppContext)
    const emailRef=useRef()

    const navigate=useNavigate()
   
    const onSubmitHandler=async(e)=>{

        setIsLoading(true)
        e.preventDefault()

        const email=emailRef.current.value
     
        try{
             
              const {data}=await axios.post(`${backendUrl}/api/auth/forgotPassword`,{email})

              if(data.success){
                toast.success("Reset Link is sent to your Email")
                emailRef.current.value=""
              
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
                <p className='text-center text-sm mb-6'>Enter your Email Id</p>
        
                <form onSubmit={onSubmitHandler}>
        
                    <div className='flex py-2.5 px-5 gap-3 w-full mb-4 rounded-full bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt="" />
                        <input ref={emailRef}  type="text" className='outline-none bg-transparent' placeholder='Email Id'required />
                    </div>
                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:bg-indigo-50 '>{isLoading?"Loading...":"Submit"}</button>  
                </form>

            </div>
        </div>
    
  )
}


export default Resetmail