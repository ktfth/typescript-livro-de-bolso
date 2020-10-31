'use strict';
const assert = require('assert');

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

export function search(term, text): boolean {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}
// assert.ok(search('foo', 'foobar'));
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

class TextContent {
  content: string;

  constructor(content: string) {
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

let txt = new TextContent('foobarbaz');
assert.ok(txt instanceof TextContent);
assert.equal(txt.content, 'foobarbaz', 'TextContent content not settled');
assert.ok(txt.setContent('foobarbazbuzz') instanceof TextContent);
assert.equal(txt.getContent(), 'foobarbazbuzz');
assert.ok(txt.search('buzz'));
txt.setContent('fuzzbarfuzzbuzzfuzz');
assert.equal(txt.times('fuzz'), 3);
assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory(filePath='') {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new TextContent(raw.toString());
      if (text.search(args[0])) {
        if (!!filePath) console.log(filePath);
        this.push(Buffer.from(text.match(args[0])));
      }
      callback();
    }
  };
  return new Transform(opts);
}

const fs = require('fs');
const path = require('path');

function traverse(dirPath, dirs=[]) {
  let dir = fs.readdirSync(dirPath, {
    withFileTypes: true
  });
  let nestedDirs = dir.filter(curr => curr.isDirectory() &&
                                      !(curr.name.indexOf('.') === 0));
  let nestedFiles = dir.filter(curr => curr.isFile() &&
                                       !(curr.name.indexOf('.') === 0));

  for (let file of nestedFiles) {
    let curr = path.resolve(dirPath, file.name);
    let currStream = fs.createReadStream(curr);

    currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
  }

  for (let entrypoint of nestedDirs) {
    let curr = path.resolve(dirPath, entrypoint.name);
    traverse(curr);
  }
}

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
} else if (isTTY && !module.parent) {
  // traverse directories
  traverse(process.cwd());
}
