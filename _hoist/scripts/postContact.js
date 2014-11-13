'use strict';
var request = require('request');

module.exports = function(ev,done){
  console.log('inside postContact',ev);
  request.post('http://proxyhoiio.ngrok.com',{json:ev.payload},done);
};
