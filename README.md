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
var compare = require('comparator');
var mergesort = require('divide-et-impera');

// Basic usage
mergesort([3, 1, 2, 4, 2], compare.desc()); // => [4, 3, 2, 2, 1]
mergesort(['a', 'c', 'C', 'B', 'b'], compare.caseInsensitive()); // => ['a', 'B', 'b', 'c', 'C']
mergesort(['a', 'c', 'C', 'B', 'b'], compare.desc(compare.caseInsensitive())); // => ['B', 'b', 'c', 'C', 'a']

// Compose a sort function
var compose = require('compose-function');
var curry = require('chickencurry');

var sortDescByName = curry(mergesort)
  (curry.__, compose(
      compare.caseInsensitive,
      curry(compare.property)('name'),
      compare.desc
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
```


### date() => comparator(a,b)

Checks dates using moment.js.

```js
date()(new Date('2015', '02', '1'), new Date('2015', '01', '31')); // => -1
date()(new Date('2015', '02', '1'), new Date('2015', '02', '1')); // => 0
date()(new Date('2015', '01', '31'), new Date('2015', '02', '1')); // => 1
```


### desc(comparator) => comparator(a,b)

Inverts a comparator.

```js
desc(simple())(1, 2); // => 1
desc(simple())(1, 1); // => 0
desc(simple())(2, 1); // => -1
```


### property(fn) => comparator(a,b)

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
```


### caseInsensitive(fn) => comparator(a,b)

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
```


### WIP natural(fn) => comparator(a,b)
