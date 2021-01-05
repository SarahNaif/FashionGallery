const express = require('express')

const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')

const Designer = require('../models/designer')
const Comment = require('../models/comment')
const Fan = require('../models/fan')
const Post = require('../models/post')




router.get('/designer', (req, res) => {

  Comment.find()
    .populate('Designer')
    .populate('Fan')
    .then(comment => {
      Designer.find()
        .then(designer => {
          Post.find()
            .then((post) => {
              res.render('designer/designer.ejs', { comment, designer, post })
            })
        })
    }).catch(err => console.log(err));
});


router.get('/designer/signup', (req, res) => {
  res.render('designer/sign.ejs')
})

router.get('/designer/login', (req, res) => {
  res.render('designer/sign.ejs')
})

router.get('/designer/id/profile', (req, res) => {
  res.render('designer/profile.ejs')
})

router.get('/designer/id/profile/edit', (req, res) => {
  res.render('designer/profile.ejs')
})

//view all post
router.get('/designer/id/post/id', (req, res) => {
  res.render('designer/post.ejs')
})

//to discuss
router.get('/designer/id/post/new', (req, res) => {
  res.render('designer/post.ejs')
})

router.get('/designer/id/post/id/edit', (req, res) => {
  res.render('designer/post.ejs')
})

router.get('/designer/id/post/id/delete', (req, res) => {
  res.render('designer/post.ejs')
})

router.get('/designer/id/posts', (req, res) => {
  res.render('designer/post.ejs')
})

router.get('/designer/id/review', (req, res) => {
  res.render('designer/profile.ejs')
})


//======================================
// add commend form fan
//======================================

router.post('/designer', (req, res) => {
  console.log("the commend: ", req.body.commend)

  let newCommend = {
    content: req.body.commend
    // ,
    // fan: req.session.userId,
    // designer: 
  }

  Comment.create(newCommend)
    .then(commend => {
      console.log("creating commend: ", Comment)
      res.redirect('/designer', { commend })
    }).catch(err => console.log(err));

});






//======================================
// to get to Designer/new
//======================================
// router.get('/Designer/new', (req, res) => {
//   // console.log('show sigup')
//   res.render('SignUp.ejs');
// })



//======================================
// View Designer Profile by id
//======================================
// get 
// find by id 
// render + data to send to the web page
// router.get("/designer/:id", (req,res)=>{
//   Designer.findById(req.params.id)
//   .then((designers)=>{
//     res.render("editProfile",{designer : designers})
//   })
//   .catch(err => console.log(err));
// })




//======================================
// show single designer
//======================================
// router.get('/designer/:id', (req, res) => {
//   var id = req.params.id;

//   Comment.findById(id)
//     .populate('Designer')
//     .populate('Fan')
//     .then(comment => {
//       console.log("the data", comment)
//       res.render('designer.ejs', { comment });
//     }).catch(err => console.log(err));

// });


// export routes
module.exports = router