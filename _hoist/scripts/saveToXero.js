'use strict';
var hoist = require('hoist-js');
var xero = hoist.connector('xero', 'eljrs');
module.exports = function (event) {
  var invoice = event.payload;
  //put the new invoice
  xero.put('/invoice', invoice, function (err) {
    if (err) {
      hoist.error(err);
      throw err;
    } else {
      hoist.raise('save.invoice.done', invoice);
    }
  });
};
