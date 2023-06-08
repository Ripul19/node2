const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const MONGODB_URI = '<LINK>';

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

const csrfProtection = csrf();

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
app.use(express.urlencoded({ extended: false }));
app.use(csrfProtection);
app.use(flash());

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

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

//routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(ErrorsController.pageNotFound);

mongoose
.connect(MONGODB_URI)
.then(result => {
    //console.log(user);
    console.log("Connected");
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
