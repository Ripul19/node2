const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

//function is passing to a funcation which passes commands to the middleware
// app.use((req, res, next) => {
//     console.log('In the middleware!');
//     next();  //next is called to pass it to next middleware in line 
// });

app.use('/add-product', (req, res, next) => {
    res.send('<body><form action = "/product" method = "POST"><label>Firstname</label><br><input type ="text" name = "fname"><br><Button type = "submit">Submit</button></form></body>');
});

//app.get and app.post can also be used just to specify which reuest will hit during the get and post time
app.post('/product', (req, res, next) => {
    //const obj = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/');
});

//pass path to the function
app.use('/', (req, res, next) => {
   // console.log('In the middleware 2!');
    res.send('<h1> / middleware</h1>');
});

//It internally creates the server itself
app.listen(3000);


