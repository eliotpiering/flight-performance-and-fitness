$(document).ready(function() {
    $("#oembed-submit").on("click", function() {
        var instagramUrl = $("#oembed-input-data").val();
        if(!validUrl(instagramUrl)) {
            raiseAlert("Not a valid url (hint, it should start with https:// or http://)");
            return false;
        };
        Rails.ajax({
            url: '/oembed',
            type: "POST",
            data: "instagram_url=" + instagramUrl,
            success: function(data) {
                var attachment = new Trix.Attachment({ content: data['html']});
                $("trix-editor")[0].editor.insertAttachment(attachment);
            },
            error: function(data) {
                raiseAlert(data['error']);
            }
        });
        return false;
    });

    var validUrl = function(url) {
        var matches =  url.match(/(http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g);
        return matches && matches.length > 0;
    };

    var raiseAlert = function(message) {
        alert(message);
    };
});
