const mongoose = require('mongoose')

const commentScema = new mongoose.Schema({
    content: String,
    rate: Number,
    // one to many 
    fan: { type: mongoose.Schema.Types.ObjectId, ref: 'fan' },
    designer: { type: mongoose.Schema.Types.ObjectId, ref: 'designer' }
}, { timestamps: true })

const Comment = mongoose.model('comment', commentScema)
// to export fruit model
module.exports = Comment

