// Higher Order Functions

/**
 * https://underscorejs.org/#arrays
 * Underscore.js, created in 2009 by Jeremy Ashkenas,
 * filled a crucial gap in JavaScript's capabilities before
 * the language evolved with ES6, offering a range of functional
 * programming utilities for tasks like array and object manipulation.
 * While modern JavaScript now incorporates many features once unique
 * to Underscore, learning to recreate it remains valuable.
 */

const bae = {};

// Return an array of the last n elements of an array. If n is undefined,
// return just the last element.
bae.last = function (array, n) {
  if (n === undefined) {
    return array[array.length -1];
  } else if (n > 0) {
    return array.slice(-n);
  } else {
    return [];
  }
};

// Return an array of the first n elements of an array. If n is undefined,
// return just the first element.
bae.first = function (array, n) {
  return n === undefined ? array[0] : array.slice(0,n);
};


// Call iterator(value, key, collection) for each element of collection
// a collection is an array or object
bae.each = function (collection, iterator) {
  // Your code here
  if (Array.isArray(collection)) {
    for (var i = 0, len = collection.length; i < len; i++ ) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var i in collection) {
      iterator(collection[i], i, collection);
    }
  }
};

// Returns the index at which value can be found in the array, or -1 if value
// is not present in the array.
// use the bae.each function you wrote above instead of a for loop
bae.indexOf = function (array, target) {
  // Your code here
  var result = -1;

  bae.each(array, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });
  return result;
};

// Return all elements of an array that pass a truth test.
// Collection is an array of object to filter
// test is a function that returns true or false for each item
bae.filter = function (collection, test) {
  // Your code here
  var filtered = [];
  bae.each(collection, function (item) {
    if (test(item)) {
      filtered.push(item);
    }
  });
  return filtered;
};

// Return all elements of an array that don't pass a truth test.
bae.reject = function (collection, test) {
  // TIP: see if you can re-use bae.filter() here, without simply
  // copying code in and modifying it
  return bae.filter(collection, function(item) {
    return !test(item);
  });
};

// Produce a duplicate-free version of the array.
bae.uniq = function (array) {
  // Your code here
  var uniqArray = [];
  bae.each(array, function(item) {
    if (bae.indexOf(uniqArray, item) === -1) {
      uniqArray.push(item);
    }
  });
  return uniqArray;
};

// Return the results of applying an iterator to each element.
// map() is a useful primitive iteration function that works a lot
// like each(), but in addition to running the operation on all
// the members, it also maintains an array of results.
bae.map = function (collection, iterator) {
  // Your code here
  var mapped = [];
  bae.each(collection, function (item) {
    const result = (iterator(item));
    mapped.push(result);
  });
  return mapped;
};

// Reduces an array or object to a single value by repetitively calling
// iterator(accumulator, item) for each item. accumulator should be
// the return value of the previous iterator call.
//
// You can pass in a starting value for the accumulator as the third argument
// to reduce. If no starting value is passed, the first element is used as
// the accumulator, and is never passed to the iterator. In other words, in
// the case where a starting value is not passed, the iterator is not invoked
// until the second element, with the first element as it's second argument.
//
// Example:
//   var numbers = [1,2,3];
//   var sum = bae.reduce(numbers, function(total, number){
//     return total + number;
//   }, 0); // should be 6
bae.reduce = function (collection, iterator, accumulator) {
  // Your code here
  bae.each(collection, function (item) {
    if (accumulator === undefined) {
      accumulator = item;
    } else {
      accumulator = iterator(accumulator, item);
    } 
  });
  return accumulator;
};

// Determine if the array or object contains a given value (using `===`).
bae.contains = function (collection, target) {
  // TIP: Many iteration problems can be most easily expressed in
  // terms of reduce().
  return bae.reduce(collection, function(wasFound, item) {
    if (wasFound) {
      return true;
    }
    return item === target;
  }, false);
};
