document.addEventListener("turbolinks:load", function() {
    $('.tag-selection').selectize({
        create: true,
        onItemAdd: onItemAdd,
        onItemRemove: onItemRemove
    });

    function onItemAdd(value, item) {
        var tagUrl = $(".tag-selection").first().data("tagUrl");
        Rails.ajax({
            url: tagUrl,
            type: "POST",
            data: "tag_title=" + item[0].innerText,
            success: function(data) {},
            error: function(data) {}
        });
    };

    function onItemRemove(value, item) {
        var tagUrl = $(".tag-selection").first().data("tagUrl") + "/" + value;
        Rails.ajax({
            url: tagUrl,
            type: "DELETE",
            success: function(data) {},
            error: function(data) {}
        });
    };
});
