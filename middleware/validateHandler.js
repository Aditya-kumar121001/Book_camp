const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async(req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, "aditya123", (err, decoded) => {
            if(err){
                console.log(err)
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
    }
        else{
            res.status(401);
            throw new Error("User is not authorized or expired");
        }
}); 

module.exports = validateToken