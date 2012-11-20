(function(Z) {
    var _cache = {};

    Z.loader = {
        //Resource format:
        /*
            {
                name: String,
                type: String, (image, texture, json, xml)
                src: String (url)
            }
        */
        load: function(resource) {
            //download a file
            switch(resource.type) {
                case 'json':
                case 'xml':
                case 'image':
            }
        },
        loadWorld: function(world, type) {
            //default to json type but can also be "tmx"
            type = type || 'json';
            //load this world for use (init tilemap, etc)
        }
    };

    function getFile(url, dataType, cb) {
        $.ajax({
            url: url,
            dataType: dataType,
            type: 'GET',
            error: function(jqXHR, textStatus, errorThrown) {
                if(cb) cb(errorThrown || textStatus);
            },
            success: function(data, textStatus, jqXHR) {
                _cache[url] = data;

                if(cb) cb(null, data);
            }
        });
    }
})(window.ZJS);