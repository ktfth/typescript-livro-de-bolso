'use strict';
const assert = require('assert');

import { search } from './app';

describe('Text Content functional implementation', () => {
  it('should search for a term', () => {
    assert.ok(search('foo', 'foobar'));
  })
});
