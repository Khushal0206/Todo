class Errorhandle extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
    }
}
    module.exports = (err,req,res,next)=>{
        err.message = err.message || "internal server error"
        err.statusCode = err.statusCode || 500
    res.status(err.statusCode).json({
        success:false,
        error:err.message,
        status:err.statusCode,
        stack:err.stack
      });
}
module.exports = Errorhandle