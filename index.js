var moment = require('moment');
var compare = module.exports;

function maybeComparator(comparator) {
  return comparator || compare.simple();
}

compare.simple = function() {
  return (function(a, b) {
    return (a < b)?-1: (a === b)?0: 1;
  });
};

compare.date = function() {
  return (function(a, b) {
    var momentA = moment(a);
    var momentB = moment(b);

    if (momentA.isBefore(momentB)) {
      return -1;
    }
    if (momentA.isAfter(momentB)) {
      return 1;
    }
    return 0;
  });
};

compare.property = function(property, comparator) {
  comparator = maybeComparator(comparator);

  return (function(a, b) {
    return comparator(a[property], b[property]);
  });
};

compare.caseInsensitive = function(comparator) {
  comparator = maybeComparator(comparator);

  return (function(a, b) {
    return comparator(a.toLowerCase(), b.toLowerCase());
  });
};

compare.desc = function(comparator) {
  comparator = maybeComparator(comparator);

  return (function(a, b) {
    return comparator(b, a);
  });
};
