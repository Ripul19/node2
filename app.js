const http = require('http');
const routes = require('./routes');


//const server = http.createServer(routes);

const server = http.createServer(routes.handler);
console.log(routes.someText);

/*const server = http.createServer(routes.handler);
console.log(routes.someText); */

server.listen(3000);

//after running the upper code the program was never closed because of "Event Listeners"
//Program keeps on running as long as there are event listeners registered
