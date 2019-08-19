'use strict';

const Config     = require('./config');
const utils      = require('./utils');
const axios      = require('axios');
const axiosRetry = require('axios-retry');

const MAX_LIMIT = 1000;

function createInnerClient(baseUrl, timeout, retryCount, waitTime) {
        const client = axios.create({
            baseURL: baseUrl,
            timeout: timeout * 1000,
        });

        axiosRetry(client, {
            retries: retryCount,
            retryDelay: () => {
                return waitTime;
            }
        });

        return client;
}

function fetch(client, resource, query, binds, offset, limit) {
        const params = {
            'resource': resource,
            'query': query,
            'binds': binds,
            'offset': offset,
            'limit': limit
        }

        return client.post('/api/fetch', params).then(response => {
            if (response.status === 200) {
                return response['data']['rows'];
            }
            return Promise.reject(new Error('failed fetch'));
        }).catch(err => {
            console.log(err);
            return Promise.reject(new Error(err));
        });
}

class Client {
    constructor(config) {
        utils.ifNotConfigThrowError(config);
        this._baseUrl    = utils.makeBaseUrl(config);
        this._retryCount = config.getRetryCount();
        this._timeout    = config.getTimeout();
        this._waitTime   = config.getWaitTime();
    }

    static create(config) {
        return new Client(config);
    }

    ping() {
        const client = createInnerClient(
                this._baseUrl,
                this._timeout,
                this._retryCount,
                this._waitTime
        );

        return client.get('/api/ping').then(response => {
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        }).catch(() => {
            return false;
        });
    }

    fetch(resource, query, binds = {}, callback = null) {
        const client = createInnerClient(
                this._baseUrl,
                this._timeout,
                this._retryCount,
                this._waitTime
        );

        if (!(callback instanceof Function)) {
            callback = function (row) { }; // 空関数設定
        }

        const fmttedQuery = utils.formatQuery(query);
        let   offset      = -1 * MAX_LIMIT;
        const limit       = MAX_LIMIT;
        let   rows        = [];

        let cnt = 1;
        return (async () => {
            do {
                offset += limit;
                rows = await fetch(client, resource, fmttedQuery, binds, offset, limit).then(rs => {
                    for(let r of rs) {
                        callback(r);
                    }

                    return rs;
                });
            } while (rows.length > 0);
        })();
    }

    fetchRange(resource, query, offset, limit, binds = {}) {
        const client = createInnerClient(
                this._baseUrl,
                this._timeout,
                this._retryCount,
                this._waitTime
        );

        const fmttedQuery = utils.formatQuery(query);

        return fetch(client, resource, fmttedQuery, binds, offset, limit);
    }

    count(resource, query, binds = {}) {
        const client = createInnerClient(
                this._baseUrl,
                this._timeout,
                this._retryCount,
                this._waitTime
        );

        const fmttedQuery = utils.formatQuery(query);
        const params = {
            'resource': resource,
            'query': query,
            'binds': binds
        };

        return client.post('/api/count', params).then(response => {
            if (response.status === 200) {
                return response['data']['count'];
            }
            return Promise.reject(new Error('failed count'));
        }).catch(err => {
            console.log(err);
            return Promise.reject(new Error(err));
        });
    }
}

module.exports = Client;
