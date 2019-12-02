(function() {
    var PATH = "/post_medias.json"

    addEventListener("trix-attachment-add", function(event) {
        if (event.attachment.file) {
            uploadFileAttachment(event.attachment)
        }
    })

    function uploadFileAttachment(attachment) {
        uploadFile(attachment.file, setProgress, setAttributes)

        function setProgress(progress) {
            attachment.setUploadProgress(progress)
        }

        function setAttributes(attributes) {
            attachment.setAttributes(attributes)
        }
    }

    function uploadFile(file, progressCallback, successCallback) {
        // var key = createStorageKey(file)
        var formData = createFormData(file)
        var xhr = new XMLHttpRequest()

        xhr.open("POST", PATH, true)
        xhr.setRequestHeader("X-CSRF-Token", Rails.csrfToken())

        xhr.upload.addEventListener("progress", function(event) {
            var progress = event.loaded / event.total * 100
            progressCallback(progress)
        })

        xhr.addEventListener("load", function(event) {
            if (xhr.status == 201) {
                var data = JSON.parse(xhr.responseText);
                console.log(data)
                var attributes = {
                    url: data.url,
                    href: data.url + "content-disposition=attachment"
                }
                successCallback(attributes)
            }
        })

        xhr.send(formData)
    }

    // function createStorageKey(file) {
    //     var date = new Date()
    //     var day = date.toISOString().slice(0, 10)
    //     var name = date.getTime() + "-" + file.name
    //     return ["tmp", day, name].join("/")
    // }

    function createFormData(file) {
        var data = new FormData()
        // data.append("key", key)
        data.append("Content-Type", file.type)
        data.append("file", file)
        data.append("post_id", $("input#post_id").val())
        return data
    }
})();
