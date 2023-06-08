const bycrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '<apikey>'
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length>0) {
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/login', {pageTitle: 'Login', path:'/login', errorMessage: message});
    
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email})
    .then(user => {
        if(!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }
        bycrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }else {
                req.flash('error', 'Invalid email or password');
                return res.redirect('/login');
            }
            
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
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

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if(message.length>0) {
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message
    });
};
  
exports.postSignup = (req, res, next) => {
    const email= req.body.email;
    const password= req.body.password;
    const confirmPassword= req.body.confirmPassword;
    User.findOne({email: email})
    .then(userDoc => {
        if(userDoc){
            req.flash('error', 'Email already exists, Please pick different one.');
            return res.redirect('/signup');
        }
        return bycrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            //verify the sender details on send grid first and put the from address same as you put here
            return transporter.sendMail({
                to: email,
                from:'tpn56973@zbock.com',
                subject: 'Signup Succeeded!',
                html: '<h1>Sign Up Successful</h1>'  
            });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if(message.length>0) {
        message = message[0];
    }
    else{
        message = null;
    }
    res.render('auth/reset', {path:'/reset', pageTitle: 'Reset Password', errorMessage: message});
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err) {
            console.log(err);
            req.flash('error', 'Something went wrong, Please try again.');
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email})
        .then(user => {
            if(!user){
                req.flash('error', 'No account found.');
                return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
        })
        .then(result => {
            res.redirect('/');
            return transporter.sendMail({
                to: req.body.email,
                from:'tpn56973@zbock.com',
                subject: 'Password Reset',
                html: `
                <p>You requested a password reset.</p>
                <p> Click on this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                <p> This token is only valid valid for 1 hour.</p>`  
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()} })
    .then(user => {

        let message = req.flash('error');
        if(message.length>0) {
            message = message[0];
        }
        else{
            message = null;
        }
        res.render('auth/password', 
        {
            path:'/new-password', 
            pageTitle: 'New Password', 
            errorMessage: message, 
            userId: user._id.toString(), 
            passwordToken: token
        });
    })
    .catch(err => {
        console.log(err);
    });
};

// exports.postNewPassword= (req, res, next) => {
//     const newPassword= req.body.password;
//     const userId = req.body.userId;
//     const token = req.body.passwordToken;
//     let resetUser;
//     User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()}, _id: userId })
//     .then(user => {
//         resetUser = user;
//         return bycrypt.hash(newPassword, 12);
//     })
//     .then(hashedPassword => {
//         resetUser.password = hashedPassword;
//         resetUser.resetToken = undefined;
//         resetUser.resetTokenExpiration = undefined;
//         return resetUser.save();
//     })
//     .then(result => {
//         res.redirect('/login');
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

exports.postNewPassword= (req, res, next) => {
    const newPassword= req.body.password;
    const userId = req.body.userId;
    const token = req.body.passwordToken;
    let resetUser;
    User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()}, _id: userId })
    .then(user => {
        resetUser = user;
        return bycrypt.compare(newPassword, user.password);
    })
    .then(doMatch => {
        if(doMatch){
            req.flash('error', 'Please enter a password different from last password.');
            return res.redirect('back');
        }else {
            return bycrypt.hash(newPassword, 12);
        }
    })
    .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
    .then(result => {
        console.log("Passwprd Updated");
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    });
};