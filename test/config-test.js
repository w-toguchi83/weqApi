'use strict';

const assert = require("assert");
const Config = require('../lib/config');

describe('Config', () => {
    it('create default', () => {
        const config = Config.create('test.weq.com');
    
        assert('test.weq.com' === config.getHost());
        assert(true === config.isSecure());
        assert(60 === config.getTimeout());
        assert(1 === config.getRetryCount());
        assert(300 === config.getWaitTime());
    });
    
    it('change properties', () => {
        const config = Config.create('test.weq.com');
    
        config
        .setHost('sample.weq.com')
        .setSecure(false)
        .setTimeout(30)
        .setRetryCount(3)
        .setWaitTime(100);
    
        assert('sample.weq.com' === config.getHost());
        assert(false === config.isSecure());
        assert(30 === config.getTimeout());
        assert(3 === config.getRetryCount());
        assert(100 === config.getWaitTime());
    });
});

