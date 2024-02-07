const asyncWrapper = require('../middleware/async')
const User = require('../modules/usershema')
const jwt = require('jsonwebtoken')

const addUser = async (req,res) => {
    try {
        const {username,email,password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({error:"All fields are required"})
        }
        const existeUser = await User.findOne({email})
        const existingUsernameUser = await User.findOne({ username });
        if (existeUser) {
            return res.status(400).json({error:"Email is already in use"})
        } else if (password.length < 6) {
            return res.status(400).json({error:"Password must be 6 character long"})
        } else if (existingUsernameUser) {
            return res.status(400).json({ error: "Username is already in use" });}
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        console.error('Error creating user:', error);
        next(error);
    }
    
}
const checkUser = asyncWrapper( async (req,res) => {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({ error: 'No user found with this email' });
        }
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3h"})
        res.status(200).json({token,msg:"Login successful"})
})
const getUser = asyncWrapper(async (req,res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById({_id:decoded.userId})
    res.status(200).json({user})
})
const updateUser = asyncWrapper( async (req,res) => {
    const token = (req.headers.authorization).split(' ')[1]
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const {username,oldPass,newPass} = req.body
    const user= await User.findById(decoded.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if(username) {
        user.username = username
    }
   
    if(oldPass && newPass) {
        const isOldValid = await user.comparePassword(oldPass)
        if(!isOldValid) {
            return res.status(400).json({error:"Old password is incorrect"})
        }

        user.password = newPass
    }
    await user.save()
    res.status(200).json({user})
})
const deleteUser = (req,res) => {
    res.status(200).json({msg:"test"})
}
module.exports = {addUser,checkUser,getUser,updateUser,deleteUser}