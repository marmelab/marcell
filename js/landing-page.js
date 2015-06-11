var $ = require('../node_modules/jquery/dist/jquery.js');
global.jQuery = $;

require('bootstrap-sass/assets/javascripts/bootstrap/alert');
require('bootstrap-sass/assets/javascripts/bootstrap/modal');

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
        accessKeyId: 'AKIAJN7DXEQTK3L3XTSA',
        secretAccessKey: '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'
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

    $('#beta_form_submit').removeAttr('disabled');

    (function smoothScroll() {
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
    })();

    var screencastPlayer;
    (function loadScreencast() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = function() {
            screencastPlayer = new YT.Player('screencast', {
                height: 315,
                width: 560,
                videoId: '12ieSVNX3HU',
                playerVars: {
                    showInfo: 0,
                    rel: 0,
                    controls: 0
                }
            });
        }
    })();

    (function addScreencastModalEvents() {
        var videoModal = $('#video-modal');

        function resizeModal() {
            $('.modal-content', videoModal).height($('iframe', videoModal).height());
        }

        $('.launch-video').click(function() {
            ga('send', 'event', 'VIDEO_TOUR_MODAL_OPENING', this.id);
            resizeModal();
            videoModal.modal('show');
        });

        videoModal.on('show.bs.modal', function(e) {
            screencastPlayer.playVideo();
        });

        videoModal.on('hide.bs.modal', function(e) {
            screencastPlayer.pauseVideo();
        });

        $(window).resize(resizeModal);
    })();
});
