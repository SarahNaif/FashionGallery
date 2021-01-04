const express = require("express");
const app = express();
require('dotenv').config()


const mongoose = require('mongoose')
const methodOverride = require("method-override");
const expressLayouts = require('express-ejs-layouts');

// and populate the req.body object
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(expressLayouts) 
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); 

let PORT = process.env.PORT


app.get('/', (req, res) => {
  res.render('index.ejs');
});


  app.get('/edit', (req, res) => {
    res.render('editpost.ejs');
  });

// app.get('/signup', (req, res) => {
//   res.render('SignUp.ejs');
// });

app.get('/designer', (req, res) => {
  res.render('designer.ejs');
});

//connect to MongoDb 
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("mongoDb is connect")
  })
  
  app.use(require('./controllers/designer'))
  

// CONNECTIONS
app.listen(PORT, () => console.log(`server is running ${PORT}`));