var koaMount = require('koa-mount');

module.exports = function(app) {
    app.use(koaMount('/', require('./landing-page')));
};
