const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('../util/path');

const users = [];

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req,res,next) => {
    // res.sendFile(path.join(rootDir,'views','index.html'));
    res.render('index',{pageTitle: 'Home', path: '/'});
});

router.post('/', (req,res,next) => {
    users.push({Firstname: req.body.fname});
    
    res.redirect('/users');
});

exports.routes= router;
exports.users= users;