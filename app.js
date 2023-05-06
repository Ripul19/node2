const path = require('path');
const express = require('express');
// const expressHbs = require('express-handlebars');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
const ErrorsController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(ErrorsController.pageNotFound);

app.listen(3000);
