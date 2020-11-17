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

let getValue = async (value) => {
    if (value == 'http://stuff.fi') {
        throw new Error('Stuff is not allowed');
    }
    return value;
};

// Replacer function which just returns non-string type values
let replacer = async (key, value) => {
    if (typeof value === 'object' && value.__type === 'ao1') {
        value.url = await getValue(value.url);
        return value;
    }
    return value;
};




async function main() {
    // Make sure the API is working just with replacer function.
    let data = await yj.stringifyAsyncPromise(objData, replacer)
        .catch(error => {
            tap.contains(error.message, 'Stuff is not allowed')
        });

    if (data) {
        tap.fail('Data contains');
    } else {
        tap.ok('Data is empty');
    }

}
main();