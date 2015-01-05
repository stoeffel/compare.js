var maybeComparator = require('./util/maybeComparator');

module.exports = function(property, comparator) {
  comparator = maybeComparator(comparator);

  return function(a, b) {
    return comparator(a[property], b[property]);
  };
};
