import dotenv from "dotenv"; 
dotenv.config();
import { createContext, useState } from "react";

export const AppContext=createContext()

export const ContextProvider=(props)=>{
    
    const backendUrl=process.env.REACT_APP_BACKEND_URL
    const [isloggedIn,setisLoggedIn]=useState(false)
    const [userData,setUserData]=useState(false)

    const value={
        backendUrl,
        isloggedIn,setisLoggedIn,
        userData,setUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}