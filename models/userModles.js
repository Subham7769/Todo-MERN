const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    usernames:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,  
    }
})

module.exports = mongoose.model('user',userSchema)
