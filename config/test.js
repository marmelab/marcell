var config = require('./default.json');

config.database.name = config.database.name + '_test';

module.exports = config;
