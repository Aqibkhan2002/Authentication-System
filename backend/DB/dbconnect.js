import mongoose from "mongoose";

export const dbConnect=async()=>{

    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("mongodb connected")
    }
    catch(e){
       console.log("error connecting to mongodb "+e)
       process.exit(1)  // represents failure 
    }
    
}
