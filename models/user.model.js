const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =  Schema({
    firstName:String,
    lastName:String,
    email:String,
    password :String

})
const User = mongoose.model('User',userSchema);
module.exports = User