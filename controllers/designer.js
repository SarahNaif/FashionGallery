const express = require('express')
const Designer = require('../models/designer')
const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')


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
// to get to Designer/new
//======================================
router.get('/Designer/new', (req, res)=> {
    // console.log('show sigup')
    res.render('SignUp.ejs');
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

    console.log('info',req.body.name,req.body.password, req.body.email)
    Designer.createSecure(req.body.email, req.body.password, req.body.name, 'female', (err, newUser)=> {
      // adding the session of user
      req.session.userId = newUser._id;
      console.log(req.session.userId)
    //   res.redirect('/')
    })
  });


//======================================
// View Designer Profile by id
//======================================
// get 
// find by id 
// render + data to send to the web page
router.get("/designer/:id", (req,res)=>{
  Designer.findById(req.params.id)
  .then((designers)=>{
    res.render("editProfile",{designer : designers})
  })
  .catch(err => console.log(err));
})
// podile.ejs
// export routes
module.exports = router