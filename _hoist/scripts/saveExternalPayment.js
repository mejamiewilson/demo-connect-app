'use strict';
//recieve payment info from an endpoint
//save payment to unprocessed batch collection

module.exports = function (ev,done) {
  var payment = {};

  payment.amount = ev.payload.amount;
  payment.date = ev.payload.date;
  payment.customer = ev.payload.customer;

  var paymentData = Hoist.data("Payment");

  paymentData.post(payment).nodeify(done);

};

