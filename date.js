var moment = require('moment');

module.exports = function() {
  return function(a, b) {
    var momentA = moment(a);
    var momentB = moment(b);

    if (momentA.isBefore(momentB)) {
      return -1;
    }
    if (momentA.isAfter(momentB)) {
      return 1;
    }
    return 0;
  };
};
