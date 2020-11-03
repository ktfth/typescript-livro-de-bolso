'use strict';
exports.__esModule = true;
exports.TextContent = exports.match = exports.times = exports.search = void 0;
function thrownArgumentException(text, term) {
    if (typeof term !== 'string' || typeof text !== 'string') {
        throw new Error('Each argument, must be a string');
    }
}
function search(term, text) {
    thrownArgumentException(term, text);
    return (new RegExp(term)).test(text);
}
exports.search = search;
function times(term, text) {
    thrownArgumentException(term, text);
    return text.match((new RegExp(term, 'g'))).length;
}
exports.times = times;
function match(term, text) {
    thrownArgumentException(term, text);
    return text.match(new RegExp(term)).input;
}
exports.match = match;
var TextContent = /** @class */ (function () {
    function TextContent(content) {
        this.content = content;
        this.setContent = this.setContent.bind(this);
        this.getContent = this.getContent.bind(this);
        this.isBuffer = this.isBuffer.bind(this);
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
    TextContent.prototype.isBuffer = function (value) {
        return value.constructor.toString().indexOf('Buffer') > -1;
    };
    TextContent.prototype.search = function (term) {
        if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
            return this.getContent().indexOf(term) > -1;
        }
        return search(term, this.getContent());
    };
    TextContent.prototype.times = function (term, t, o) {
        if (t === void 0) { t = -1; }
        if (o === void 0) { o = 0; }
        if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
            var out = o;
            var curr = this.getContent().indexOf(term, t + 1);
            if (curr > -1) {
                out += 1;
                return this.times(term, t = curr + 1, out);
            }
            return out;
        }
        return times(term, this.getContent());
    };
    TextContent.prototype.match = function (term) {
        if (this.isBuffer(term) && this.isBuffer(this.getContent())) {
            var out = Buffer.from('');
            if (this.search(term)) {
                out = this.getContent();
            }
            return out;
        }
        return match(term, this.getContent());
    };
    return TextContent;
}());
exports.TextContent = TextContent;
var isTTY = process.stdin.isTTY;
var Transform = require('stream').Transform;
var args = process.argv.slice(2);
function textMatchContentTransformFactory(filePath) {
    if (filePath === void 0) { filePath = ''; }
    var opts = {
        transform: function (raw, encoding, callback) {
            var text = new TextContent(raw);
            if (!!args.length && text.search(Buffer.from(args[0]))) {
                if (!!filePath)
                    console.log(filePath);
                this.push(text.match(Buffer.from(args[0])));
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
        currStream.setMaxListeners(100000);
        currStream.pipe(textMatchContentTransformFactory(curr)).pipe(process.stdout);
    }
    for (var _a = 0, nestedDirs_1 = nestedDirs; _a < nestedDirs_1.length; _a++) {
        var entrypoint = nestedDirs_1[_a];
        var curr = path.resolve(dirPath, entrypoint.name);
        traverse(curr);
    }
}
process.stdin.setEncoding('utf-8');
process.stdout.setMaxListeners(100000);
if (!isTTY) {
    process.stdin.pipe(textMatchContentTransformFactory()).pipe(process.stdout);
}
else if (isTTY && !module.parent) {
    // traverse directories
    traverse(process.cwd());
}
