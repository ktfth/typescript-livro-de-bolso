'use strict';

function thrownArgumentException(text: string, term: string): void {
  if (typeof term !== 'string' || typeof text !== 'string') {
    throw new Error('Each argument, must be a string');
  }
}

export function search(term: string, text: string): boolean {
  thrownArgumentException(term, text);
  return (new RegExp(term)).test(text);
}

export function times(term: string, text: string): number {
  thrownArgumentException(term, text);
  let out = 0;
  let matched = text.match((new RegExp(term, 'g')));
  if (matched !== null) {
    out = matched.length;
  }
  return out;
}

export function match(term: string, text: string): string {
  thrownArgumentException(term, text);
  let out = '';
  let matched = text.match(new RegExp(term));
  if (matched !== null && matched.input !== undefined) {
    out = matched.input;
  }
  return out;
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

  setContent(value: any) {
    this.content = value;
    return this;
  }

  getContent() {
    return this.content;
  }

  isBuffer(value: Deno.Buffer) {
    return value.constructor.toString().indexOf('Buffer') > -1;
  }

  search(term: any) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      return this.getContent().indexOf(term) > -1;
    }
    return search(term, this.getContent());
  }

  times(term: any, t: number =-1, o: number = 0): any {
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

  match(term: any) {
    if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
      let out: { [k: string]: any } = {};
      let lines = [];
      let line = [];
      for (let i = 0; i < this.getContent().length; i += 1) {
        let chr = this.getContent()[i];
        if (chr === '\n'.charCodeAt(0)) {
          lines.push(line);
          line = [];
        } else if (i === this.getContent().length - 1) {
          line.push(chr);
          lines.push(line);
          line = [];
        } else {
          line.push(chr);
        }
      }
      for (let i in lines) {
        let curr = lines[i];
        if (curr.indexOf(term) > -1) {
          out[(parseInt(i, 10) + 1)] = curr;
        }
      }
      return out;
    }
    return match(term, this.getContent());
  }
}

export class Lines {}

// const isTTY = process.stdin.isTTY;
// const { Transform } = require('stream');
// const args = process.argv.slice(2);
//
// function textMatchContentTransformFactory(filePath='') {
//   const opts = {
//     transform(raw, encoding, callback) {
//       let text = new TextContent(raw);
//       if (!!args.length && text.search(new Deno.Buffer(args[0]))) {
//         if (!!filePath) console.log(filePath);
//         let matches = text.match(new Deno.Buffer(args[0]));
//         let lines = [];
//         Object.keys(matches).forEach(k => {
//           lines.push(`${k}:${matches[k].toString().replace((new RegExp(args[0], 'g')), '\x1b[100m' + args[0] + '\x1b[49m')}`);
//         });
//         this.push(new Deno.Buffer(`${lines.join('\n')}\n`));
//       }
//       callback();
//     }
//   };
//   return new Transform(opts);
// }
//
// const fs = require('fs');
// const path = require('path');
//
// function traverse(dirPath, dirs=[]) {
//   let dir = fs.readdirSync(dirPath, {
//     withFileTypes: true
//   });
//   let nestedDirs = dir.filter(curr => curr.isDirectory() &&
//                                       !(curr.name.indexOf('.') === 0));
//   let nestedFiles = dir.filter(curr => curr.isFile() &&
//                                        !(curr.name.indexOf('.') === 0));
//
//   for (let file of nestedFiles) {
//     let curr = path.resolve(dirPath, file.name);
//     let currStream = fs.createReadStream(curr);
//
//     currStream.setMaxListeners(100000);
//
//     currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
//   }
//
//   for (let entrypoint of nestedDirs) {
//     let curr = path.resolve(dirPath, entrypoint.name);
//     traverse(curr);
//   }
// }
//
// process.stdin.setEncoding('utf-8');
//
// process.stdout.setMaxListeners(100000);
//
// if (!isTTY) {
//   process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
// } else if (isTTY && !module.parent) {
//   // traverse directories
//   traverse(process.cwd());
// }
