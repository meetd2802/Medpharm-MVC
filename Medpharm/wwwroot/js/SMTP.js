var Email = {
    send: function (options) {
        return new Promise((resolve, reject) => {
            options.nocache = Math.floor(1e6 * Math.random() + 1);
            options.Action = "Send";
            const data = JSON.stringify(options);

            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", data, (response) => {
                if (response === "OK") resolve("Email sent successfully!");
                else reject(response);
            });
        });
    },

    ajaxPost: function (url, data, callback) {
        const xhr = Email.createCORSRequest("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            const response = xhr.responseText;
            if (callback) callback(response);
        };
        xhr.send(data);
    },

    createCORSRequest: function (method, url) {
        let xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
};
