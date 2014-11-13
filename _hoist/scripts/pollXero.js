'use strict';
var request = require('request');
module.exports = function(ev,done){
  console.log('in poll xero');
  request('http://proxyhoiio.ngrok.com',function(){
    done();
  });
};
