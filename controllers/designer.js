const express = require('express')
const Designer = require('../models/designer')
const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')


// const session = require("express-session");
// const mongoSessisonStore = require("connect-mongo")(session);

// // set the session 
// router.use(session({
//   store: new mongoSessisonStore({ mongooseConnection: mongoose.connection }),
//   saveUninitialized: true,
//   resave: true,
//   secret: "FashionGalleryKey:)",
//   // one month
//   cookie: { maxAge: 30 * 60 * 1000 },
// }))



//======================================
// to get to Designer/new
//======================================
router.get('/Designer/new', (req, res) => {
  // console.log('show sigup')
  res.render('SignUp.ejs');
})






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