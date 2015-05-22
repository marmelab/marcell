var dbClient = require('../services/dbClient');

module.exports = function* (next) {
    var pgConnection = yield dbClient();
    this.dbClient = pgConnection.client;

    try {
        yield next;
    } catch(err) {
        pgConnection.done(err);
        throw err;
    }

    pgConnection.done();
};
