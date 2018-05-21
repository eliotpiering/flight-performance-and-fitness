// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("turbolinks:load", function() {
    $('.datetimepicker-input').datetimepicker({
        sideBySide: true,
        daysOfWeekDisabled: [0],
        stepping: 15,
        useCurrent: false
    });
});
