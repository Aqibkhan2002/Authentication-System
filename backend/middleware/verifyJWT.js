import jwt from "jsonwebtoken"
export const verifyToken=(req,res,next)=>{
   
    try{
       const token=req.cookies.token

    if(!token)
        return res.status(400).json({success:false,message:"token not found"})

    

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded)
            return res.status(400).json({success:false,message:"invalid token"})

        req.userId=decoded.userId
        next()
     }
     catch(e){
        console.log("error in verifying token:"+e)
        return res.status(500).json({success:false,message:e.message})
     }
}