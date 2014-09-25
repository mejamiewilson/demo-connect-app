'use strict';
require('../bootstrap.js');
var script = require('../../_hoist/scripts/saveChargifyPaymentDetails');
var sinon = require('sinon');
var hoist = require('hoist-js');
var expect = require('chai').expect;
describe('saveChargifyPaymentDetails', function () {
  describe('with full payload', function () {
    var payload = require('../fixtures/demoChargifyPayload.json');
    before(function () {
      sinon.stub(hoist, 'post');
      script(payload);
    });
    it('should save a payment to data', function () {
      expect(hoist.post)
        .to.be.calledWith('Payment', {
          date: '2012-09-09 11:38:33 -0400',
          amount: '9900',
          customer: 'john@example.com'
        });
    });
  });
});
