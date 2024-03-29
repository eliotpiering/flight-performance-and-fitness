document.addEventListener("turbolinks:load", function() {
    $('.event-item').each(function(item) {
        var _this = $(this);
        var duration = parseFloat(_this.data('duration'));
        var hourHeight = 60;
        var height = duration * hourHeight;
        var padding = 5;
        _this.height(height - (padding));
        _this.css("margin-top" , padding);
        _this.css("margin-bottom" , padding);
      if(_this.data('overlap')) {
        var moveDown = parseFloat(_this.data('overlap')) * hourHeight;
        _this.css('width', '85%');
        _this.css("position", "absolute");
        _this.css("top", moveDown);
      }

      if(_this.innerHeight() < (hourHeight) && _this.innerWidth() < 160) {
        var color = _this.css('background-color');
        _this.find('.event-description').css('color', color);
      }

    });
});
