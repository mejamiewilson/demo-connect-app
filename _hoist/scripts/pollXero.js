'use strict';
var request = require('request');
module.exports = function(ev,done){
  console.log('in poll xero');
  request.get('http://proxyhoiio.ngrok.com')
  .on('error', function(err) {
    console.log('error during request',err);
    done();
  }).on('response',function(response){
    console.log('got response',response);
    done();
  });
};
