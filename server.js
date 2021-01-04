  const express = require("express");
  const app = express();

  const expressLayouts = require('express-ejs-layouts');
  port =4000;


  app.set("view engine", "ejs");
  app.use(expressLayouts) 
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public")); 



  app.get('/', (req, res) => {
    res.render('index.ejs');
  });


  app.get('/signup', (req, res) => {
    res.render('SignUp.ejs');
  }); // add }); because of SyntaxError: Unexpected end of input

  app.get('/designer', (req, res) => {
    res.render('designer.ejs');
  });

  app.get('/editDesignerProfile', (req, res) => {
    res.render('editProfile.ejs');
  });



// CONNECTIONS
app.listen(port, () => {
    console.log('listening on port: ', port);
  });