import bcrypt from "bcryptjs"
import crypto from "crypto"

import userModel from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendEmailForVerification,sendWelcomeEmail,sendResetPasswordEmail,sendPasswordUpdateSuccessEmail } from "../Email/Email.js"

export const signup=async(req,res)=>{
    const {email,password,name}=req.body
     
    if(!email || !password || !name)
        return res.status(402).json({success:false,message:"All fields are required"})

    try{
       
        
        const userAlreadyExists=await userModel.findOne({email})

        if(userAlreadyExists)
            return res.status(402).json({success:false,message:"User Already Exists"})



        console.log("try")
        const hashedPassword=await bcrypt.hash(password,parseInt(process.env.ROUNDS))
        console.log(hashedPassword)



        const verificationToken=Math.floor(100000+Math.random()*900000).toString()
        
        const user=new userModel({
            name,
            email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000

        })
        
        generateTokenAndSetCookie(res,user._id)

        await sendEmailForVerification(email,verificationToken)  // will send email

        await user.save()

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            user:{
               ...user._doc,
               password:undefined,
               verificationToken:undefined,
               verificationTokenExpiresAt:undefined
            }
        })
    }
    catch(e){
        console.log("catch")
      return res.status(400).json({success:false,message:e.message})
    }
}

export const verifyEmail=async(req,res)=>{
    const {code}=req.body

    try{
        const user=await userModel.findOne({
            verificationToken:code,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })

        if(!user)
            return res.status(400).json({success:false,message:"otp invalid or expired"})

        user.isVerified=true
        user.verificationToken=undefined
        user.verificationTokenExpiresAt=undefined

        await user.save()

        await sendWelcomeEmail(user.email,user.name)
        
        return res.status(200).json({
            success:true,
            message:"user verified successfully",
            user:{
                ...user._doc,
                password:undefined,

             }

        })
    }
    catch(e){
        console.log("error in verifyEmail: "+e)
        return res.status(500).json({success:false,message:"Server Error"})
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body

    try{

        const user=await userModel.findOne({email})

        if(!user)
            return res.status(400).json({success:false,message:"Wrong Email or you are not signed up"})

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid)
            return res.status(400).json({success:false,message:"Incorrect password"})

        generateTokenAndSetCookie(res,user._id)

        user.lastLogin=new Date()

        await user.save()

        return res.status(200).json({
            success:true,
            message:"Logged in Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    }
    catch(e){
        console.log("errror in login: "+e)
        return res.status(400).json({success:false,message:e.message})
    }

}

export const logout=async(req,res)=>{
    res.clearCookie("token")
    return res.status(200).json({success:true,message:"Logout successfully"})
}

export const forgotPassword=async(req,res)=>{
    const {email}=req.body

    try{

        const user=await userModel.findOne({email})

        if(!user)
            return res.status(400).json({success:false,message:"incorrect email"})

        const resetToken=crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt=Date.now()+ 1*24*60*60*1000

        user.resetPasswordToken=resetToken
        user.resetPasswordTokenExpiresAt=resetTokenExpiresAt

        await user.save()

        await sendResetPasswordEmail(email,`${process.env.CLIENT_URL}/resetPassword/${resetToken}`)

        return res.status(200).json({
            success:true,
            message:"reset email send successfully"
        })
    }
    catch(e){
        return res.status(400).json({success:false,message:e.message})
    }
}

export const resetPassword=async(req,res)=>{
    const {token}=req.params
    const {password}=req.body

    try{

        const user=await userModel.findOne({
            resetPasswordToken:token,
            resetPasswordTokenExpiresAt:{$gt:Date.now()}
        })

        if(!user)
            return res.status(400).json({success:false,message:"invalid or expired token"})

        const hashedPassword=await bcrypt.hash(password,parseInt(process.env.ROUNDS))

        user.password=hashedPassword
        user.resetPasswordToken=undefined
        user.resetPasswordTokenExpiresAt=undefined

        await user.save()

        sendPasswordUpdateSuccessEmail(user.email)

        return res.status(200).json({success:true,message:'password updated successfully'})
    }
    catch(e){
           console.log("error in resetPassword: "+e)
           return res.status(500).json({success:false,message:e.message})
    }

}

export const checkparamtoken=async(req,res)=>{
     
    const {token}=req.body
    
    try{

        const user=await userModel.findOne({
            resetPasswordToken:token,
            resetPasswordTokenExpiresAt:{$gt:Date.now()}
        })

        if(!user)
            return res.status(400).json({success:false,message:"invalid or expired token"})

        return res.status(200).json({success:true,message:"token is correct"})
       
    }
    catch(err){
        return res.json({success:false,message:err.message})
    }


}

export const getUser=async(req,res)=>{
    const userId=req.userId
    
    try{
        const user=await userModel.findOne({_id:userId})

        return res.status(200).json({
            success:true,
            message:"user is authenticated",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    }
    catch(e){
        console.log("errror in checkAuth:"+e)
        return res.status(500).json({success:false,message:e.message})
    }

}


