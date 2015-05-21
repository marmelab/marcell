var config = require('config');
var swig = require('swig');
var views = require('co-views');

swig.setDefaults({
    cache: process.env.NODE_ENV === 'production' ? 'memory' : false,
    locals: config.swig.globals
});

module.exports = views(__dirname + '/../views', {
    map: { html: 'swig' }
});
