const asyncWrapper = require("../middleware/async")
const Task = require("../modules/taskshema")
const jwt = require('jsonwebtoken')
const getAllTasks = asyncWrapper( async (req,res) => {
    const token = req.headers.authorization;
    const tokenV = token.split(' ')[1]
    const decoded = jwt.verify(tokenV,process.env.JWT_SECRET)
    const tasks = await Task.find({user:decoded.userId}).sort({createdAt:-1})
    res.status(200).json({tasks})
})


const addTask = async(req,res) => {
    const token = req.headers.authorization;
    const tokenV = token.split(' ')[1]
    try {
        const decoded = jwt.verify(tokenV,process.env.JWT_SECRET)


        const newTask = new Task({
            task:req.body.task,
            user: decoded.userId
        })
        const savedTask = await newTask.save();
        res.status(201).json({task:savedTask})
    } catch (error) {
        res.status(400).json({error:error})
    }
    
}

const updateTask = asyncWrapper( async(req,res) => {
    const taskId = req.params.id;
    const {taskName,completed} = req.body
    const updateField = {}
    if(taskName) {
        updateField.task = taskName
    }
    if(completed != undefined) {
        updateField.completed = completed
    }
    const task = await Task.findByIdAndUpdate(taskId,updateField,{new:true})
    if(!task) {
        return res.status(404).json({error: "Task not found"})
    }
    res.status(200).json({task:task})
})
const deleteTask = asyncWrapper(async(req,res) => {
    const taskid = req.params.id;
    const task = await Task.findByIdAndDelete(taskid)
    if(!task) {
        res.status(404).json({error:"Task not found"})
    }
    res.status(200).send()
})
module.exports = {getAllTasks,addTask,updateTask,deleteTask}