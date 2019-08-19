'use strict';

const assert = require('assert');
const weqApi = require('../lib/weqApi');
const Config = require('../lib/config');
const Client = require('../lib/client');

describe('weqApi', () => {
    describe('Config', () => {
        it('instanceof', () => {
            const config = new weqApi.Config();
            assert(config instanceof Config);
        });
    });

    describe('Client', () => {
        it('instanceof', () => {
            const config = new weqApi.Config();
            const client = new weqApi.Client(config);
            assert(client instanceof Client);
        });
    });
});
