$(document).ready(function() {
    $("#oembed-submit").on("click", function() {
        var instagramUrl = $("#oembed-input-data").val();
        Rails.ajax({
            url: '/oembed',
            type: "POST",
            data: "instagram_url=" + instagramUrl,
            success: function(data) {
                var attachment = new Trix.Attachment({ content: data['html']});
                $("trix-editor")[0].editor.insertAttachment(attachment);
            },
            error: function(data) {}
        });
    })
});
