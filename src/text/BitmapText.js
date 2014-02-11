var SpriteBatch = require('../display/SpriteBatch'),
    ObjectPool = require('../utils/ObjectPool'),
    Texture = require('../display/Texture'),
    Sprite = require('../display/Sprite'),
    Vector = require('../math/Vector'),
    Rectangle = require('../geom/Rectangle'),
    utils = require('../utils/utils'),
    inherit = require('../utils/inherit'),
    PIXI = require('pixi.js');

/**
 * A Text Object will create (a) line(s) of text using bitmap font. To split a line you can use "\n", "\r" or "\r\n"
 * You can generate the fnt files using [bmfont](http://www.angelcode.com/products/bmfont/) for windows or
 * [bmglyph](http://www.bmglyph.com/) for mac.
 *
 * @class BitmapText
 * @extends SpriteBatch
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
    SpriteBatch.call(this);

    /**
     * Whether or not the bitmap text is dirty and should be redrawn
     *
     * @property dirty
     * @type Boolean
     * @default false
     */
    this.dirty = false;

    /**
     * The font descriptor that holds the font data (name, size, chars, etc)
     *
     * @property font
     * @type Object
     * @readOnly
     */
    this.font = font;

    /**
     * A monospacing to apply to the font instead of the actual character/kerning spacing.
     * When set to `0` the default font values will be used.
     *
     * @property monospace
     * @type Number
     * @default 0
     */
    this.monospace = 0;

    /**
     * The actual text that is currently rendered, please use the `text` property
     * and do not set this directly.
     *
     * @property _text
     * @type String
     * @readOnly
     * @private
     */
    this._text = text;

    /**
     * The current style of the bitmap text
     *
     * @property _style
     * @type Object
     * @readOnly
     * @private
     */
    this._style = {
        size: null,
        align: 'left'
    };

    /**
     * The sprite pool to grab character sprites from
     *
     * @property sprites
     * @type ObjectPool
     * @readOnly
     * @private
     */
    this.sprites = new ObjectPool(Sprite, this);

    this.text = text;
    this.style = style;
};

inherit(BitmapText, SpriteBatch, {
    /**
     * Renders the text character sprites when the text is dirty. This is
     * automatically called when the text/style becomes dirty.
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
            scale = this._style.size / font.size;

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
            pos.x += (this.monospace || data.xAdvance);

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
            align = this._style.align,
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
        var lenChars = chars.length,
            lenChildren = this.children.length,
            tint = this._style.tint || 0xFFFFFF,
            child;

        for(i = 0; i < lenChars; ++i) {
            child = i < lenChildren ? this.children[i] : this.sprites.create(chars[i].texture);

            child.setTexture(chars[i].texture);

            child.position.x = (chars[i].x + lineAlignOffsets[chars[i].line]) * scale;
            child.position.y = chars[i].y * scale;
            child.scale.x = child.scale.y = scale;
            child.tint = tint;

            if(!child.parent)
                this.addChild(child);
        }

        //remove unnecesary children and free into pool
        while(this.children.length > lenChars) {
            child = this.children[this.children.length - 1];
            this.sprites.free(child);
            this.removeChild(child);
        }

        //set the width/height
        this.width = maxLineWidth * scale;
        this.height = (pos.y + font.lineHeight) * scale;
    },
    /**
     * Clones this BitmapText to get another just like it
     *
     * @method clone
     * @return BitmapText
     */
    clone: function() {
        return new BitmapText(this._text, this.font, this._style);
    },
    /**
     * Updates the text when dirty, called each frame by PIXI's render methods
     *
     * @method updateTransform
     * @private
     */
    updateTransform: function() {
        if(this.dirty) {
            this.renderText();

            this.dirty = false;
        }

        SpriteBatch.prototype.updateTransform.call(this);
    }
});

/**
 * The text that will be rendered.
 *
 * @property text
 * @type String
 */
Object.defineProperty(BitmapText.prototype, 'text', {
    get: function() {
        return this._text;
    },
    set: function(text) {
        this._text = text;
        this.dirty = true;
    }
});

/**
 * The style of the text to be rendered. Valid properties are
 * `size` and `align`.
 *
 * @property style
 * @type Object
 */
Object.defineProperty(BitmapText.prototype, 'style', {
    get: function() {
        return this._style;
    },
    set: function(style) {
        this._style.size = (style && style.size) || this._style.size;
        this._style.align = (style && style.align) || this._style.align;
        this.dirty = true;
    }
});

/**
 * The size of the text to render.
 *
 * @property size
 * @type Number
 */
Object.defineProperty(BitmapText.prototype, 'size', {
    get: function() {
        return this._style.size;
    },
    set: function(size) {
        this._style.size = size || this._style.size;
        this.dirty = true;
    }
});

/**
 * The alignment of the text to render, valid values are `'left'`,
 * `'right'`, or `'center'`.
 *
 * @property align
 * @type String
 */
Object.defineProperty(BitmapText.prototype, 'align', {
    get: function() {
        return this._style.align;
    },
    set: function(align) {
        this._style.align = align || this._style.align;
        this.dirty = true;
    }
});

/**
 * Parses an XML font file into a font object that can be passed into a BitmapText instance.
 * This is called by the Cache when XML bitmap data is added.
 *
 * @method parseXML
 * @param key {String} The cache key for the font
 * @param xml {Document} The XML document to parse
 * @param texture {Texture} The texture to use for creating character textures
 * @static
 */
BitmapText.parseXMLFont = function(key, xml, texture) {
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
            attrs = letter.attributes,
            code = parseInt(attrs.getNamedItem('id').nodeValue, 10),
            rect = new Rectangle(
                parseInt(attrs.getNamedItem('x').nodeValue, 10),
                parseInt(attrs.getNamedItem('y').nodeValue, 10),
                parseInt(attrs.getNamedItem('width').nodeValue, 10),
                parseInt(attrs.getNamedItem('height').nodeValue, 10)
            ),
            tx = PIXI.TextureCache[key + '_' + code] = new Texture(btx, rect);

        data.chars[code] = {
            xOffset: parseInt(attrs.getNamedItem('xoffset').nodeValue, 10),
            yOffset: parseInt(attrs.getNamedItem('yoffset').nodeValue, 10),
            xAdvance: parseInt(attrs.getNamedItem('xadvance').nodeValue, 10),
            kerning: {},
            texture: tx
        };
    }

    //parse kernings
    var kernings = xml.getElementsByTagName('kerning');

    for(i = 0, il = kernings.length; i < il; ++i) {
        var kern = kernings[i],
            attrs2 = kern.attributes,
            first = parseInt(attrs2.getNamedItem('first').nodeValue, 10),
            second = parseInt(attrs2.getNamedItem('second').nodeValue, 10),
            amount = parseInt(attrs2.getNamedItem('amount').nodeValue, 10);

        data.chars[second].kerning[first] = amount;
    }

    PIXI.BitmapText.fonts[data.name] = data;

    return data;
};

module.exports = BitmapText;
