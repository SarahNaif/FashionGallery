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


  app.get('/designer', (req, res) => {
    res.render('designer.ejs');
  });

  app.get('/addComment', (req, res) => {
    res.render('addComment.ejs');
  });



// CONNECTIONS
app.listen(port, () => {
    console.log('listening on port: ', port);
  });