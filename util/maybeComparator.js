var simple = require('../simple');

module.exports = function maybeComparator(comparator) {
  return comparator || simple();
};

