const http = require('http');
const fs = require('fs');
const path = require('path')

const server = http.createServer()
server.on('request', (req, res) => {
  if (req.url === '/') {
    // /route
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(`
        <h1>Hello Node!</h1>
        <a href="/read-message">Read Message</a>
        <a href="/write-message">Write Message</a>
    `)
    res.end();
  } 

  if (req.url === '/write-message') {
    if (req.method === 'GET') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.write(`
        <form method="post" action="/write-message">
          <label for="message">Message</label>
          <input type="text" id="message" name="message">
          <input type="submit" value="Submit">
        </form>
    `);
    res.end();
    }else if (req.method === 'POST') {
      let body = [];
    
      req
        .on('data', (chunk) => {body.push(chunk);})
        .on('end', () => {
          const data = Buffer.concat(body).toString();
          const message = data.split('=')[1];
          fs.writeFile('message.txt', message, (err) => {
            if (err) throw err;
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
          });
        });
    } 
  }

  if (req.url === '/read-message') {
    // read-message  route
    fs.readFile('message.txt', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data, "utf-8");
      }
    });
  } 

})


server.listen(8000, () => {
  console.log('Server is running !!');
});


