import React, { useContext,useState,useEffect } from 'react'
import { assets } from '../src/assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/Appcontext'
import { toast } from 'react-toastify'

function Dashboard() {
 
  axios.defaults.withCredentials=true

  const navigate=useNavigate()
  const {backendUrl,setisLoggedIn}=useContext(AppContext)
  const [userData,setUserData]=useState({})
  
  const onClickHandler=async()=>{
     
     const {data}=await axios.post(`${backendUrl}/api/auth/logout`)
     setisLoggedIn(false)
     navigate("/")
  }

  useEffect(()=>{
       
      const getData=async()=>{
         
        try{
           const {data}=await axios.get(`${backendUrl}/api/auth/getuser`)
           setUserData(data)
           console.log(data)
        }
        catch(err){
            if(err.response)
              toast.error(err.response.data.message+". Please login again")
            else
            toast.error(err.message+". Please login again")
           navigate("/signin")
        }
      }

      getData()

  },[])

  return (
    <div className='flex justify-center items-center min-h-screen'>
       <img onClick={()=>navigate('/')} src={assets.logo} className='sm:w-32 w-28 absolute left-5 sm:left-20 top-5 cursor-pointer' alt="" />

        <button onClick={onClickHandler}className='flex
                 items-center
                 gap-2
                 rounded-full
                 px-4
                 py-2
                 border
                 border-gray-500
                 text-gray-800
                 hover:bg-gray-100
                   transition-all
                   absolute
                   top-5
                   right-5
                   sm:right-20'>Logout <img src={assets.arrow_icon} alt="" /></button>


       <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-72  sm:w-96 text-sm text-indigo-300'>
          
          <h1 className='text-white sm:text-2xl text-xl font-semibold text-center mb-4'>DashBoard</h1>
          <div className='bg-[#333A5C] rounded-md sm:p-6 p-2 mb-4'>
              <h2 className='mb-2 text-xl'>Profile Information</h2>
              <p className='text-white '>Name : {userData?.user?.name || 'N/A'}</p>
              <p className='text-white'>Email : {userData?.user?.email || 'N/A'}</p>
          </div>

          <div className='bg-[#333A5C] rounded-md sm:p-6 p-2'>
              <h2 className='mb-2 text-xl'>Account Activity</h2>
              <p className='text-white '>Joined: {new Date(userData?.user?.createdAt).toLocaleDateString("en-us",{
                year:"numeric",
                month:"long",
                day:"numeric"
              }) || 'N/A'}  </p>
              <p className='text-white'>Last Login: {new Date(userData?.user?.lastLogin).toLocaleDateString("en-us",{
                year:"numeric",
                month:"long",
                day:"numeric"
              }) || 'N/A'}  </p>
          </div>
        </div>


    </div>
  )
}

export default Dashboard