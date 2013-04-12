gf.TextureFont = function(font, settings) {
    this.ext = '';

    gf.Font.call(this, font, settings);

    if(typeof font === 'string') {
        if(gf.assetCache[font])
            font = gf.assetCache[font];
    }

    this.dirty = true;
    this.textures = font;

    if(this.ext && this.ext.charAt(0) !== '.')
        this.ext = '.' + this.ext;

    delete this.bold;
    delete this.italic;
};

gf.inherits(gf.TextureFont, gf.Font, {
    _getSprite: function(ch) {
        var texture = this.textures[ch + this.ext],
            spr = this.sprites.pop();

        if(!spr)
            spr = new PIXI.Sprite(texture);
        else
            spr.setTexture(texture);

        this.addChild(spr);
    },
    _freeSprite: function(spr) {
        this.sprites.push(spr);
        this.removeChild(spr);
    },
    update: function() {
        if(!this.dirty) return;

        //free all sprites
        for(var c = this.children.length; c > -1; --c)
            this._freeSprite(this.children[c]);

        //add text sprites
        var strs = this.text.split('\n'),
            w = this.size.x * this.lineWidth,
            h = this.size.y * this.lineHeight,
            x = 0,
            y = 0;

        for(var i = 0, il = strs.length; i < il; ++i) {
            var str = strs[i];

            //create the string sprites
            for(var s = 0, sl = str.length; s < sl; ++s) {
                var ch = str.charAt(s),
                    spr = this._getSprite(ch);

                spr.position.x = x;
                spr.position.y = y;

                x += w;
            }

            y += h;
        }

        this.dirty = false;
    }
});