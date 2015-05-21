var koa = require('koa');
var koaRoute = require('koa-route');
var render = require('../utils/swig');

var app = koa();

app.use(koaRoute.get('/', function* () {
    this.body = yield render('landing-page');
}));

module.exports = app;
