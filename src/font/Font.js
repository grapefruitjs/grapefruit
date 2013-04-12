gf.Font = function(font, settings) {
    this.size = '12px';
    this.color = '#FFF';

    this.align = 'left';
    this.baseline = 'top';
    this.lineWidth = 1;
    this.lineHeight = 1;

    this.border = '';

    this.text = '';

    gf.DisplayObject.call(this);

    gf.utils.setValues(this, settings);

    var fontNames = [];
    if(typeof font === 'string') {
        fontNames = font.split(',');
        for(var i = 0, il = fontNames.length; i < il; ++i) {
            fontNames[i] = '\'' + fontNames[i] + '\'';
        }
    }

    if(typeof this.size === 'number')
        this.size = this.size + 'px';

    this.font = this.size + ' ' + fontNames.join(',');
    this.dirty = true;
};

gf.inherits(gf.Font, gf.DisplayObject, {
    bold: function() {
        this.font = 'bold ' + this.font;
        this.dirty = true;
    },
    italic: function() {
        this.font = 'italic ' + this.font;
        this.dirty = true;
    },
    setText: function(txt) {
        this.text = txt;
        this.dirty = true;
    },
    update: function() {
        if(!this.dirty) return;

        if(!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.canvas.height = 1024;
            this.ctx = this.canvas.getContext('2d');
        }

        //setup ctx
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.border;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.textAlign = this.align;
        this.ctx.textBaseline = this.baseline;

        //draw strings
        var strs = this.text.split('\n'),
            h = this.size.y * this.lineHeight,
            y = 0;
        for(var i = 0, il = strs.length; i < il; ++i) {
            if(this.border) this.ctx.strokeText(strs[i], 0, y);
            this.ctx.fillText(strs[i].trim(), 0, y);
            y += h;
        }

        //load canvas as a texture
        this.texture = gf.Texture.fromCanvas(this.canvas);

        //and create a sprite for this guy
        for(var c = this.children.length - 1; c > -1; --c)
            this.removeChild(this.children[c]);

        this.addChild(PIXI.Sprite(this.texture));
        this.dirty = false;
    }
});