'use strict';
var BBPromise = require('bluebird');
var _ = require('lodash');
module.exports = function (ev, done) {
  console.log('in poll xero');
  Hoist.connector('hoist-connector-xero', 'xero')
    .get('/contacts')
    .then(function (result) {
      if (result.Response.Contacts.Contact) {
        var eventsRaised = _.map(result.Response.Contacts.Contact, function (contact) {
          return Hoist.events.raise('xero:contact', {
            contact: contact
          });
        });
        return BBPromise.all(eventsRaised);

      }
    }).catch(function (err) {
      console.log('error with xero connector', err);
    }).nodeify(done);
};
