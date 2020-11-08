'use strict';
const assert = require('assert');
const { exec } = require('child_process');

exec('echo "foobar" | node app.js foo', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  assert.equal(stdout, '1:\x1b[100m' + 'foo' + '\x1b[49mbar\n');
});
