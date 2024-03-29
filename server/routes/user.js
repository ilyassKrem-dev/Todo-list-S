const express = require('express')
const routes = express.Router()
const {addUser,getUser,updateUser,deleteUser,checkUser} = require('../controllers/usercontrollers')
routes.route('/signup').post(addUser)
routes.route('/login').post(checkUser)
routes.route('/').get(getUser).delete(deleteUser).patch(updateUser)



module.exports = routes