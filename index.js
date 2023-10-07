const express = require("express")
const app =express()
app.use(express.json())
const cors = require("cors")

//USE DOTENV
const dotenv = require("dotenv")
dotenv.config({path:"./database/config.env"})
///USE COOKIE-PARSER
const cookieparser = require("cookie-parser")
app.use(cookieparser())
//USE CORS
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


//CONNECT DATABASE
require("./database/connet")
const database = require("./database/connet")
database();
//IMPORT ROUTE
const userRoute = require("./Routers/useRouter")
const TaskRoute = require("./Routers/useRoute")
app.use("/api/v1",userRoute)
app.use("/api/v1",TaskRoute)


// custom error class


/// USE ERROR MIDDLEWARE
const errormiddle  = require("./middlewares/error")
app.use(errormiddle)

app.listen(process.env.PORT,()=>{
    console.log("sever is runing")
})