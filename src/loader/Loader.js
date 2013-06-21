gf.Loader = function(al, name, url) {
    gf.EventTarget.call(this);

    this.type = 'hey';

    this.parent = al;
    this.name = name;
    this.url = url;
};

gf.inherits(gf.Loader, Object, {
    load: function() {
        //override!
    },
    done: function(data) {
        this.emit({
            type: 'load',
            assetType: this.type,
            url: this.url,
            data: data
        });
    },
    error: function(msg) {
        this.emit({
            type: 'error',
            assetType: this.type,
            message: msg
        });
    }
});