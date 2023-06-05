const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = '<LINK>';

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');
const ErrorsController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));

//session middleware
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));

//in mongoose findById is mthod provided but for mongodb find byid was created manually

app.use((req, res, next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
    req.user = user;
    next();
    })
    .catch(err => {
    console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(ErrorsController.pageNotFound);

mongoose
.connect(MONGODB_URI)
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
