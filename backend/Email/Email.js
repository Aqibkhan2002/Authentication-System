import { client,sender } from "./Email.config.js"
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./Email.template.js"

export const sendEmailForVerification=async(email,verificationToken)=>{
  const recepient=[{email}]
  try{
    const response=await client.send({
        from:sender,
        to:recepient,
        subject:"Verify your Email",
        category:"Email Verification",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken)
    })
    console.log("email send successfully")
  }
  catch(e){
    console.log("error in sending email "+e)
    throw new Error("Error in sending email"+e)
  }
}

export const sendWelcomeEmail=async(email,name)=>{

    const recepient=[{email}]
    
    try{
        const res=await client.send({
            from:sender,
            to:recepient,
            template_uuid: "9578a227-5918-4dab-9d71-8a302406ccc5",
            template_variables: {
              "company_info_name": "Auth Company",
              "name": name
            }
        })
        console.log("welcome Email sent "+res)
    }
    catch(e){
        console.log("error in sending welcome email"+e)
        throw new Error("error in sending welcome email"+e)
    }

}

export const sendResetPasswordEmail=async(email,url)=>{
   
    const recepient=[{email}]
    try{
        const res=await client.send({
            from:sender,
            to:recepient,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",url)
        })
    }
    catch(e){
        console.log("error in sending reset password email:"+e)
        throw new Error(e)
    }
}

export const sendPasswordUpdateSuccessEmail=async(email)=>{
    const recepient=[{email}]
     try{
          const res=await client.send({
            from:sender,
            to:recepient,
            subject:"Update Successful",
            category:"Password Update",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE
        })

        console.log("password update email sent successfully")
     }
     catch(e){
        console.log("error in sending password update successful msg: "+e)
        throw new Error(e)
     }
}