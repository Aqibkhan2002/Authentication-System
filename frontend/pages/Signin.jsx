
import React, { useContext } from 'react'
import { useState,useRef} from 'react'
import { AppContext } from '../context/Appcontext'
import {useNavigate} from "react-router-dom"
import { assets } from '../src/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

function Signin() {
  const [state,setState]=useState("Log in")
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  const {backendUrl,setisLoggedIn}=useContext(AppContext)

  async function onSubmitHandler(e){

   try{

      e.preventDefault()

      

      axios.defaults.withCredentials=true

      setIsLoading(true)

      if(state==="Sign up"){
         
         const {data}=await axios.post(`${backendUrl}/api/auth/signup`,{
             email,
             password,
             name
         })

         if(data.success){
            setisLoggedIn(true)
            setIsLoading(false)
            navigate('/otp')
            
         }else{
            toast.error(data.message)
         }
         setIsLoading(false)
      }else{
         
         const {data}=await axios.post(`${backendUrl}/api/auth/login`,{
            email,
            password
            
        })

        if(data.success){
           setisLoggedIn(true)
           setIsLoading(false)
           navigate('/dashboard')
        }else{
           toast.error(data.message || "Error occured")
        }
        setIsLoading(false)
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
         <h2 className='text-3xl font-semibold text-center mb-3 text-white'>{state==="Sign up"?"Create Account":"Login"}</h2>
         <p className='text-center text-sm mb-6'>{state==="Sign up"?"Create Your Account":"Login to Your Account"}</p>

         <form onSubmit={onSubmitHandler}>

             {  state==="Sign up" &&
              <div className='flex py-2.5 px-5 gap-3 w-full mb-4 rounded-full bg-[#333A5C]'>
                <img src={assets.person_icon} alt="" />
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='outline-none bg-transparent' placeholder='Full Name'required />
             </div>
             }

             <div className='flex py-2.5 px-5 gap-3 w-full mb-4 rounded-full bg-[#333A5C]'>
                <img src={assets.mail_icon} alt="" />
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className='outline-none bg-transparent' placeholder='Email id'required />
             </div>

             <div className='flex py-2.5 px-5 gap-3 w-full mb-4 rounded-full bg-[#333A5C]'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='outline-none bg-transparent' placeholder='Password'required />
             </div>

             {state==="Log in" && <p onClick={()=>navigate('/resetmail')}className='cursor-pointer mb-4 text-indigo-500'>Forgot password?</p>}

             <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:bg-indigo-50 '>{isLoading?"Loading...":state}</button>
         </form>

        {state==="Sign up" && (<p className='text-center text-xs mt-4 text-gray-400' >Already have an Account? <span onClick={()=>setState("Log in")} className='cursor-pointer text-blue-400 underline'>Login Here</span></p>)}

        { state==="Log in" && (<p className='text-center  text-xs mt-4 text-gray-400' >Dont have an Account? <span onClick={()=>setState("Sign up")} className='cursor-pointer text-blue-400 underline'>Sign up Here</span></p>)}
       </div>
    </div>
  )
}

export default Signin