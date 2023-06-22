const express = require("express");
const env = require("dotenv").config()
const app = express();
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 5000;
const path = require("path")
const static_path = path.join(__dirname, "public")
//database and model
const Camp = require("./model/campModel")
const connectDB = require("./database/connection");
connectDB();

//middleware
app.use(express.json())
app.use(express.static(static_path))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//view engine
app.set("view engine", "hbs")

//Routes - home
app.get("/", async(req,res)=>{
    const camps = await Camp.find({});
    console.log(camps)
    res.render("index",{camps})
})
app.get("/register", (req,res)=>{
    res.render("register")
})
app.get("/login", (req,res)=>{
    res.render("login")
})
app.get("/logout", (req,res)=>{
    res.render("logout")
})

//Login & register 
app.use("/api/user", require("./routes/userRoute"));

//Camping routes
app.use("/api/camp", require("./routes/campRoute"))

//server
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
