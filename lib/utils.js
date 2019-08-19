'use strict';

const Config = require('./config');

function ifNotConfigThrowError(config) {
    if (config instanceof Config) {
        return true;
    }

    throw new TypeError('Config型でないためエラーです');
}

module.exports.ifNotConfigThrowError = ifNotConfigThrowError;

module.exports.makeBaseUrl = function(config) {
    ifNotConfigThrowError(config);

    const scheme = config.isSecure() ? 'https' : 'http';
    const host   = config.getHost();

    return `${scheme}://${host}`;
};

module.exports.formatQuery = function(query) {
    // JSONに改行があることで悩まないための処理
    return query.replace(/(\r\n|\r|\n)/g, ' ').trim();
};
