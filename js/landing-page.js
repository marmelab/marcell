var $ = require('../node_modules/jquery/dist/jquery.js');
global.jQuery = $;

require('bootstrap-sass/assets/javascripts/bootstrap/alert');
require('bootstrap-sass/assets/javascripts/bootstrap/carousel');
require('bootstrap-sass/assets/javascripts/bootstrap/modal');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');

$(document).on('ready', function() {
    // Beta subscription
    $('.subscribe-beta-button').click(function() {
        ga('send', 'event', 'BETA_SUBSCRIPTION_MODAL_OPENING', this.id);
        $('#beta-form-modal').modal('show');
    });

    var feedback = function(form, type, message) {
        form.find('.alert').remove();

        var feedbackContainer = '<div class="alert alert-##TYPE## alert-dismissible fade in" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>' +
            '##CONTENT##' +
            '</div>';

        feedbackContainer = feedbackContainer.replace('##TYPE##', type);
        feedbackContainer = feedbackContainer.replace('##CONTENT##', message);

        form.find('.modal-body').prepend(feedbackContainer);
    };

    var lambda = new AWS.Lambda({
        region: 'eu-west-1',
        accessKeyId: 'xxx',
        secretAccessKey: 'xxx'
    });

    $('#beta_form').on('submit', function(e) {
        e.preventDefault();

        var email = $('#email').val();
        ga('send', 'event', 'BETA_SUBSCRIPTION_FORM_SENT', email);

        var form = $(this);
        var payload = {
            email: email
        };

        lambda.invoke({
            FunctionName: 'Misocell_SendBetaSubscription',
            Payload: JSON.stringify(payload)
        }, function(err) {
            if (err) {
                return feedback(form, 'danger', err);
            }

            feedback(form, 'success', 'Registration completed. Thanks for your support!');
            form[0].reset();
        });
    });

    // Smooth scroll
    var BODY_TOP_PADDING = 60;
    $('.navbar').on('click', 'a[href*=#]:not([href=#])', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - BODY_TOP_PADDING
                }, 500);
                return false;
            }
        }
    });

    $('#beta_form_submit').removeAttr('disabled');

    // Screencast modal
    $('.launch-video').click(function() {
        ga('send', 'event', 'VIDEO_TOUR_MODAL_OPENING', this.id);
        $('#video-modal').modal('show');
    });
});
