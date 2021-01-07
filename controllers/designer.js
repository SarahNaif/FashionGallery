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
router.get('/designer/signup', (req, res) => {
  res.render('designer/signup.ejs');
})

//======================================
// create a new Designer
//======================================
router.post(
  "/Designer/new",
  validator.body('email').isEmail(),
  validator.body('password').isLength({min: 5}),

(req, res) => {
  console.log('trying to signup????')

  const validationErrors = validator.validationResult(req);
  if(!validationErrors.isEmpty()) return res.status(500).send('validation error')

  console.log('info',req.body.name,req.body.password, req.body.email, req.body.gender)
  Designer.createSecure(req.body.email, req.body.password, req.body.name, req.body.gender, (err, newUser)=> {
    // adding the session of user
    req.session.userId = newUser.id;
    console.log(req.session.userId)
    res.redirect('/designer/login')
  })
});

//======================================
// show login 
//======================================
router.get('/designer/login', (req, res) => {
  res.render('designer/login.ejs');
})

//======================================
// login & Auth
//======================================
router.post('/designer/login', (req, res) => {
  console.log('email and pass:', req.body.email, req.body.password);
  // // Auth
  Designer.Auth(req.body.email, req.body.password, (err, foundDesigner)=>{
    if(err){
      console.log('Auth error: ', err)
      res.status(500).send(err)
    }else{
      req.session.userId = foundDesigner.id;
      res.redirect('/designer/'+foundDesigner.id+'/profile', )
    }
  })
})

//======================================
// View Designer Profile by id
//======================================

// this route contains all designer info, posts, reviews 
router.get("/designer/:id/profile", (req,res)=>{
  Designer.findById(req.params.id)
  .then((designer)=>{
    Comment.find({'designer': designer.id})
    .then((comment)=>{
      Post.find({'designer': designer.id})
      .then((designerPosts)=>{
        res.render("designer/profile.ejs",{designer, designerPosts, comment})
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
})

router.get("/designer-new", (req,res)=>{
  res.render("designer/profile.ejs")

})
// add new post for the designer
router.post("/designer/:id/post/new",upload.single('image'),(req, res) => {
  // console.log(req.file)
  let newPost = {
      title: req.body.title,
      content: req.body.content,
      image: '/uploads/' + req.file.filename,
      designer : req.params.id
  };
  console.log('newpost:', newPost)
  Post.create(newPost)
  .then(post => {
      console.log(post)
      // without reloading
      return res.redirect('back');
  })
  .catch(err => console.log(err))
});

// edit post 
// /designer/id/post/id/edit
router.put('/designer/:id/post/:pid/edit', upload.single('image'), (req, res) =>{
  console.log('you are ////////////////////////////////////////////////////')
  console.log('req.body.title', req.body.title)
  let updatedPost = {
      title: req.body.title,
      content: req.body.content,
      image: '/uploads/' + req.file.filename
  };
  console.log('updatedPost', updatedPost)
  Post.findByIdAndUpdate(req.params.pid, updatedPost)
  .then( (post) =>{
    res.redirect('back');
  })
  .catch(err => console.log(err));
})

//======================================
// Edit Designer Profile
//======================================
router.put("/designer/:id/profile/edit",upload.single('image'), (req,res)=>{
  let updatedProfile = {
    email: req.body.email,
    passwordDigest: '123456',
    name: req.body.name,
    gender: req.body.gender,
    image: '/uploads/' + req.file.filename,
    phone: req.body.phone,
    city: req.body.city,
    address: req.body.address,
    bio : req.body.bio,
  };
  console.log('updatedProfile',updatedProfile)
  Designer.findByIdAndUpdate((req.params.id, updatedProfile))
  .then( (designer) =>{
    // refresh the page
        // res.redirect("/post/:" + designer.id)
    })
    .catch(err => console.log(err));
});


// export routes
module.exports = router