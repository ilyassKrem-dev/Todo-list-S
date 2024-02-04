const mongoose = require('mongoose')


const taskShema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    taskDate: {
        type:Date,
    },
    completed: {
        type: Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
})

const Task = mongoose.model('Task',taskShema)

module.exports = Task