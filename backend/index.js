import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
const app=express()
import { dbConnect } from "./DB/dbconnect.js"
import authroute from "./routes/auth.route.js"
import cors from "cors"

dotenv.config()

const allowedOrigins=['http://localhost:5173']

const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))

app.get("/",(req,res)=>{
    return res.send("hey")
})

app.use("/api/auth",authroute)
    

app.listen(PORT,()=>{
    console.log("app is running on port "+PORT)
    dbConnect()
})