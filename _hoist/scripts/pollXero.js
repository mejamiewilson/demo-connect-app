'use strict';

//var BBPromise = require('bluebird');
//var _ = require('lodash');


module.exports = function (ev, done) {
  Hoist.log('in poll xero').then(function(){

  return Hoist.connector('hoist-connector-xero', 'xero')
    .get('/contacts')
    .then(function () {
      /*
      if (result.Response.Contacts.Contact) {
        var eventsRaised = _.map(result.Response.Contacts.Contact, function (contact) {
          return Hoist.events.raise('xero:contact', {
            contact: contact
          });
        });
        return BBPromise.all(eventsRaised);

      }
      */
      return Hoist.log('got response from xero');

    }).catch(function (err) {
      Hoist.log('error with xero connector', err);
    });
  }).nodeify(done);
};

