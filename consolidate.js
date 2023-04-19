const http = require('http');

const server = http.createServer((req, res) => {
    
    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Greetings</title></head>');
        res.write('<h1>Welcome to my website</h1>');
        res.write('<h2>Please enter username</h2>');
        res.write('<body><form action = "/create-user" method = "POST"><label>Firstname</label><br><input type ="text" name = "fname"><br><Button type = "submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Users List</title></head>');
        res.write('<h1>List of the users</h1>');
        res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url !== '/create-user'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>PAGE NOT FOUND</title></head>');
        res.write('<h1>PAGE NOT FOUND !!!</h1>');
        res.write('</html>');
        return res.end();
    }



    if (url === '/create-user' && method === 'POST'){
        const username = []
        req.on('data', (chunk) => {
            username.push(chunk);
        });

        req.on('end', () => {
            const parsedUsername = Buffer.concat(username).toString();
            const finalUsername = parsedUsername.split('=')[1];
            console.log(finalUsername);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    };
});

server.listen(3000);