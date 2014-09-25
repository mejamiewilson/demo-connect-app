'use strict';
var sinon = require('sinon');
var hoist = require('hoist-js');
var expect = require('chai').expect;
describe('processBatchPayments', function () {
  describe('with payments saved', function () {
    before(function () {
      var payments = [{
        amount:'9900',
        customer:'test@hoi.io',
        date:'2012-09-09 11:38:32 -0400'
      },{
        amount:'5500',
        customer:'test@hoi.io',
        date:'2012-09-09 12:38:32 -0400'
      }];
      sinon.stub(hoist._managers.query.prototype,'get').callsArgWith(0,payments);
      hoist.raise = sinon.spy();
      require('../../_hoist/scripts/processBatchPayments')();
    });
    it('should get payments',function(){
      /*jshint -W030*/
      expect(hoist._managers.query.prototype.get)
      .to.have.been.called;
    });
    it('should raise an invoice event',function(){
      expect(hoist.raise)
      .to.have.been.calledWith('new.invoice',{
        total:15400,
        customer:'test@hoi.io',
        lines:[{
          amount:9900,
          account:200
        },
        {
          amount:5500,
          account:200
        }]
      });
    });
  });
});
