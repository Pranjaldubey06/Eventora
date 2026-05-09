const User=require('../models/User');
const bcrypt=require('bcryptjs');
const{sendOTPEmail}=require('../utils/email')
const OTP = require('../models/OTP')

exports.registerUser=async(req,res)=>{
    const{name,email,password}=req.body;

   let userExists=await User.findOne({email});
   if(userExists){
    return res.status(400).json({error:'User already exists'})
   }

   const salt=await bcrypt.genSalt(10);
   const hashedPassword=await bcrypt.hash(password, salt);


    try{
        const user=new User.create({
            name,email,password :hashedPassword,role:'user',isVerified:false
        })
        await user.save();
        res.status(201).json({message:'User registered successfully'});
   
      const otp=Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`OTP for ${email}: ${otp}`);
    await sendOTPEmail(email,otp, 'account_verification')

   req.status(201).json({
    message:"User registered successfully,.please check your email for OTP to verify your account",
    email:use.email
   })
   
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//login user

exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
let user = await User.findOne({email})
if(!user){
    return res.status(400).json({error:'Invalid credentials'})
}

const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(400).json({error:'Invalid credentials'})
}

if(!user.isVerified && user.role === 'user'){
   const otp=Math.floor(100000 + Math.random() * 900000).toString()
   
   await OTP.deleteMany({email,action:'account_Verification'})
   await OTP.create({email,otp,action:"account_Verification"});
   await sendOTPEmail(email,otp,'account_verification')
   return res.status(400).json({
    error:'Account not verified.A new OTP has been sent to your email.'
   })
}

res.status(200).json({
    message:'Login successful',
    user:{
        id:user._id,
        name:user.name,
        email:use.email
    }
})

}