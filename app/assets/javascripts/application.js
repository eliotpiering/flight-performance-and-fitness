// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require turbolinks
//= require jquery.slick
//= require popper
//= require moment
//= require bootstrap-sprockets
//= require tempusdominus-bootstrap-4
//= require_tree .

// $(window).on('page:restore', function(e) {
//     console.log('backspace')
// });

document.addEventListener("turbolinks:load", function() {

    $(document).ready(function(){
        $("#image-slider").slick({
            dots: true,
            speed: 500,
            mobileFirst: true
            // adaptiveHeight: true
        });

        var iOSLink = 'https://itunes.apple.com/app/id1096670541';
        var androidLink = 'https://play.google.com/store/apps/details?id=com.fitnessmobileapps.flightperformanceandfitness&hl=en';
        if (/Android/i.test(navigator.userAgent)) {
            $("a.flight-app-link").attr("href", androidLink)
        } else {
            $("a.flight-app-link").attr("href", iOSLink)
        }

        $('#stripe-submit-button').on('click', function(event) {
            event.preventDefault();
            var $button = $(this),
                $form = $button.parents('form');
            var opts = $.extend({}, $button.data(), {
                token: function(result) {
                    $form.append($('<input>').attr({ type: 'hidden', name: 'stripeToken', value: result.id }))
                    $form.append($('<input>').attr({ type: 'hidden', name: 'stripeEmail', value: result.email }))
                    $form.submit();
                }
            });
            StripeCheckout.open(opts);
        });

        $('[data-toggle="tooltip"]').tooltip()

    });
})
