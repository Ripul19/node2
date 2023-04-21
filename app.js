const express = require ('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('/users middleware');
    res.send('<h1>/users middleware</h1>');
   // next();    
});

app.use('/', (req, res, next) => {
    console.log('/ middleware');
    res.send('<h1>/ middleware</h1>');
});


app.listen(3000);
