const express = require('express')

const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')

const Designer = require('../models/designer')
const Comment = require('../models/comment')
const Fan = require('../models/fan')
const Post = require('../models/post')




//======================================
// show signup
//======================================
router.get('/fan/signup', (req, res) => {
    res.render('fan/signup.ejs');
  })


  
//======================================
// create a new Designer
//======================================
router.post(
    "/Fan/new",
    validator.body('email').isEmail(),
    validator.body('password').isLength({min: 5}),
  
  (req, res) => {
    console.log('trying to signup????')
  
    const validationErrors = validator.validationResult(req);
    if(!validationErrors.isEmpty()) return res.status(500).send('validation error')
  
    console.log('info',req.body.name,req.body.password, req.body.email, req.body.gender)
    Fan.createSecure(req.body.email, req.body.password, req.body.name, req.body.gender, (err, newUser)=> {
      // adding the session of user
      req.session.userId = newUser.id;
      console.log(req.session.userId)
      res.redirect('/fan/login')
    })
  });


//======================================
// show login 
//======================================
router.get('/fan/login', (req, res) => {
    res.render('fan/login.ejs');
  })
  
  //======================================
  // login & Auth
  //======================================
  router.post('/fan/login', (req, res) => {
    console.log('email and pass:', req.body.email, req.body.password);
    // // Auth
    Fan.Auth(req.body.email, req.body.password, (err, foundFan)=>{
      if(err){
        console.log('Auth error: ', err)
        res.status(500).send(err)
      }else{
        req.session.userId = foundFan.id;
        res.redirect('/fan/'+foundFan.id+'/designers', )
      }
    })
  })

//======================================
// View Fan Profile by id
//======================================
// this route contains all designer info, posts, reviews 
router.get("/fan/:id/designers", (req,res)=>{
    Fan.findById(req.params.id)
    .then((fan)=>{
      console.log('fan:',fan)
      // designer info = designer 
      // designer post = designer 
    //   all posts
      Post.find()
      .then((posts)=>{
        console.log('designerPosts', posts)
      })
      res.render("fan/designerProfile.ejs",{fan})
    })
    .catch(err => console.log(err));
  })
  

// router.get('/fan', (req, res) => {
//     res.render('fan/fan.ejs')
// });

// router.get('/fan/signup', (req, res) => {
//     res.render('fan/sign.ejs')
// })

// router.get('/fan/login', (req, res) => {
//     res.render('fan/sign.ejs')
// })

// router.get('/fan/designers', (req, res) => {
//     res.render('fan/designers.ejs')
// })

// router.get('/fan/designer/id', (req, res) => {
//     res.render('fan/profile.ejs')
// })

// router.get('/fan/designer/id', (req, res) => {
//     res.render('fan/profile.ejs')
// })

// router.get('/designer/id/review/new', (req, res) => {
//     res.render('designer/profile.ejs')
// })

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