var config = require('config').database;
var pg = require('co-pg')(require('pg'));
var named = require('node-postgres-named');

module.exports = function* () {
    var dsn = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.name}`;
    var connect = yield pg.connect_(dsn);
    var client = connect[0];

    named.patch(client);
    var query = client.query;

    client.query_ = function (queryString, values) {
        return function (cb) {
            query(queryString, values, cb);
        };
    };

    return {
        client: client,
        done: connect[1]
    };
};
