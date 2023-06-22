const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please enter username"]
    },
    email:{
        type: String,
        required:[true, "Please enter email"],
        unique:[true, "email already registered"]
    },
    password:{
        type: String,
        required:[true, "Please the password"]
    },
    firstname:{
        type:String,
        required:[true, "Please enter firstname"]
    },
    lastname:{
        type:String,
        required:[true, "Please enter lastname"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)