var app = require('../../app');
var assert = require('chai').assert;
var dbClient = require('../../services/dbClient');
var request = require('supertest').agent(app.listen());

describe('Controller: Landing Page', function() {
    var client, fixtureLoader;
    beforeEach(function* () {
        client = yield dbClient();
        client = client.client;
        fixtureLoader = require('../fixtureLoader')(client);
    });

    describe('POST /landing-page', function() {
        var postEmail = function(email) {
            return function(cb) {
                request
                    .post('/landing-page')
                    .send({ email: email })
                    .end(function(err, res) {
                        cb(null, res);
                    });
            };
        };

        it('should persist given email and IP and return a 200', function* () {
            var response = yield postEmail('john.doe@foobarcompany.com');

            assert.equal(response.statusCode, 200);
            assert.equal(response.body.ip, '::ffff:127.0.0.1');
            assert.equal(response.body.email, 'john.doe@foobarcompany.com');
            assert.isNotNull(response.body.created_at);
        });

        it('should return an error message if email is empty', function* () {
            var response = yield postEmail('');

            assert.equal(response.statusCode, 400);
            assert.equal(response.body.error, 'You should provide an email address.');
        });

        it('should return an error message if email is not valid', function* () {
            var response = yield postEmail('invalid email');

            assert.equal(response.statusCode, 400);
            assert.equal(response.body.error, 'Email `invalid email` is invalid.');
        });

        it('should return a related message if email is already registered', function*() {
            yield fixtureLoader.addBetaUser('john.doe@foobarcompany.com');

            var response = yield postEmail('john.doe@foobarcompany.com');

            assert.equal(response.statusCode, 400);
            assert.equal(response.body.error, 'Address `john.doe@foobarcompany.com` has already registered.');
        });
    });

    afterEach(function* () {
        yield client.query_('TRUNCATE beta_user');
    })
});
