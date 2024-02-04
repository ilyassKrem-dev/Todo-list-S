const express = require('express')
const routes = express.Router()
const {getAllTasks,addTask,getTask,updateTask,deleteTask} = require('../controllers/taskscontroller')
routes.route('/').get(getAllTasks).post(addTask)
routes.route('/').get(getTask).delete(updateTask).patch(deleteTask)


module.exports = routes