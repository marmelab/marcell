var config = require('./config');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.handler = function(event, context) {
    var body  = [
        'Email: ' + event.email,
        'Registration date: ' + new Date().toUTCString()
    ].join("\n");

    var mailOptions = {
        from: 'no-reply@misocell.io',
        to: config.recipient,
        subject: 'New Beta Registration',
        text: body
    };

    try {
        var transporter = nodemailer.createTransport(smtpTransport(config.transport));
        transporter.sendMail(mailOptions, function(err) {
            if (err) {
                context.fail(err);
            }

            context.succeed();
        });
    } catch(e) {
        context.fail(err);
    }
};
