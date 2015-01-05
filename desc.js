var maybeComparator = require('./util/maybeComparator');

module.exports = function(comparator) {
  comparator = maybeComparator(comparator);

  return function(a, b) {
    return comparator(b, a);
  };
};
