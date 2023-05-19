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

// app.use((req, res, next) => {
//     User.findById('6466602c86657053d998d308')
//     .then(user => {
//         req.user = new User (user.name, user.email, user.cart, user._id);
//         next();
//     })
//     .catch(err => {
//         console.log(err);
//     });
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(ErrorsController.pageNotFound);

mongoose
.connect('<link>')
.then(result => {
    console.log("Connected");
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
