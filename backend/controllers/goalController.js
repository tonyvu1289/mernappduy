const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Goal = require('../model/goalModel')
//@ desc    Get goals
//@route    GET /api/goals
//@access   Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)  
})

//@ desc    Set goals
//@route    POST /api/goals
//@access   Private
const setGoals = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal) 
})
//@ desc    update goals
//@route    PUT /api/goals/:id
//@access   Private
const updateGoals = asyncHandler(async(req,res) => {

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    const goal = await Goal.findById(req.params.id)
    //make sure the logged user matches the goal user
    if(goal.user.toString() !== user.id)
    {
        res.status(401)
        throw new Error("User not authorized!")
    }
    if(!goal){
        res.status(400)
        throw new Error('Goal id not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body, {
        new:true,
    })
    res.status(200).json({message: `Updated goal ${req.params.id}`})
}
)
//@ desc    delte goals
//@route    DELETE /api/goals
//@access   Private
const deleteGoals = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }

    const goal = await Goal.findById(req.params.id)
    //make sure the logged user matches the goal user
    if(goal.user.toString() !== user.id)
    {
        res.status(401)
        throw new Error("User not authorized!")
    }
    if(!goal){
        res.status(400)
        throw new Error('Goal id not found')
    }
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({id:deletedGoal.id})
}
)
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}