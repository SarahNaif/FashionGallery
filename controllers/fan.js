const express = require('express')

const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')

const Designer = require('../models/designer')
const Comment = require('../models/comment')
const Fan = require('../models/fan')
const Post = require('../models/post')




router.get('/fan', (req, res) => {
    res.render('fan/fan.ejs')
});

router.get('/fan/signup', (req, res) => {
    res.render('fan/sign.ejs')
})

router.get('/fan/login', (req, res) => {
    res.render('fan/sign.ejs')
})

router.get('/fan/designers', (req, res) => {
    res.render('fan/designers.ejs')
})

router.get('/fan/designer/id', (req, res) => {
    res.render('fan/profile.ejs')
})

router.get('/fan/designer/id', (req, res) => {
    res.render('fan/profile.ejs')
})

router.get('/designer/id/review/new', (req, res) => {
    res.render('designer/profile.ejs')
})


//======================================
// add commend form fan
//======================================
// router.post('/designer', (req, res) => {
//     console.log("the commend: ", req.body.commend)
  
//     let newCommend = {
//       content: req.body.commend
//       // ,
//       // fan: req.session.userId,
//       // designer: 
//     }
  
//     Comment.create(newCommend)
//       .then(commend => {
//         console.log("creating commend: ", Comment)
//         res.redirect('/designer', { commend })
//       }).catch(err => console.log(err));
  
//   });

// export routes
module.exports = router