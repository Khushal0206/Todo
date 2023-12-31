const mongoose = require("mongoose")
const UserSchema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        select:false
    }
})
module.exports = mongoose.model("User", UserSchema)