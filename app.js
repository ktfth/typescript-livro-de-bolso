'use strict';
const assert = require('assert');

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

function search(term, text) {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));
assert.throws(() => {
  search(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);
assert.throws(() => {
  times(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});

function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}
assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
assert.throws(() => {
  match(1, 10);
}, {
  name: 'Error',
  message: 'Each argument, must be a string'
});
