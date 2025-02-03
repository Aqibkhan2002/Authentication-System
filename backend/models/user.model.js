import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:Boolean
    },
    email:{
        type:String,
        required:Boolean,
        unique:Boolean
    },
    password:{
        type:String,
        required:Boolean
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date,

},{timestamps:true})

const userModel=mongoose.model('user',userSchema)

export default userModel