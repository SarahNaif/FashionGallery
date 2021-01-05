const express = require('express')
const Post = require('../models/post')
const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')

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


const session = require("express-session");
const mongoSessisonStore = require("connect-mongo")(session);

// set the session 
router.use(session({
    store: new mongoSessisonStore({mongooseConnection: mongoose.connection}),
    saveUninitialized: true,
    resave: true,
    secret: "FashionGalleryKey:)",
    // one month
    cookie: { maxAge: 30 * 60 * 1000 },
  }))


//======================================
// Show all posts
//======================================
router.get('/designer', (req, res)=> {
    Post.find()
    .populate('cars')
    .then((posts)=>{
        console.log(posts)
        res.render('designer.ejs', {posts})
    })
    .catch(err => console.log(err))
})
  

//======================================
// create post
//======================================
router.get('/Post/new', (req, res)=> {
    // console.log('show sigup')
    res.render('newPost.ejs');
})

router.post("/Post/new", upload.single('image'),(req, res) => {
    // console.log(req.file)
    let newPost = {
        title: req.body.title,
        content: req.body.content,
        image: '/uploads/' + req.file.filename
        // user : req.session.userId
    };
    console.log('newpost:', newPost)
    Post.create(newPost)
    .then(post => {
        console.log(post)
    })
    .catch(err => console.log(err))
  });


//=========================================
// get post by ID
//======================================
router.get("/post/:id" , (req, res) =>{
    Post.findById(req.params.id)
    .then((post)=>{
        res.render('viewPost', {post})
    })
    .catch(err => console.log(err))
})


//=========================================
// Edit post 
//======================================

// router.post("/Post/new", upload.single('image'),(req, res) => {

router.put('/post/update/:id',  upload.single('image'), (req, res) =>{
    console.log('you are ')
    // let updatedPost = {
    //     title: req.body.title,
    //     content: req.body.content,
    //     image: '/uploads/' + req.file.filename
    //     // user : req.session.userId
    // };
    // Post.findByIdAndUpdate(req.params.id, updatedPost)
    // .then( (post) =>{
    //     res.redirect("/post/:" + post.id)
    // })
    // .catch(err => console.log(err));
})

router.get('/post/edit/:id', (req, res) => {
    Post.findById(req.params.id)
    .then((post)=>{
        res.render('editpost', {post})
    })
    .catch(err => console.log(err))
})

//=========================================
// Delete post 
//======================================
router.delete("/post/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then((post) => {
            res.redirect("/posts");
        })
        .catch(err => console.log(err))
});
// export routes
module.exports = router