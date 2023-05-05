const path = require('path');
const express = require('express');
const rootDir = require('./util/path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const mainRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

//use to give staticly served files like css
app.use(express.static(path.join(rootDir, 'public')));

app.use(mainRoutes.routes);
app.use(userRoutes);

app.use((req,res,next) => {
    res.status(404).render('404',{pageTitle: 'Error Page', path: ''});
})

app.listen(3000);