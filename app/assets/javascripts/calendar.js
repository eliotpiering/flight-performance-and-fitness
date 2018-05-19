document.addEventListener("turbolinks:load", function() {
    $('.event-item').each(function(item) {
        var _this = $(this);
        var duration = parseFloat(_this.data('duration'));
        var height = duration * 80;
        var padding = 5;
        _this.height(height - (padding));
        _this.css("margin-top" , padding);
        _this.css("margin-bottom" , padding);
    });
});
