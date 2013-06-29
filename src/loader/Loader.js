gf.Loader = function(name, url) {
    gf.Emitter.call(this);

    this.type = 'hey';

    this.name = name;
    this.url = url;
};

gf.inherits(gf.Loader, Object, {
    load: function() {
        var self = this;

        if(gf.assetCache[this.name]) {
            return setTimeout(function() {
                self.done(gf.assetCache[self.name]);
            }, 0);
        }
        else if(gf.assetCache[this.url]) {
            return setTimeout(function() {
                self.done(gf.assetCache[self.url]);
            }, 0);
        }
    },
    done: function(data) {
        gf.assetCache[this.name] = data;

        //be async for sure
        var self = this;
        setTimeout(function() {
            self.emit('load', {
                name: self.name,
                assetType: self.type,
                url: self.url,
                data: data
            });
        }, 0);
    },
    error: function(msg) {
        //be async for sure
        var self = this;
        setTimeout(function() {
            self.emit('error', {
                name: self.name,
                assetType: self.type,
                url: self.url,
                message: msg
            });
        }, 0);
    }
});