'use strict';


module.exports = function (ev, done) {
  Hoist.log('got a contact', ev.payload.number, JSON.stringify(ev.payload.contact.ContactID)).then(function () {
    return Hoist.data('Contact').save(ev.payload);
  }).nodeify(done);
};
