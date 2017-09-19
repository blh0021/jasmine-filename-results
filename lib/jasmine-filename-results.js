const first = require('underscore').first;
const filter = require('underscore').filter;
var file_matcher;

function findSpecFile() {
    const trace = parse((new Error()).stack);
    return first(filter(trace, isSpec));
}

function isSpec(line) {
    return line.filename.match(file_matcher);
}

function parser(data) {
    return data.split('\n').map((line) => {
        const res = line.match(/at.* \({0,1}(.*|\w*):(.*):\d*/);
        if (!res) {
            return null;
        }

        return {
            filename: res[1],
            line: Number(res[2]),
        };
    }).filter((i) => !!i);
}


function jfr(it, matcher) {
    file_matcher = matcher;
    return function jasmineFileIt(description, fn, timeout) {
        const spec = it(description, fn, timeout);
        spec.result._specFile = findSpecFile();
        return spec;
    };
}

module.exports = jfr;
