const asyncHandler = require("express-async-handler")
const Camp = require("../model/campModel")

//@desc get all the camp
//@route POST /api/camp/
//@access public
const getAllCamp = asyncHandler(async(req,res)=>{
    const camp = await Camp.find({});
    console.log(camp)
})

//@desc add a camp
//@route POST /api/camp/
//@access public
const addCamp = asyncHandler(async(req,res)=>{
    const {name, description, image,price,location,amenities} = req.body;
    //Current user
    //const userId = req.user.id;
    const camp = await Camp.create({
        name, description, image,price,location,amenities
    })
    console.log(camp, camp.id)
})

//@desc get a camp
//@route POST /api/camp/:id
//@access public
const getCamp = asyncHandler(async(req,res)=>{
})

//@desc update a camp
//@route PUT /api/camp/:id
//@access public
const updateCamp = asyncHandler(async(req,res)=>{
    
})

//@desc delete a camp
//@route DELETE /api/camp/:id
//@access public
const deleteCamp = asyncHandler(async(req,res)=>{
    
})

module.exports = {getAllCamp,addCamp,getCamp,updateCamp,deleteCamp}