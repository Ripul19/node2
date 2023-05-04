const path = require('path');
const express = require('express');
// const expressHbs = require('express-handlebars');
const app = express();

//used for pug 
// app.set('view engine', 'pug');

//used when not using default layout for handlebars
// app.engine('hbs', expressHbs.engine({extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/"}));

//default layout for handlebars
// app.engine('hbs', expressHbs.engine({extname: "hbs", defaultLayout: "main-layout.hbs", layoutsDir: "views/layouts/"}));
// app.set('view engine', 'hbs');

//for ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req,res,next) => {
    //used for general html files
    // res.status(404).sendFile(path.join(__dirname, 'views','pageNotFound.html'));
    
    //used for pug files
    // res.status(404).render('pageNotFound', {pageTitle: 'Page Not Found'});

    //used for handlebars
    //res.status(404).render('pageNotFound', {pageTitle: 'Page Not Found'});

    //for ejs
    res.status(404).render('pageNotFound', {pageTitle: 'Page Not Found', path: ''});
});

app.listen(3000);
