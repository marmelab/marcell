var $ = require('../node_modules/jquery/dist/jquery.js');
global.jQuery = $;

require('bootstrap-sass/assets/javascripts/bootstrap/alert');
require('bootstrap-sass/assets/javascripts/bootstrap/carousel');
require('bootstrap-sass/assets/javascripts/bootstrap/modal');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');

$(document).on('ready', function() {
    $('.subscribe-beta-button').click(function() {
        ga('send', 'event', 'BETA_SUBSCRIPTION_MODAL_OPENING', this.id);
        $('#beta-form-modal').modal('show');
    });

    $('#beta_form').on('submit', function(e) {
        e.preventDefault();

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

        var form = $(this);
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form.serialize(),
            error: function(xhr) {
                var error;
                try {
                    error = JSON.parse(xhr.responseText);
                    error = error.error;
                } catch(e) {
                    error = 'An unknown error occured. Please retry later.';
                }

                feedback(form, 'danger', error);
            },
            success: function() {
                feedback(form, 'success', 'Registration completed. Thanks for your support!');
                form[0].reset();
            }
        });
    });

    $('#beta_form_submit').removeAttr('disabled');
});
