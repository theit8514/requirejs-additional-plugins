define(function() {
    function lazy() {
    }

    lazy.get = function() {
        var fileNames = Array.prototype.slice.call(arguments);
        var dfd = $.Deferred();

        fileNames = $.map(fileNames, function(fileName) {
            return fileName;
        });

        require(fileNames, function() {
            dfd.resolve.apply(dfd, arguments);
        });

        return dfd.promise();
    }

    return lazy;
});
