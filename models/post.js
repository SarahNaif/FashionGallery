const mongoose = require('mongoose')

const postScema = new mongoose.Schema({
    title :String ,
    image :String ,
    content: String, 
    // details : String,
    // one to many 
    designer :{type : mongoose.Schema.Types.ObjectId , ref : 'designer' }
    
} , {timestamps :true})

const Post = mongoose.model('post' , postScema)
// to export fruit model
module.exports = Post