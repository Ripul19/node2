const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1];
    res.render('auth/login', {pageTitle: 'Login', path:'/login', isAuthenticated: req.session.isLoggedIn});
    
};

exports.postLogin = (req, res, next) => {
    
    User.findById('6468b3f2bbad3613eb57cebd')
    .then(user => {
    req.session.isLoggedIn = true;
    // req.user = new User (user.name, user.email, user.cart, user._id);
    req.session.user = user;
    req.session.save(err => {
        console.log(err);
        res.redirect('/');
    });
    })
    .catch(err => {
    console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
    
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
};