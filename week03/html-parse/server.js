const  http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.log(err);
  }).on('data', (chunk) => {
    body.push(chunk.toString());
  }).on('end', () => {
    // body = Buffer.concat(body).toString();
    body = body.join("");
    console.log("body:", body);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(`
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <style>
        body div #myid {
          width: 80px;
        }

        body div #myid.my-img {
          width: 100px;
          background-color: #ff5000;
        }
        body div img {
          width: 30px;
          background-color: #ff1111;
        }
    
      </style>
    </head>
    <body>
        <div>
          <img id="myid" class="my-img" />
          <img />
        </div>
    </body>
    </html>    
    `);
  });
}).listen(8088);

console.log("server started");
``