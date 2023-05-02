const path = require('path');
const express = require('express');
const rootDir = require('./util/path');

const mainRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = express();
//use to give staticly served files like css
app.use(express.static(path.join(rootDir, 'public')));

app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000);