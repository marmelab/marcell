var coBody = require('co-body');
var emailValidator = require('../services/emailValidator');
var koa = require('koa');
var koaRoute = require('koa-route');
var render = require('../services/swig');

var app = koa();

app.use(koaRoute.get('/', function* () {
    this.body = yield render('landing-page');
}));

var betaUserModel;
app.use(function* (next) {
    betaUserModel = require('../models/betaUser')(this.dbClient);
    yield next;
});

app.use(koaRoute.post('/landing-page', function* () {
    var sentData = yield coBody(this);

    if (!sentData.email) {
        this.status = 400;
        this.body = {
            error: 'You should provide an email address.'
        };

        return;
    }

    if (!emailValidator.validate(sentData.email)) {
        this.status = 400;
        this.body = {
            error: 'Email `' + sentData.email + '` is invalid.'
        };

        return;
    }

    try {
        this.body = yield betaUserModel.insert({
            email: sentData.email,
            ip: this.request.ip
        });
    } catch(e) {
        if (e.code == 23505) { // Unicity constraint failed
            this.status = 400;
            this.body = {
                error: 'Address `' + sentData.email + '` has already registered.'
            };

            return;
        }

        throw e;
    }
}));

module.exports = app;
