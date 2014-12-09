'use strict';

//var BBPromise = require('bluebird');
//var _ = require('lodash');


module.exports = function (ev, done) {
  //Hoist.log('in poll xero', ev).then(function () {
  return Hoist.connector('xero-public')
    .authorize(ev._request.query.token)
    .get('/contacts')
    .then(function (result) {
      return Hoist.log('got response from xero', result);
    }).nodeify(done);
};
