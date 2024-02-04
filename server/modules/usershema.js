const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Provide a name"],
        unique:true,
        trim:true,
        maxlength:[15,"Name is to long"]
    },
    email:{
        type:String,
        required:[true,"provide an email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Provide a password"],
        minlength:[6,"Password must be 6 character long"],
    },
    News:{
        type:Boolean
    }
})
userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User',userSchema)

module.exports = User