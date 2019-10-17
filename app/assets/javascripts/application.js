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
//= require tether
//= require popper
//= require moment
//= require bootstrap-sprockets
//= require tempusdominus-bootstrap-4
//= require_tree .

// $(window).on('page:restore', function(e) {
//     console.log('backspace')
// });

// variables for showing sign up modal
// These are defined outside the turbolinks load so they last across the session
var showModalTimeout = null;
var HEIGHT_TO_SHOW = 400;
var MAX_TIMES_SHOWN_PER_SESSION = 3;
var MAX_TIMES_SHOWN_PER_PAGE = 1;
var timesShownPerSession = 0;
var timesShownPerPage = 0;

// Using getters and setters to avoid weird scope issues
function getTimesShownPerPage() {
    return timesShownPerPage;
}
function getTimesShownPerSession() {
    return timesShownPerSession;
}
function setTimesShownPerPage(val) {
    timesShownPerPage = val;
}
function setTimesShownPerSession(val) {
    timesShownPerSession = val;
}


document.addEventListener("turbolinks:load", function() {

    setTimesShownPerPage(0); // put this here for resetting the show eval modal everytime we change the page

    $(document).ready(function(){
        $("#image-slider").slick({
            dots: true,
            speed: 1000,
            mobileFirst: true,
            autoplay: true,
            autoplaySpeed: 2000
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
                    $form.append($('<input>').attr({ type: 'hidden', name: 'stripeToken', value: result.id }));
                    $form.append($('<input>').attr({ type: 'hidden', name: 'stripeEmail', value: result.email }));
                    $form.submit();
                }
            });
            StripeCheckout.open(opts);
        });

        $('[data-toggle="tooltip"]').tooltip();


        ////////// SHOW EVAL MODAL AFTER SCOLLING CERTAIN AMOUNT ///////////////
        $("#sign-up-modal").on('hide.bs.modal', function() {
            setTimesShownPerSession(getTimesShownPerSession() + 1);
            setTimesShownPerPage(getTimesShownPerPage() + 1);
            clearTimeout(showModalTimeout);
        });
        $(window).scroll(function () {
            if (!showModalTimeout) {
                showModalTimeout = setTimeout(function () {
                    clearTimeout(showModalTimeout);
                    showModalTimeout = null;
                    currentPage = window.location.pathname;
                    var showModal = $(window).scrollTop() >= HEIGHT_TO_SHOW
                        && currentPage !== "/evaluation"
                        && currentPage !== "/calendar"
                        && currentPage !== "/privacy"
                        && getTimesShownPerPage() < MAX_TIMES_SHOWN_PER_PAGE
                        && getTimesShownPerSession() < MAX_TIMES_SHOWN_PER_SESSION;

                    if (showModal) {
                        $("#sign-up-modal").modal('show');
                    }
                }, 1000);
            }
        });
    });
});
