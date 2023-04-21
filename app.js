const express = require('express');

const app = express();

//function is passing to a funcation which passes commands to the middleware
// app.use((req, res, next) => {
//     console.log('In the middleware!');
//     next();  //next is called to pass it to next middleware in line 
// });

app.use('/123', (req, res, next) => {
    console.log('This always runs');
    next();
});

app.use('/qwerty', (req, res, next) => {
    console.log('In the middleware');
    res.send('<h1> Hello from express1</h1>');
});

//pass path to the function
app.use('/', (req, res, next) => {
    console.log('In the middleware 2!');
    res.send('<h1> Hello from express</h1>');
});

//It internally creates the server itself
app.listen(3000);


