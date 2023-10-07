const mongoose = require("mongoose")
 const database =()=>{
     mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("database conneted ")}).catch(()=>{console.log("error")})
}
module.exports = database