gf.Font = function(font, settings) {
    this.align = 'left';
    this.baseline = 'top';
    this.lineWidth = 1;
    this.lineHeight = 1;

    this.text = '';

    gf.DisplayObject.call(this);

    gf.utils.setValues(this, settings);
};

gf.inherits(gf.Font, gf.DisplayObject, {
    setText: function(txt) {
        this.text = txt;
    }
});