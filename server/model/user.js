const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:String,
    address:String,
    age:Number,
    department:String,
    status:String,
    date:{ 
        type:Date, 
        default: Date.now
    }
})

const usermodel = mongoose.model('users', UserSchema)
module.exports = usermodel
