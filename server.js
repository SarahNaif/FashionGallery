const express = require("express");
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

const app = express();
require('dotenv').config()

const Designer = require('./models/designer')

// linke the Comment, Fan of the models
const Comment = require('./models/comment')
const Fan = require('./models/fan')

const mongoose = require("mongoose");


const session = require("express-session");
const { find } = require("./models/designer");
const mongoSessisonStore = require("connect-mongo")(session);

const validator = require('express-validator')
// move to routes
const methodOverride = require("method-override");
const expressLayouts = require('express-ejs-layouts');


app.set("view engine", "ejs");
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// and populate the req.body object
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
let PORT = process.env.PORT

// set the session 
app.use(session({
  store: new mongoSessisonStore({ mongooseConnection: mongoose.connection }),
  saveUninitialized: true,
  resave: true,
  secret: "FashionGalleryKey:)",
  // one month
  cookie: { maxAge: 30 * 60 * 1000 },
}))

//connect to MongoDb 
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("mongoDb is connect")
})

// related to search
app.use(require('./controllers/designer'))

app.get('/', (req, res) => {

  Designer.find()
    .then(designer => {
      res.render('index.ejs', { designer });

    }).catch(err => console.log(err));

});

// move to designer 
//======================================
// search for designer
//======================================

app.post("/", (req, res) => {
  console.log("search value: ", req.body.Search);

  let searchValue = req.body.Search
  Designer.find({ $text: { $search: searchValue } })
  .then(designer => {
    console.log('searched designer: ', designer)
    res.redirect('/');

  }).catch(err => console.log(err));
    // .then(designers => {
    //   // designers = req.session.Search
    //   console.log('searched designer: ', designers)

    //   res.redirect('index.ejs', { designers })
    // }).catch(err => console.log(err));

});

app.get('/designer', (req, res) => {

  Comment.find()
    .populate('Designer')
    .populate('Fan')
    .then(comment => {
      Designer.find()
        .then(designer => {

          console.log("the data", comment, "the other data", designer)
          res.render('designer.ejs', { comment, designer: designer });

        })

    }).catch(err => console.log(err));
});


//======================================
// show single designer
//======================================
app.get('/designer/:id', (req, res) => {
  var id = req.params.id;

  Comment.findById(id)
    .populate('Designer')
    .populate('Fan')
    .then(comment => {
      console.log("the data", comment)
      res.render('designer.ejs', { comment });
    }).catch(err => console.log(err));

});


//======================================
// add commend form fan
//======================================

app.post('/designer', (req, res) => {
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



// will be removed
app.get('/uploadfile', (req, res) => {
  res.render('file.ejs');
// It's very crucial that the file name matches the name attribute in your html
app.post('/uploadfile', upload.single('file-to-upload'), (req, res) => {
  console.log(req.file)
  res.redirect('/');
});

// app.get('/designer', (req, res) => {
//   res.render('designer.ejs');
// });

//connect to MongoDb 
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("mongoDb is connect")
  })
  
app.use(require('./controllers/designer'))
app.use(require('./controllers/post'))
  
// CONNECTIONS
app.listen(PORT, () => console.log(`server is running ${PORT}`));