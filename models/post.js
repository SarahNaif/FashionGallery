const mongoose = require('mongoose')

const postScema = new mongoose.Schema({
    content :String ,
    img :String ,
    description: String, 
    details : String,
    // one to many 
    user :{type : mongoose.Schema.Types.ObjectId , ref : 'user' }
    
} , {timestamps :true})

const Post = mongoose.model('post' , postScema)
// to export fruit model
module.exports = Post

