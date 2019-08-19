'use strict';

const assert = require("assert");
const utils  = require('../lib/utils');
const Config = require('../lib/config');

describe('utils', () => {
    describe('ifNotConfigThrowError', () => {
        it('throw TypeError', () => {
            assert.throws( () => { utils.ifNotConfigThrowError('is error?') }, TypeError, 'Config型でないためエラーです');
        });
    });

    describe('makeBaseUrl', () => {
        it('secure = true', () => {
            const config = Config.create('sample.weq.com');

            assert('https://sample.weq.com' === utils.makeBaseUrl(config));
        });
        it('secure = false', () => {
            const config = Config.create('sample.weq.com').setSecure(false);

            assert('http://sample.weq.com' === utils.makeBaseUrl(config));
        });
    });

    describe('formatQuery', () => {
        it('query containing line feed codes', () => {
            const query = "\r\nSELECT\n*\nFROM tbl\nWHERE id = 100\n";
            const expected = 'SELECT * FROM tbl WHERE id = 100';

            assert(expected === utils.formatQuery(query));
        });
    });
});
