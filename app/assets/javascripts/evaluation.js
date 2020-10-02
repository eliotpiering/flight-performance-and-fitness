// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("turbolinks:load", function() {
    var minDate = moment().startOf('day').add(2, 'days');
    $('.datetimepicker-input').datetimepicker({
        sideBySide: true,
        daysOfWeekDisabled: [0],
        stepping: 15,
        useCurrent: false,
        minDate: minDate
    });

    // MY HONEYPOT
    $(".email-confirmation").hide()
});
