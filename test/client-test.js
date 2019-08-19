'use strict';

const assert = require("assert");
const Config = require('../lib/config');
const Client = require('../lib/client');

describe('Client', () => {
    describe('create', () => {
        it('instance is Client', () => {
            const config = Config.create('weq');
            const client = Client.create(config);

            assert(client instanceof Client);
        });
    });

    describe('ping', () => {
        it('return false', function() {
            this.timeout(5000);
            const config = Config.create('not-exist:4000').setSecure(false).setTimeout(3);
            const client = Client.create(config);

            return client.ping().then(value => {
                assert(false === value);
            });
        });

        it('return true', function() {
            this.timeout(5000);
            const config = Config.create('weq:4000').setSecure(false).setTimeout(3);
            const client = Client.create(config);

            return client.ping().then(value => {
                assert(true === value);
            });
        });
    });

    describe('fetch', () => {
        it('get rows (count)', () => {
            const config = Config.create('weq:4000').setSecure(false).setTimeout(3);
            const client = Client.create(config);

            const resource = 'weqdb1';
            const query    = 'SELECT title, price FROM m_product WHERE series_id = :series_id';
            const binds    = {
                'series_id': '3000'
            };

            let rows = [];
            return client.fetch(resource, query, binds, (row) => {
                rows.push(row);
            }).then(() => {
                assert(3 === rows.length);
            });
        });

        it('give not function', () => {
            const config = Config.create('weq:4000').setSecure(false).setTimeout(3);
            const client = Client.create(config);

            const resource = 'weqdb1';
            const query    = 'SELECT title, price FROM m_product WHERE series_id = :series_id';
            const binds    = {
                'series_id': '3000'
            };

            return client.fetch(resource, query, binds).then(() => {
                assert(true);
            });
        });
    });

    describe('fetchRange', () => {
        it('get rows', () => {
            const config = Config.create('weq:4000').setSecure(false).setTimeout(3);
            const client = Client.create(config);

            const resource = 'weqdb1';
            const query    = 'SELECT title, price FROM m_product WHERE series_id = :series_id';
            const offset   = 0;
            const limit    = 2;
            const binds    = {
                'series_id': '3000'
            };

            return client.fetchRange(resource, query, offset, limit, binds).then(rows => {
                assert(2 === rows.length);
            });
        });
    });

    describe('count', () => {
        it('get count', () => {
            const config = Config.create('weq:4000').setSecure(false).setTimeout(3);
            const client = Client.create(config);

            const resource = 'weqdb1';
            const query    = 'SELECT title, price FROM m_product WHERE series_id = :series_id';
            const binds    = {
                'series_id': '3000'
            };

            return client.count(resource, query, binds).then(cnt => {
                assert(3 === cnt);
            });
        });
    });
});
