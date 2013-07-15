/**
 * The Base loader class that all other loaders inherit from
 *
 * @class Loader
 * @uses EventEmitter
 * @constructor
 * @param name {String} The name of the resource to load, used as a key in the assetCache
 * @param url {String} The url to load the resource from, also used as a key in the assetCache
 */
gf.Loader = function(name, url) {
    gf.EventEmitter.call(this);

    this.type = 'hey';

    this.name = name;
    this.url = url;
};

gf.inherits(gf.Loader, Object, {
    /**
     * Atempts to load a resource from the asset cache, if it finds the resource
     * in the cache, it will return the value and asynchronously emit the 'load' event
     *
     * @method load
     * @return {mixed} The cached value, or undefined if there is none cached
     */
    load: function() {
        var self = this;

        if(gf.assetCache[this.name]) {
            setTimeout(function() {
                self.done(gf.assetCache[self.name]);
            }, 0);
            return gf.assetCache[this.name];
        }
        else if(gf.assetCache[this.url]) {
            setTimeout(function() {
                self.done(gf.assetCache[self.url]);
            }, 0);
            return gf.assetCache[this.url];
        }
    },
    /**
     * Emits the 'load' event, passing the properties of this instance and the data passed
     *
     * @method load
     * @param data {mixed} The loaded data
     */
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
    /**
     * Emits the 'error' event, passing the properties of this instance and the message passed
     *
     * @method error
     * @param msg {String} The error message that occurred
     */
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