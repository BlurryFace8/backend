const User = require('../Models/userModel')
const Token = require('../Models/tokenModel')
const crypto = require('crypto')
const sendEmail = require('../utils/setEmail')
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')

// register new user
exports.register = async (req,res)=>{
    const{username,email,password}=req.body
    // check if email already register
    const user = await User.findOne({email:email})
    if(user){
        return res.status(400).json({error:"Email already exists."})
    }
    let newUser = new User({
        username: username,
        email: email,
        password: password,
    })
    // add user to database
    newuser = await newUser.save()
    if(!newUser){
        return res.status(400).json({error:"Something went wrong"})
    }
    // generate token
    let token = new Token({
        token:crypto.randomBytes(24).toString('hex'),
        user:newUser._id
    })
    token = await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }
    // send token in email
    const url =`${process.env.FRONTEND_URL}/verifyEmail/${token.token}`
    sendEmail({
        from:"noreply@somthing.com",
        to:newUser.email,
        subject:"Verification email",
        text:`Click on the following link or copy paste it in browser to verify your email.${url}`,
        html:`<a href="${url}"><button>Verify Email</button></a>`
    })
    res.send(newUser)
}

// to varify user
exports.verifyEmail= async (req,res)=>{
    // check token
    const token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:"Invalid token or token may have expired"})
    }
    // find User
    let user = await User.findById (token.user)
    if(!user){
    return res.status(400).json ({error:"User not found"})
    }
    user.isVerified = true
    user = await user.save()
    if(!user){
        return res.status(400).json ({error:"Something went wrong"})
        }
        res.send({message:"User verified successfully"})
}

// forget password
exports.forgetPassword = async(req,res) =>{
    // check mail
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    // generate token
    let token = new Token({
        token: crypto.randomBytes(24).toString('hex'),
        user: user._id
    })
    token= await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }
    // send in email
    // const url = `http://localhost:5000/api/resetpassword/${token.token}`
    const url = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`

    sendEmail({
        from:"noreply@example.com",
        to:user.email,
        subject:"password rest email",
        text:`Click on the link to reset password${url}`,
        html:`<a href="${url}"><button> Reset password</button></a>`
    })
    return res.send({message:"password reset link has been sent to your email."})
}

// to reset password
exports.resetPassword = async(req,res)=>{
    const token = await Token.findOne({token:req.params.token})
    if(!token){
    return res.status(400).json({error:"Invalid token or token may have expired"})
    }

    // find user
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error:"Something went wrong."})
    }
    user.password = req.body.password
    user= await user.save()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Password rest successfully."})
}
// get user list
exports.getUserList= async(req,res)=>{
    let user = await User.find()
    if(!user){
    return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

// to get userDetails
exports.getUserDetails = async(req,res)=>{
    let user = await User.findById(req.params.id)
    if(!user){
    return res.status(400).json({error:"Something went wrong"})
    }
    res.send(this.getUserDetails)
}

// to update user
exports.updateUser = async (req,res)=>{
    let user = await User.findByIdAndUpdate(req.params.id,{
        username:req.body.username,
        email:req.body.email,
        isVerified:req.body.isVerified,
        role:req.body.role
    },{new:true})
    if(!user){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(user)
}

// signin process
exports.signIn = async (req,res)=>{
    let{email,password}=req.body
    // check email
    let user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({error:"Email not registered."})
    }
    // check password
    if(!user.authenticate(password)){
        return res.status(400).json({error:"Email and password do not match"})
    }
    
    // check if verified
    if(!user.isVerified){
        return res.status(400).json({error:"User not verified"})
    }
    // create sign in token
    let token = jwt.sign({user:user._id, role:user.role},process.env.JWT_SECRET)
    // set cookie
    res.cookie('myCookie', token, {expire:Date.now()+86400})
    // return info to frontend
    let {_id,username, role}= user
    res.send({token,user:{_id, username, email, role}})
}

// signout
exports.signout = async(req,res)=>{
    await res.clearCookie('myCookie')
    res.send({message:"Signed out"})
}

// for authorization
exports.requireSignin = expressjwt({
    algorithms:['HS256'],
    secret:process.env.JWT_SECRET
})

