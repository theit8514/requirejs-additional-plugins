define(['module', 'lazy'], function (module, lazy) {
    var style = {
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
            // Do not bother with the work if a build and requirejs-style will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            // Can be used as style!id?path/to/file
            var index = name.indexOf("?");
            var id = "", realname = name;
            if (index !== -1) {
                id = name.substring(0, index);
                realname = name.substring(index + 1);
            } else {
                id = "style" + style.randomString(8);
            }

            var toLoad = "text!" + realname;

            lazy.get(toLoad).then(function (k) {
                var ret = {
                    _text: "<style id='" + id + "' type='text/css'>\r\n" + k + "\r\n</style>",
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

    return style;
});
