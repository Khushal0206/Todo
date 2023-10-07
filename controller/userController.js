const User = require("../Model/User")
const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")
const ErrorHandler = require("../utils/error")

//create user
exports.createUse = async(req,res,next)=>{
    try {
        
        // const email = req.body.email
        // const name = req.body.name
        // const password = req.body.password
        //or 
         const {email,name,password} = req.body
         const hashpassword  = await bcrypt.hash(password,10)
        //  if (hashpassword instanceof Promise) {
        //     console.log("It's a Promise!");
        //   } else {
        //     console.log("It's not a Promise.");
        //   }
        const user = await User.create({email,name,password:hashpassword})
    
        const token = await jwt.sign({id:user._id},process.env.SECRET_KEY)
        res.cookie("jwtoken",token,{
            httpOnly:true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
      
        })
        res.status(201).json({
            message:"created",
            user
        })
    } catch (error) {
        next(error)
    }
}

//Login 

exports.loginUser= async(req,res,next)=>{
    try {
        
        const {email,password} = req.body;
        const user = await User.findOne({email:email}).select("+password")
        if(!user) return next(new ErrorHandler(" email and id invalid", 401))
        const p = await bcrypt.compare(password,user.password)
        //console.log(p instanceof Promise)
        if(!p){
            res.status(201).json({
                message:"please enter valid email and password ",
                
            })
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY)    
        res.cookie("jwtoken",token,{
            httpOnly:true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
      
        })
        res.status(201).json({
            message:"created",
            user
        })
    } catch (error) {
        next(error)
    }


}

/// get My Datail

exports.myDatail = (req,res,next)=>{

    //INSTANT OF THIS WE USE MEDDLEWARE

//    const token = req.cookies.jwtoken
//    const decode = jwt.verify(token,"jdjksdskdkjsdj")
//     const user = User.findById({_id:decode._id})
 
try {
    const user = req.user;
       res.status(201).json({
           message:"created",
           user
       })
    
} catch (error) {
 next(error)   
}

}

// LOGOUT USER

exports.logOut = async(req,res,next)=>{
    try {
        
        res.cookie("jwtoken"," ",{
              httpOnly:true,
              expires: new Date(Date.now()),
              sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
              secure: process.env.NODE_ENV === "Development" ? false : true,
        
          })
          res.status(201).json({
              message:"Logout",
          })
    } catch (error) {
        next(error)
    }

}