'use strict';

var request = require('request');

module.exports = function (ev, done) {
  Hoist.log('inside postContact', ev);
  request({
    url: 'http://proxyhoiio.ngrok.com',
    method: 'POST',
    json: ev.payload
  }, function (err, response) {
    Hoist.log('response status', response.statusCode);
    Hoist.log('error', err);
    done();
  });
};

