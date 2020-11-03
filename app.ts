'use strict';

function thrownArgumentException(text, term) {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

export function search(term, text): boolean {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}

export function times(term, text) {
  thrownArgumentException(term, text);
  return text.match((new RegExp(term, 'g'))).length;
}

export function match(term, text) {
  thrownArgumentException(term, text);
  return text.match(new RegExp(term)).input;
}

export class TextContent {
  content: any;

  constructor(content: any) {
    this.content = content;
    this.setContent = this.setContent.bind(this);
    this.getContent = this.getContent.bind(this);
    this.isBuffer = this.isBuffer.bind(this);
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

  isBuffer(value) {
    return value.constructor.toString().indexOf('Buffer') > -1;
  }

  search(term) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      return this.getContent().indexOf(term) > -1;
    }
    return search(term, this.getContent());
  }

  times(term, t=-1, o=0) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out = o;
      let curr = this.getContent().indexOf(term, t + 1);
      if (curr > -1) {
        out += 1;
        return this.times(term, t=curr + 1, out);
      }
      return out;
    }
    return times(term, this.getContent());
  }

  match(term) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out = Buffer.from('');
      if (this.search(term)) {
        out = this.getContent();
      }
      return out;
    }
    return match(term, this.getContent());
  }
}

const isTTY = process.stdin.isTTY;
const { Transform } = require('stream');
const args = process.argv.slice(2);

function textMatchContentTransformFactory(filePath='') {
  const opts = {
    transform(raw, encoding, callback) {
      let text = new TextContent(raw);
      if (!!args.length && text.search(Buffer.from(args[0]))) {
        if (!!filePath) console.log(filePath);
        this.push(text.match(Buffer.from(args[0])));
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

    currStream.setMaxListeners(100000);

    currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
  }

  for (let entrypoint of nestedDirs) {
    let curr = path.resolve(dirPath, entrypoint.name);
    traverse(curr);
  }
}

process.stdin.setEncoding('utf-8');

process.stdout.setMaxListeners(100000);

if (!isTTY) {
  process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
} else if (isTTY && !module.parent) {
  // traverse directories
  traverse(process.cwd());
}
