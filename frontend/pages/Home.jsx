import React from 'react'
import Navbar from '../components/Navbar'
import Header from "../components/Header"

function Home() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center '>
       <Navbar/>
       <Header/>
    </div>
  )
}

export default Home