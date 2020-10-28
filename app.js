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

class Text {
  constructor(content) {
    this.content = content;
    this.setContent = this.setContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.search = this.search.bind(this);
    this.times = this.times.bind(this);
    this.match = this.match.bind(this);
  }

  setContent(value) {
    this.content = value;
    return this;
  }

  getContent() {
    return this.content;
  }

  search(term) { return search(term, this.getContent()); }
  times(term) { return times(term, this.getContent()); }
  match(term) { return match(term, this.getContent()); }
}

let txt = new Text('foobarbaz');
assert.ok(txt instanceof Text);
assert.equal(txt.content, 'foobarbaz', 'Text content not settled');
assert.ok(txt.setContent('foobarbazbuzz') instanceof Text);
assert.equal(txt.getContent(), 'foobarbazbuzz');
assert.ok(txt.search('buzz'));
txt.setContent('fuzzbarfuzzbuzzfuzz');
assert.equal(txt.times('fuzz'), 3);
assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');
