var moment = require('moment');

module.exports = function(format) {
  return function(a, b) {
    var momentA = moment(a, format);
    var momentB = moment(b, format);

    if (momentA.isBefore(momentB)) {
      return -1;
    }
    if (momentA.isAfter(momentB)) {
      return 1;
    }
    return 0;
  };
};
