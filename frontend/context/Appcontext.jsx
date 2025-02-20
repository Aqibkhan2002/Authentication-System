import { createContext, useState } from "react";

export const AppContext=createContext()

export const ContextProvider=(props)=>{
    
    const backendUrl='http://localhost:3000'
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