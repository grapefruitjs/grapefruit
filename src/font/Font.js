gf.Font = function(font, settings) {
    this.align = 'left';
    this.baseline = 'top';
    this.lineWidth = 1;
    this.lineHeight = 1;

    this.text = '';

    gf.DisplayObjectContainer.call(this, settings);
};

gf.inherits(gf.Font, gf.DisplayObjectContainer, {
    setText: function(txt) {
        this.text = txt;
    }
});