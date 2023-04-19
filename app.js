const http = require('http');

//ways to write createserver
//function rqListener(req , res){}  
// http.createServer(rqListener);
//http.createServer(function (req, res){});

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);
   // process.exit(2000);
   const url = req.url;
   const method = req.method;
  
});

server.listen(3000);

//after running the upper code the program was never closed because of "Event Listeners"
//Program keeps on running as long as there are event listeners registered
