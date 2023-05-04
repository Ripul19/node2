const path = require('path');
const express = require('express');
// const expressHbs = require('express-handlebars');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req,res,next) => {
    res.status(404).render('pageNotFound', {pageTitle: 'Page Not Found', path: ''});
});

app.listen(3000);
