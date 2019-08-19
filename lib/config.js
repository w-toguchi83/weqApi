'use strict';

class Config {

    constructor(host) {
        this._host       = host;
        this._secure     = true;
        this._timeout    = 60;
        this._retryCount = 1;
        this._waitTime   = 300; 
    }

    static create(host) {
        return new Config(host);
    }

    isSecure() {
        return this._secure;
    }

    setSecure(secureFlg) {
        this._secure = secureFlg;
        return this;
    }

    getHost() {
        return this._host;
    }

    setHost(host) {
        this._host = host;
        return this;
    }

    getTimeout() {
        return this._timeout;
    }

    // timeout is sec
    setTimeout(timeout) {
        this._timeout = timeout;
        return this;
    }

    getRetryCount() {
        return this._retryCount;
    }

    setRetryCount(retryCount) {
        this._retryCount = retryCount;
        return this;
    }

    getWaitTime() {
        return this._waitTime;
    }

    // waitTime is milliseconds
    setWaitTime(waitTime) {
        this._waitTime = waitTime;
        return this;
    }
}

module.exports = Config;
