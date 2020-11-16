'use strict';

const yj = require('../index');
const tap = require('tap');

const objData = {
    name: 'Jacqueline Poole',
    gender: 'female',
    age: 40,
    object: {
        stuff: [1,2,3, {__type: 'ao1', url: 'http://other.fi'}],
        more: {
            jep: "stuff",
            moneyshot: {__type: 'ao1', url: 'http://stuff.fi'}
        }
    }
};

// Replacer function which just returns non-string type values
let replacer = (key, value) => {
    if (typeof value === 'object' && value.__type === 'ao1') {
        value.url = 'https://new.world';
        return value;
    }
    return value;
};



async function main() {
    // Make sure the API is working just with replacer function.
    let data = await yj.stringifyAsyncPromise(objData, replacer);

    if (data) {
        tap.contains(data, 'https://new.world');
    } else {
        tap.fail(err);
    }

}
main();