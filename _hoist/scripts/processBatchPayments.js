'use strict';
var hoist = require('hoist-js');
var _ = require('lodash');
module.exports = function (event,done) {
  var start = new Date();
  start.setHours(-24, 0, 0, 0);
  var end = new Date();
  end.setHours(0, 0, 0, 0);
  new hoist._managers.data('Payment')
    .where('date')
    .gt(start)
    .lt(end)
    .get(function (payments) {
      var customerPayments = _.groupBy(payments, function (payment) {
        return payment.customer;
      });
      _.forEach(customerPayments, function (payments, customer) {
        var invoice = {
          total: 0,
          customer: customer,
          lines: []
        };
        payments.forEach(function (payment) {
          var amount = parseFloat(payment.amount);
          invoice.total = invoice.total + amount;
          invoice.lines.push({
            amount: amount,
            account: 200
          });
        });
        hoist.raise('new.invoice', invoice);
      });
      done();

    });
};
