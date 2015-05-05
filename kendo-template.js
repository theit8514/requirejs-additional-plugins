define(['module', 'lazy'], function (module, lazy) {
    var kendoTemplate = {
        randomString: function (length) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
            if (!length) length = Math.floor(Math.random() * chars.length);
            var str = "";
            for (var i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        },
        load: function (name, req, onLoad, config) {
            // Do not bother with the work if a build and kendo-template will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            // Can be used as kendo-template!id?path/to/file
            var index = name.indexOf("?");
            var id, realname = name;
            if (index !== -1) {
                id = name.substring(0, index);
                realname = name.substring(index + 1);
            } else {
                id = "kendotemplate" + kendoTemplate.randomString(8);
            }

            var toLoad = "text!" + realname;

            lazy.get(toLoad).then(function (k) {
                var ret = {
                    _text: "<script id='" + id + "' type='text/x-kendo-template'>\r\n" + k + "\r\n</script>",
                    id: id,
                    load: function (element) {
                        $(element).append(ret._text);
                    }
                };
                onLoad(ret);
            });
        }/*,
        normalize: function() { },
        write: function() { },
        pluginBuilder: function() { }*/
    };

    return kendoTemplate;
});
