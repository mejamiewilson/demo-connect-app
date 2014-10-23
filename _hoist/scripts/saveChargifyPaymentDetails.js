'use strict';
//recieve payment info from chargify
//save payment to unprocessed batch collection
//a payment looks like /test/fixtures/demoPayload.json
var hoist = require('hoist-js');

module.exports = function (ev,done) {
  var payment = {};

  payment.amount = ev.payload.transaction.amount_in_cents;
  payment.date = ev.payload.transaction.created_at;
  payment.customer = ev.payload.subscription.customer.email;

  hoist.post('Payment', payment);
  done();
};
