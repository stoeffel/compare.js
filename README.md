comparator
================

[![Build Status](https://travis-ci.org/stoeffel/comparator.svg)](https://travis-ci.org/stoeffel/comparator) [![npm version](https://badge.fury.io/js/comparator.svg)](http://badge.fury.io/js/comparator)
> Comparator functions for your favorite sort-algo

Installation
------------

`npm install comparator`

Usage
-----

```js
var mergesort = require('divide-et-impera');
var compare = require('comparator');
var desc = compare.desc;
var caseInsensitive = compare.caseInsensitive;
// or require only what you need
var desc = require('comparator/desc');
var caseInsensitive = require('comparator/caseInsensitive');


// Basic usage
mergesort([3, 1, 2, 4, 2], desc()); // => [4, 3, 2, 2, 1]
mergesort(['a', 'c', 'C', 'B', 'b'], caseInsensitive()); // => ['a', 'B', 'b', 'c', 'C']
mergesort(['a', 'c', 'C', 'B', 'b'], desc(caseInsensitive())); // => ['B', 'b', 'c', 'C', 'a']
mergesort(['a', 'c', 'C', 'B', 'b'], desc(caseInsensitive())); // => ['B', 'b', 'c', 'C', 'a']

// Compose a sort function
var compose = require('compose-function');
var curry = require('chickencurry');

var sortDescByName = curry(mergesort)
  (curry.__, compose(
      caseInsensitive,
      curry(property)('name'),
      desc
    )()
  ); 

var users = [{
  name: 'Bylexus'
}, {
  name: 'Ai-Linh'
}, {
  name: 'Schtoeffel'
}];

sortDescByName(users); 
/* => [{
  name: 'Schtoeffel'
}, {
  name: 'Bylexus'
}, {
  name: 'Ai-Linh'
}]
```

API
---

### simple() => comparator(a,b)

Simply checks if `a` is smaller then `b`

```js
simple()(1, 2); // => -1
simple()(1, 1); // => 0
simple()(2, 1); // => 1

mergesort(list, simple());
```


### date() => comparator(a,b)

Checks dates using moment.js.

```js
date()(new Date('2015', '02', '1'), new Date('2015', '01', '31')); // => -1
date()(new Date('2015', '02', '1'), new Date('2015', '02', '1')); // => 0
date()(new Date('2015', '01', '31'), new Date('2015', '02', '1')); // => 1

date('DD.MM.YYYY')('18.01.1986', '19.01.1986'); // => -1
date('DD.MM.YYYY')('18.01.1986', '18.01.1986'); // => 0
date('DD.MM.YYYY')('18.01.1986', '17.01.1986'); // => 1

mergesort(list, date('DD.MM.YYYY'));
```


### desc([comparator=simple]) => comparator(a,b)

Inverts a comparator.

```js
desc(simple())(1, 2); // => 1
desc(simple())(1, 1); // => 0
desc(simple())(2, 1); // => -1

mergesort(list, desc(date()));
```


### property(propertyName, [comparator=simple]) => comparator(a,b)

Compares a property of two objects.

```js
var foo = {
  name: 'foo'
};
var bar = {
  name: 'bar'
};

property('name')(foo, bar); // => 1
property('name')(foo, foo); // => 0
property('name')(bar, foo); // => -1

// this works
property('name', caseInsensitive())
// this doesn't
caseInsensitive(property('name'))

mergesort(list, property('name'));
```


### caseInsensitive([comparator=simple]) => comparator(a,b)

Compares a property of two objects.

```js
caseInsensitive()('a', 'A'); // => 0
caseInsensitive()('A', 'a'); // => 0

mergesort(list, property('name', caseInsensitive()));
```


### WIP natural(fn) => comparator(a,b)
