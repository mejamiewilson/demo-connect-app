'use strict';
var _ = require('lodash');
var paymentData = Hoist.data("Payment");

module.exports = function (event,done) {
  
  paymentData.get().then(function(payments) {

    var promises = [];
    _.each(payments, function(p) {
      var invoice = {
        //translate p into invoice
      };
      promises.push(Hoist.event.raise('saveToXero', invoice));
    });
    return Hoist.promise.all(promises);

  }).then(function() {

    return paymentData.delete({});

  }).nodeify(done);
};
