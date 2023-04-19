const http = require('http');
const fs = require('fs');

//ways to write createserver
//function rqListener(req , res){}  
// http.createServer(rqListener);
//http.createServer(function (req, res){});

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);
   // process.exit(2000);
   const url = req.url;
   const method = req.method;
   if(url ==='/'){
    res.write('<html>');
   res.write('<head><title>Enter Message</title></head>');
   res.write('<body><form action="/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body>');
   res.write('</html>');
   return res.end(); 
   }
if (url === '/message' && method === 'POST'){
    const body = []
    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
    });

   return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile ('message.txt', message, (err) => {
            res.statusCode = 302;
    res.setHeader('Location','/');
    return res.end();
        }); 
    });

   /* res.statusCode = 302;
    res.setHeader('Location','/');
    return res.end();*/
    
}

   res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
   res.write('<head><title>My First Page</title></head>');
   res.write('<body><h1>Hello from Node.js server!</h1></body>');
   res.write('</html>');
   res.end(); 
});

server.listen(3000);

//after running the upper code the program was never closed because of "Event Listeners"
//Program keeps on running as long as there are event listeners registered
