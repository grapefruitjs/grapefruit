gf.TextureFont = function(font, settings) {
    this.ext = '';

    this.map = {};

    gf.Font.call(this, font, settings);

    if(typeof font === 'string') {
        if(gf.assetCache[font])
            font = gf.assetCache[font];
        else
            throw 'Unknown texture ' + font + ', please load the sprite sheet first!';
    }

    this.textures = font;

    if(this.ext && this.ext.charAt(0) !== '.')
        this.ext = '.' + this.ext;

    this.sprites = new gf.ObjectPool(PIXI.Sprite, this);
};

gf.inherits(gf.TextureFont, gf.Font, {
    _getSprite: function(ch) {
        if(this.map[ch])
            ch = this.map[ch];

        if(!this.textures[ch + this.ext])
            throw 'there is no texture for character "' + ch + '" with extension "' + this.ext + '"';

        var texture = this.textures[ch + this.ext],
            spr = this.sprites.create(texture);

        spr.setTexture(texture);
        spr.visible = true;

        return spr;
    },
    clone: function() {
        return new gf.TextureFont(this.textures, {
            ext: this.ext,
            map: this.map,
            text: this.text,
            align: this.align,
            baseline: this.baseline,
            lineWidth: this.lineWidth,
            lineHeight: this.lineHeight
        });
    },
    setText: function(txt) {
        this.text = txt;

        //free all sprites
        this.sprites.freeAll();
        for(var c = 0, cl = this.children.length; c < cl; ++c)
            this.children[c].visible = false;

        //add text sprites
        var strs = this.text.toString().split('\n'),
            h = 0,
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

                x += spr.texture.frame.width * this.lineWidth;

                if(spr.texture.frame.height > h)
                    h = spr.texture.frame.height;
            }

            y += h * this.lineHeight;
        }
    }
});