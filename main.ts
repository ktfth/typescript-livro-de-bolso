'use strict';

import { existsSync } from 'https://deno.land/std/fs/mod.ts';

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

  match(term: any): any {
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

async function traverse(dir=Deno.cwd()) {
  if (Deno.cwd() !== dir) {
    dir = Deno.cwd() + '/' + dir;
  } if (existsSync(dir)) {
    for await (const dirEntry of Deno.readDir(dir)) {
      if (dirEntry.isFile) {
        let decoder = new TextDecoder('utf-8');
        let rawPath = Deno.cwd() + '/' + dirEntry.name;
        if (existsSync(rawPath)) {
          let raw = await Deno.readFile(rawPath);
          let data = decoder.decode(raw);
          let text = new TextContent(data.toString());
          if (text.search(Deno.args[0])) {
            let matches = text.match(Deno.args[0]);
            let output = matches.replace((new RegExp(Deno.args[0], 'g')), '\x1b[100m' + Deno.args[0] + '\x1b[49m');
            console.log(`${output}`);
          }
        }
      } else if (dirEntry.isDirectory) {
        traverse(dirEntry.name);
      }
    }
  }
}

if (!!Deno.args.length && Deno.isatty(Deno.stdin.rid)) {
  traverse();
} else if (!!Deno.args.length && !Deno.isatty(Deno.stdin.rid)) {
  (async () => {
    let decoder = new TextDecoder('utf-8');
    let raw = await Deno.readAll(Deno.stdin);
    let data = decoder.decode(raw);
    let text = new TextContent(data.toString());
    if (text.search(Deno.args[0])) {
      let matches = text.match(Deno.args[0]);
      let output = matches.replace((new RegExp(Deno.args[0], 'g')), '\x1b[100m' + Deno.args[0] + '\x1b[49m');
      console.log(`${output}`);
    }
  })();
}
