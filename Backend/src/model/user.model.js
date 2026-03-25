const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password: String,
    role:{
        type:String,
        enum:['User','Artist'],
        default: 'User'
    }
})

const userModel = mongoose.model("user",userSchema); 


module.exports = userModel;
