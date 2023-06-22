const mongoose = require("mongoose")

const campSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is mandatory"],
        unique:true
    },
    description:{
        type:String,
        required:[true, "description is required"]
    },
    image:{
        type:[String]
    },
    price:{
        type:Number,
        required:[true,"price is mandatory"]
    },
    location:{
        type:String,
        required:[true, "Location is must"]
    },
    amenities:{
        type:[String],
        required:true
    }
})

module.exports = mongoose.model("Camp", campSchema)