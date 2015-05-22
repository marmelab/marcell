module.exports = function(dbClient) {
    var betaUser = require('../models/betaUser')(dbClient);

    function merge(obj1, obj2) {
        for (var attrName in obj2) {
            if (!obj2.hasOwnProperty(attrName)) {
                continue;
            }

            obj1[attrName] = obj2[attrName];
        }

        return obj1;
    }

    return {
        addBetaUser: function* (emailData) {
            var defaultData = {
                ip: '127.0.0.1',
                email: 'john.doe@foobarcompany.com'
            };

            var email = merge(defaultData, emailData);

            return yield betaUser.insert(email);
        }
    }
};
