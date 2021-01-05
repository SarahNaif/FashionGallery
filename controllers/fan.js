const express = require('express')

const mongoose = require("mongoose");
const router = express.Router()
const validator = require('express-validator')

const Designer = require('../models/designer')
const Comment = require('../models/comment')
const Fan = require('../models/fan')
const Post = require('../models/post')




router.get('/fan', (req, res) => {
    res.render('fan.ejs')
});

router.get('/fan/signup', (req, res) => {
    res.render('/fan/sign.ejs')
})

router.get('/fan/login', (req, res) => {
    res.render('/fan/sign.ejs')
})

router.get('/fan/designers', (req, res) => {
    res.render('/fan/designers.ejs')
})

router.get('/fan/designer/id', (req, res) => {
    res.render('/fan/profile.ejs')
})

router.get('/fan/designer/id', (req, res) => {
    res.render('/fan/profile.ejs')
})

router.get('/designer/id/review/new', (req, res) => {
    res.render('/designer/profile.ejs')
})


// export routes
module.exports = router