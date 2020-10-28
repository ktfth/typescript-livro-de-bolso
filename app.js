'use strict';
const assert = require('assert');

function search(term, text) {
  return (new RegExp(term)).test(text);
}
assert.ok(search('foo', 'foobar'));

function times(term, text) {
  return text.match((new RegExp(term, 'g'))).length;
}
assert.equal(times('baz', 'bazfoobarbaz'), 2);

function match(term, text) {
  return text.match(new RegExp(term)).input;
}
assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
