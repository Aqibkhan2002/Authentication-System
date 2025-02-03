import Home from "../pages/Home"
import Signin from "../pages/Signin"
import Resetmail from "../pages/Resetmail"
import ResetPassword from "../pages/ResetPassword"
import {Routes , Route} from "react-router-dom"
import Otp from "../pages/Otp"
import Dashboard from "../pages/Dashboard"
import ErrorPage from "../pages/ErrorPage"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  

  return (
    <>
      <ToastContainer/>
       <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/resetmail' element={<Resetmail/>}/>
          <Route path='/error' element={<ErrorPage/>}/>
       </Routes>
    </>
  )
}

export default App
