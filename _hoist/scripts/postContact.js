'use strict';


module.exports = function (ev, done) {
  Hoist.log('got a contact', JSON.stringify(ev.payload));
  done();
};
