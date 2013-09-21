var Container = require('../display/Container'),
    ObjectPool = require('../utils/ObjectPool'),
    Texture = require('../display/Texture'),
    Sprite = require('../display/Sprite'),
    Vector = require('../math/Vector'),
    Rectangle = require('../math/Rectangle'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    PIXI = require('../vendor/pixi');

/**
 * A Text Object will create (a) line(s) of text using bitmap font. To split a line you can use "\n", "\r" or "\r\n"
 * You can generate the fnt files using
 * [http://www.angelcode.com/products/bmfont/] for windows or
 * [http://www.bmglyph.com/] for mac.
 *
 * @class BitmapText
 * @extends Container
 * @constructor
 * @param text {String} The copy that you would like the text to display
 * @param font {Object} The font data object (this is generally grabbed from `game.cache.getBitmapFont('mykey')`);
 * @param font.name {String} The name of the font
 * @param font.size {Number} The base size of the font
 * @param font.lineHeight {Number} The line height of the font
 * @param font.chars {Object} The characters in the font, each should have a texture and kerning info
 * @param [style] {Object} The style parameters
 * @param [style.size=null] {Number} The font size of the text, overrides the font's size
 * @param [style.align="left"] {String} An alignment of the multiline text ("left", "center" or "right")
 */
var BitmapText = function(text, font, style) {
    Container.call(this);

    this.dirty = true;
    this.font = font;
    this._text = text;

    /**
     * The sprite pool to grab character sprites from
     *
     * @property sprites
     * @type ObjectPool
     * @readOnly
     * @private
     */
    this.sprites = new ObjectPool(Sprite, this);

    this.setText(text);
    this.setStyle(style);
};

inherit(BitmapText, Container, {
    setStyle: function(style) {
        style = style || {};

        this.align = style.align;
        this.size = style.size || this.font.size;

        this.dirty = true;
    },
    /**
     * Renders the text character sprites when the text is dirty. This is
     * automatically called when the text/style becomes dirty
     *
     * @method renderText
     */
    renderText: function() {
        var font = this.font,
            pos = new Vector(),
            prevCode = null,
            chars = [],
            maxLineWidth = 0,
            lineWidths = [],
            line = 0,
            scale = this.size / font.size;

        for(var i = 0; i < this.text.length; ++i) {
            var code = this.text.charCodeAt(i),
                ch = this.text.charAt(i);

            //if this is a newline
            if(/(?:\r\n|\r|\n)/.test(ch)) {
                lineWidths.push(pos.x);
                maxLineWidth = Math.max(maxLineWidth, pos.x);
                line++;

                pos.x = 0;
                pos.y += font.lineHeight;
                prevCode = null;
                continue;
            }

            //get this character's data
            var data = font.chars[code];

            if(!data) continue;

            //apply kernings
            if(prevCode && data[prevCode]) {
                pos.x += data.kerning[prevCode] || 0;
            }

            //add character
            chars.push({
                texture: data.texture,
                line: line,
                code: code,
                x: pos.x + data.xOffset,
                y: pos.y + data.yOffset
            });

            //advance the position
            pos.x += data.xAdvance;

            //remember this code for kernings next char
            prevCode = code;
        }

        //final width
        lineWidths.push(pos.x);
        maxLineWidth = Math.max(maxLineWidth, pos.x);

        //unfortunately to do alignment, we have to loop through the lines to get
        //the offsets we need, then loop through characters to apply it. If we didn't
        //support alignment, then characters could be drawn in the above loop, but nooo...
        var lineAlignOffsets = [],
            align = this.align,
            offset = 0;

        for(i = 0; i <= line; ++i) {
            offset = 0;
            if(align === 'right')
                offset = maxLineWidth - lineWidths[i];
            else if(align === 'center')
                offset = (maxLineWidth - lineWidths[i]) / 2;

            lineAlignOffsets.push(offset);
        }

        //now add each character
        for(i = 0; i < chars.length; ++i) {
            var c = this.sprites.create(chars[i].texture);
            c.setTexture(chars[i].texture);
            c.visible = true;

            c.position.x = (chars[i].x + lineAlignOffsets[chars[i].line]) * scale;
            c.position.y = chars[i].y * scale;
            c.scale.x = c.scale.y = scale;
            this.addChild(c);
        }

        //set the width/height
        this.width = pos.x * scale;
        this.height = (pos.y + font.lineHeight) * scale;
    },
    /**
     * Clones this font to get another just like it
     *
     * @method clone
     * @return BitmapText
     */
    clone: function() {
        return new BitmapText(this._text, this.font, {
            align: this.align,
            size: this.size
        });
    },
    /**
     * Updates the text when dirty
     *
     * @method updateTransform
     * @private
     */
    updateTransform: function() {
        if(this.dirty) {
            //free all sprites
            for(var c = 0, cl = this.children.length; c < cl; ++c) {
                var child = this.children[c];
                child.visible = false;
                this.sprites.free(child);
            }

            this.renderText();

            this.dirty = false;
        }

        Container.prototype.updateTransform.call(this);
    }
});

Object.defineProperty(BitmapText.prototype, 'text', {
    get: function() {
        return this._text;
    },
    set: function(text) {
        this._text = text;
        this.dirty = true;
    }
});

BitmapText.parseXML = function(key, xml, texture) {
    var btx = texture.baseTexture;

    if(!xml.getElementsByTagName('font')) {
        utils.warn('Invalid XML for BitmapText.parseXML(), missing <font> tag. Full XML:', xml);
    }

    var data = {},
        info = xml.getElementsByTagName('info')[0],
        common = xml.getElementsByTagName('common')[0];

    data.name = info.attributes.getNamedItem('face').nodeValue;
    data.size = parseInt(info.attributes.getNamedItem('size').nodeValue, 10);
    data.lineHeight = parseInt(common.attributes.getNamedItem('lineHeight').nodeValue, 10);
    data.chars = {};

    //parse characters
    var chars = xml.getElementsByTagName('char');

    for(var i = 0, il = chars.length; i < il; ++i) {
        var letter = chars[i],
            attrs = letter.attributes.getNamedItem,
            code = parseInt(attrs('id').nodeValue, 10),
            rect = new Rectangle(
                parseInt(attrs('x').nodeValue, 10),
                parseInt(attrs('y').nodeValue, 10),
                parseInt(attrs('width').nodeValue, 10),
                parseInt(attrs('height').nodeValue, 10)
            ),
            tx = PIXI.TextureCache[key + '_' + code] = new Texture(btx, rect);

        data.chars[code] = {
            xOffset: parseInt(attrs('xoffset').nodeValue, 10),
            yOffset: parseInt(attrs('yoffset').nodeValue, 10),
            xAdvance: parseInt(attrs('xadvance').nodeValue, 10),
            kerning: {},
            texture: tx
        };
    }

    //parse kernings
    var kernings = xml.getElementsByTagName('kerning');

    for(i = 0, il = kernings.length; i < il; ++i) {
        var kern = kernings[i],
            attrs2 = kern.attributes.getNamedItem,
            first = parseInt(attrs2('first').nodeValue, 10),
            second = parseInt(attrs2('second').nodeValue, 10),
            amount = parseInt(attrs2('amount').nodeValue, 10);

        data.chars[second].kerning[first] = amount;
    }

    PIXI.BitmapText.fonts[data.name] = data;

    return data;
};