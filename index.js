var maybeComparator = require('./util/maybeComparator');
var compare = module.exports;

compare.simple = require('./simple');
compare.date = require('./date');
compare.property = require('./property');
compare.caseInsensitive = require('./caseInsensitive');
compare.desc = require('./desc');
