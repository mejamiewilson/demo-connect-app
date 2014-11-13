'use strict';
var http = require('http');

var server = http.createServer(function (req, res) {
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('okay');
    console.log(body);
  });

});

server.listen(3012);
