const express = require('express')
const routes = express.Router()
const {addUser,getUser,updateUser,deleteUser,checkUser} = require('../controllers/usercontrollers')
routes.route('/signup').post(addUser)
routes.route('/login').post(checkUser)
routes.route('/').get(getUser)
routes.route('/:id').delete(updateUser).patch(deleteUser)


module.exports = routes