'use strict';

var BBPromise = require('bluebird');
var _ = require('lodash');


module.exports = function (ev, done) {
  Hoist.log('in poll xero').then(function () {

    return Hoist.connector('hoist-connector-xero', 'xero')
      .get('/contacts')
      .then(function (result) {

        if (result.Response.Contacts.Contact) {
          var index = 0;
          var eventsRaised = _.map(result.Response.Contacts.Contact, function (contact) {
            console.log('raising event',index);
            return Hoist.events.raise('xero:contact', {
              contact: contact,
              number: index++
            }).catch(function (err) {
              return Hoist.log('unable to raise event', index, err.message);
            });
          });
          return BBPromise.all(eventsRaised).then(function () {
            return Hoist.log('recieved', result.Response.Contacts.Contact.length, 'contacts');
          });

        }
        return Hoist.log('got response from xero');

      });
  }).nodeify(done);
};
