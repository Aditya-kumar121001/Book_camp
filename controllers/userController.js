const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const cookie = require("cookie-parser")

//@desc Register a user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password, firstname, lastname} = req.body;
    if(!username || !email || !password || !firstname || !lastname){
        console.log("All feilds are mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if(userAvailable){
        console.log("User already exists")
    }

    //hashed password - aditya1210
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hashed: ", hashedPassword);
    const user = await User.create({
        username, email, password:hashedPassword, firstname, lastname
    })
    console.log(`User created ${user}`);
    if(user){
        console.log(user.email)
    }
    res.redirect("/login")
});

//@desc Login a user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        console.log("all feilds are mandatory")
    }
    const user = await User.findOne({email})

    //compare entered password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
              user: {
                username: user.username,
                email: user.email,
                id: user.id,
              },
            },
            process.env.ACCESS_TOKEN_SECERT,
            { expiresIn: "15m" }
        ); 
        console.log(`accessToken: ${accessToken}`);

        res.cookie("token",accessToken,{
            httpOnly:true,
            expires: new Date(Date.now()+60*1000)
        })
    }
    else {
          console.log("email or password is not valid");
    }
    res.redirect("/logout")
});

//@desc logout user 
//@route GET /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.redirect("/");
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser, logoutUser}