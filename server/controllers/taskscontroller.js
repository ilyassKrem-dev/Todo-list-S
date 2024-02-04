const asyncWrapper = require("../middleware/async")
const Task = require("../modules/taskshema")
const jwt = require('jsonwebtoken')
const getAllTasks = asyncWrapper( async (req,res) => {
    const token = req.headers.authorization;
    const tokenV = token.split(' ')[1]
    const decoded = jwt.verify(tokenV,process.env.JWT_SECRET)
    const tasks = await Task.find({user:decoded.userId})
    res.status(200).json({tasks})
})


const addTask = async(req,res) => {
    const token = req.headers.authorization;
    const tokenV = token.split(' ')[1]
    try {
        const decoded = jwt.verify(tokenV,process.env.JWT_SECRET)


        const newTask = new Task({
            task:req.body.task,
            taskDate: new Date(req.body.date),
            user: decoded.userId
        })
        const savedTask = await newTask.save();
        res.status(201).json({task:savedTask})
    } catch (error) {
        res.status(400).json({error:error})
    }
    
}
const getTask = (req,res) => {
    res.status(200).json({msg:"test"})
}
const updateTask = (req,res) => {
    res.status(200).json({msg:"test"})
}
const deleteTask = (req,res) => {
    res.status(200).json({msg:"test"})
}
module.exports = {getAllTasks,addTask,getTask,updateTask,deleteTask}