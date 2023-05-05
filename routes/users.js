const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('../util/path');
const mainRoutes = require('./index');

const router = express.Router();

const users= mainRoutes.users;

router.get('/users', (req,res,next) => {

    res.render('users', {user:users, pageTitle:'User List', path:'/users'});
    //res.sendFile(path.join(rootDir,'views','users.html'));
});

module.exports = router;