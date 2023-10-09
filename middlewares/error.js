// class Errorhandle extends Error{
//     constructor(message,statusCode){
//         super(message);
//         this.statusCode = statusCode
//     }
// }

    module.exports = (err,req,res,next)=>{
        err.message = err.message || "internal server error"
        err.statusCode = err.statusCode || 500
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        status:err.statusCode,
      });
}
// module.exports = Errorhandle