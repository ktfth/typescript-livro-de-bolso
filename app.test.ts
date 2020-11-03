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

  it('should be set a content', () => {
    assert.ok(txt.setContent('foobarbazbuzz') instanceof TextContent);
  });

  it('should be get a content', () => {
    assert.equal(txt.getContent(), 'foobarbazbuzz');
  });

  it('should be search by a term in content', () => {
    assert.ok(txt.search('buzz'));
  });

  it('should be have times of term occured on the content', () => {
    txt.setContent('fuzzbarfuzzbuzzfuzz');
    assert.equal(txt.times('fuzz'), 3);
  });

  it('should be match by term on the content', () => {
    assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');
  });
});

describe('Text Content processing buffer', () => {
  let txtBuff = null;

  before(() => {
    txtBuff = new TextContent(Buffer.from('foobarbaz'));
  });

  it('should be an instance of', () => {
    assert.ok(txtBuff instanceof TextContent);
  });

  it('should be an content', () => {
    assert.ok(txtBuff.content, Buffer.from('foobarbaz'), 'TextContent content not settled');
  });

  it('should be a buffer', () => {
    assert.ok(txtBuff.isBuffer(Buffer.from('bar')));
  });

  it('should be search by a term in content as buffer', () => {
    assert.ok(txtBuff.search(Buffer.from('bar')));
  });

  it('should be have times of term occured on the content as buffer', () => {
    txtBuff.setContent(Buffer.from('fuzzbarfuzzbuzzfuzz'));
    assert.equal(txtBuff.times(Buffer.from('fuzz')), 3);
  });

  it('should be match by term on the content as buffer', () => {
    assert.equal(txtBuff.match(Buffer.from('buzz')), 'fuzzbarfuzzbuzzfuzz');
  })
});
