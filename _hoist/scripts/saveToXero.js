'use strict';
var xero = Hoist.connector('xero');

module.exports = function (event,done) {
  var invoice = event.payload;
  //put the new invoice
  xero.put('/invoice', invoice, function (err) {
    if (err) {
      //these two lines do the same thing in that they both log an error message
      hoist.error(err);
      //this one will also mark the module run as failed with an error
      throw err;
    } else {
      hoist.raise('save:invoice:done', invoice);
    }
    done();
  });

};
