const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')
const Designer = require('../models/designer')
const Comment = require('../models/comment')
const Fan = require('../models/fan')
const Post = require('../models/post')
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.png')
  }
})

var upload = multer({ storage: storage })




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
      // req.session.userId = newUser.id;
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
        res.redirect('/fan/'+foundFan.id+'/profile')
      }
    })
  })

//======================================
// View Fan Profile by id
//======================================
// this route contains all designer info, posts, reviews 
router.get("/fan/:id/profile", (req,res)=>{
  designer = undefined
    Fan.findById(req.params.id)
    .then((fan)=>{
        Post.find()
        .then((posts)=>{
          // console.log('designerPosts', posts)
          res.render("fan/profile.ejs",{fan, posts, designer})
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  })
  
  
//======================================
// add commend form fan
//======================================
router.post('/designer', (req, res) => {
  console.log("the commend: ", req.body.commend)

  let newCommend = {
    content: req.body.commend,
    rate: req.query.amount,
    fan: req.session.userId,
    designer: req.params.id
  }

  Comment.create(newCommend)
    .then(commend => {
      console.log("creating commend: ", Comment)
      res.redirect('/designer', { commend })
    }).catch(err => console.log(err));
  })
      
  //======================================
// search for designer
//======================================

router.post("/search", (req, res) => {
  console.log("search value: ", req.body.Search);

  let searchValue = req.body.Search
  Designer.find({ $text: { $search: searchValue } })
  .then(designer => {

    console.log('searched designer: ', designer)
    
    // res.redirect('/fan/'+req.session.userId+'/profile', { designer })
    res.render('fan/profile.ejs', { designer })

  }).catch(err => console.log(err));
});

// edit post 
// /designer/id/post/id/edit
router.put("/fan/:id/profile/edit",upload.single('image'), (req,res)=>{
  let updatedProfile = {
    email: req.body.email,
    passwordDigest: '123456',
    name: req.body.name,
    image: '/uploads/' + req.file.filename
  };
  console.log('updatedProfile',updatedProfile)
  Designer.findByIdAndUpdate((req.params.id, updatedProfile))
  .then( (designer) =>{
    req.session.userId = foundFan.id;
    res.redirect('/fan/'+foundFan.id+'/profile')
    })
    .catch(err => console.log(err));
});


// router.put('/fan/:id/profile/edit', upload.single('image'), (req, res) =>{
//   console.log('you are ////////////////////////////////////////////////////')

//   let updatedfan = {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       image: '/uploads/' + req.file.filename
//   };
//   console.log('updatedPost', updatedfan)
//   Fan.findByIdAndUpdate(req.params._id, updatedPost)
//   .then( (fan) =>{
//     req.session.userId = foundFan.id;
//     res.redirect('/fan/'+foundFan.id+'/profile')
//   })
//   .catch(err => console.log(err));
// })

// export routes
module.exports = router