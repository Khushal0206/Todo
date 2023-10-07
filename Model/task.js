const mongoose = require("mongoose")
const TaskSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    isComplite:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})
const Task = mongoose.model("Task",TaskSchema)
module.exports = Task