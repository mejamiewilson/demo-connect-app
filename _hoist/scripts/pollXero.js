'use strict';
var request = require('request');
module.exports = function (ev, done) {
  console.log('in poll xero');
  Hoist.connector('hoist-connector-xero', 'xero')
  .get('/contacts')
  .then(function (result) {
    console.log('result:', result);
    request.post('http://proxyhoiio.ngrok.com', {
        form: {
          xero: result
        }
      })
      .on('error', function (err) {
        console.log('error during request', err);
        done();
      }).on('response', function (response) {
        console.log('got response', response);
        done();
      });
  }).catch(function (err) {
    console.log('error with xero connector', err);
    done();
  });
};
