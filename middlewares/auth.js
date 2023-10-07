const jwt = require("jsonwebtoken")
const User = require("../Model/User")
exports.isAuth =async(req,res,next)=>{
    const token = req.cookies.jwtoken
    if(!token){
        return res.status(400).json({
            message:"Login first"
        })
    }
      const decode = jwt.verify(token,process.env.SECRET_KEY)
     req.user = await User.findById({_id:decode._id})
    next();
}