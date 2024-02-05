const express = require('express')
const routes = express.Router()
const {getAllTasks,addTask,getTask,updateTask,deleteTask} = require('../controllers/taskscontroller')
routes.route('/').get(getAllTasks).post(addTask)
routes.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)


module.exports = routes