'use strict';
var assert = require('assert');
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
assert.throws(function () {
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
assert.throws(function () {
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
assert.throws(function () {
    match(1, 10);
}, {
    name: 'Error',
    message: 'Each argument, must be a string'
});
var TextContent = /** @class */ (function () {
    function TextContent(content) {
        this.content = content;
        this.setContent = this.setContent.bind(this);
        this.getContent = this.getContent.bind(this);
        this.search = this.search.bind(this);
        this.times = this.times.bind(this);
        this.match = this.match.bind(this);
    }
    TextContent.prototype.setContent = function (value) {
        this.content = value;
        return this;
    };
    TextContent.prototype.getContent = function () {
        return this.content;
    };
    TextContent.prototype.search = function (term) { return search(term, this.getContent()); };
    TextContent.prototype.times = function (term) { return times(term, this.getContent()); };
    TextContent.prototype.match = function (term) { return match(term, this.getContent()); };
    return TextContent;
}());
var txt = new TextContent('foobarbaz');
assert.ok(txt instanceof TextContent);
assert.equal(txt.content, 'foobarbaz', 'TextContent content not settled');
assert.ok(txt.setContent('foobarbazbuzz') instanceof TextContent);
assert.equal(txt.getContent(), 'foobarbazbuzz');
assert.ok(txt.search('buzz'));
txt.setContent('fuzzbarfuzzbuzzfuzz');
assert.equal(txt.times('fuzz'), 3);
assert.equal(txt.match('buzz'), 'fuzzbarfuzzbuzzfuzz');
var isTTY = process.stdin.isTTY;
var Transform = require('stream').Transform;
var args = process.argv.slice(2);
function textMatchContentTransformFactory(filePath) {
    if (filePath === void 0) { filePath = ''; }
    var opts = {
        transform: function (raw, encoding, callback) {
            var text = new TextContent(raw.toString());
            if (text.search(args[0])) {
                if (!!filePath)
                    console.log(filePath);
                this.push(Buffer.from(text.match(args[0])));
            }
            callback();
        }
    };
    return new Transform(opts);
}
var fs = require('fs');
var path = require('path');
function traverse(dirPath, dirs) {
    if (dirs === void 0) { dirs = []; }
    var dir = fs.readdirSync(dirPath, {
        withFileTypes: true
    });
    var nestedDirs = dir.filter(function (curr) { return curr.isDirectory() &&
        !(curr.name.indexOf('.') === 0); });
    var nestedFiles = dir.filter(function (curr) { return curr.isFile() &&
        !(curr.name.indexOf('.') === 0); });
    for (var _i = 0, nestedFiles_1 = nestedFiles; _i < nestedFiles_1.length; _i++) {
        var file = nestedFiles_1[_i];
        var curr = path.resolve(dirPath, file.name);
        var currStream = fs.createReadStream(curr);
        currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
    }
    for (var _a = 0, nestedDirs_1 = nestedDirs; _a < nestedDirs_1.length; _a++) {
        var entrypoint = nestedDirs_1[_a];
        var curr = path.resolve(dirPath, entrypoint.name);
        traverse(curr);
    }
}
if (!isTTY) {
    process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
}
else if (isTTY) {
    // traverse directories
    traverse(process.cwd());
}
