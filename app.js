var koa = require('koa');
var koaMount = require('koa-mount');
var koaStatic = require('koa-static');

var app = koa();

app.use(koaMount('/', koaStatic(__dirname + '/public')));

app.use(require('./middlewares/dbClient'));

require('./controllers')(app);

app.on('error', function(err) {
    console.error(err.message);
    console.error(err.stack);
});

app.listen(3000);

module.exports = app;
