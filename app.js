const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');
const ErrorsController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

//in mongoose findById is mthod provided but for mongodb find byid was created manually
app.use((req, res, next) => {
    User.findById('6468b3f2bbad3613eb57cebd')
    .then(user => {
        // req.user = new User (user.name, user.email, user.cart, user._id);
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(ErrorsController.pageNotFound);

mongoose
.connect('<link>')
.then(result => {
    return User.findOne()
    .then(user => {
        if(!user){
            const user = new User({
                name: 'RK',
                email: 'test@test.com',
                cart: {
                    items:[]
                }
            });
            console.log('User Created');
            return user.save();
        }
        return user;
    })
})
.then(user => {
    //console.log(user);
    console.log("Connected");
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
