'use strict';
const assert = require('assert');

import { search } from './app';
import { times } from './app';
import { match } from './app';
import { TextContent } from './app';

describe('Text Content Search', () => {
  it('should search for a term', () => {
    assert.ok(search('foo', 'foobar'));
  });

  it('should throws arguments exception for search', () => {
    assert.throws(() => {
      search(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content Times', () => {
  it('should have times of a term', () => {
    assert.equal(times('baz', 'bazfoobarbaz'), 2);
  });

  it('should throws arguments exception for times', () => {
    assert.throws(() => {
      times(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content Match', () => {
  it('should have match of term', () => {
    assert.equal(match('baz', 'foobarbaz'), 'foobarbaz');
  });

  it('should throws arguments exception for match', () => {
    assert.throws(() => {
      match(1, 10);
    }, {
      name: 'Error',
      message: 'Each argument, must be a string'
    });
  });
});

describe('Text Content', () => {
  let txt = null;

  before(() => {
    txt = new TextContent('foobarbaz');
  });

  it('should be an instance of', () => {
    assert.ok(txt instanceof TextContent);
  });

  it('should be an content', () => {
    assert.ok(txt.content, 'foobarbaz', 'TextContent content not settled');
  });
});
