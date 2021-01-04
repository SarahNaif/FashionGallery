const mongoose = require('mongoose')

const postScema = new mongoose.Schema({
    content :String ,
    img :String ,
    description: String, 
    details : String
} , {timestamps :true})

const Post = mongoose.model('post' , postScema)
// to export fruit model
module.exports = Post

