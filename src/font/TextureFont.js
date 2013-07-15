/**
 * A texture font makes it easy to use a texture for writing generic text. Basically
 * this holds an array of textures each one representing a character, that all share
 * the same base texture (image). It is the same way a spritesheet works except you
 * use the textures for text instead of animation frames.
 *
 * For special characters, you can either use the `.map` property to map a character
 * to a texture name like `font.map['~'] = 'tilde'` so that any `~` uses the texture named
 * `tilde + font.ext` for rendering; or you can make the texture name be the character code
 * prefixed with `#`. So, for `~`, naming the texture `#126.png` with `font.ext = 'png'`
 * would just work automagically. There is a default map already that you can view in the source,
 * and if you follow that naming convention, it will work without modification as well.
 *
 * @class TextureFont
 * @extends DisplayObjectContainer
 * @constructor
 * @param texture {Texture|String} The sprite sheet to use, if you pass a string make sure to preload it first
 * @param [settings] {Object} All the settings for the font
 * @param [settings.ext] {String} The extension used for the different texture names
 * @param [settings.map] {Object} Maps a special character to a string name
 * @param [settings.spaceSize] {Number} The size of a space character in pixels
 * @param [settings.lineWidth] {Number} The width factor of characters, default is 1 which is normal spacing
 * @param [settings.lineHeight] {Number} The height factor of characters, default is 1 which is normal spacing
 * @param [settings.text] {String} Starting text of the font
 */
gf.TextureFont = function(font, settings) {
    if(typeof font === 'string') {
        if(gf.assetCache[font])
            font = gf.assetCache[font];
        else
            throw 'Unknown texture ' + font + ', please load the sprite sheet first!';
    }

    /**
     * The extension to use with texture names
     *
     * @property ext
     * @type String
     * @default ''
     */
    this.ext = '';

    /**
     * Maps a special character to a string name
     *
     * @property map
     * @type Object
     */
    this.map = {
        '`': 'accent',
        '~': 'tilde',
        '!': 'exclamation',
        '@': 'at',
        '#': 'hash',
        '$': 'dollar',
        '%': 'percent',
        '^': 'carret',
        '&': 'ampersand',
        '*': 'asterisk',
        '(': 'open-parenthesis',
        ')': 'close-parenthesis',
        '-': 'dash',
        '_': 'underscore',
        '+': 'plus',
        '=': 'equal',
        '{': 'open-brace',
        '}': 'close-brace',
        '[': 'open-bracket',
        ']': 'close-bracket',
        '\\': 'backslash',
        '|': 'pipe',
        ':': 'colon',
        ';': 'semicolon',
        '"': 'quote',
        '\'': 'single-quote',
        '<': 'less-than',
        '>': 'greater-than',
        ',': 'comma',
        '.': 'period',
        '?': 'question',
        '/': 'slash'
    };

    /**
     * The size of a space character in pixels
     *
     * @property spaceSize
     * @type Number
     */
    this.spaceSize = 15;

    /**
     * The width factor of characters, default is 1 which is normal spacing
     *
     * @property lineWidth
     * @type Number
     */
    this.lineWidth = 1;

    /**
     * The height factor of characters, default is 1 which is normal spacing
     *
     * @property lineHeight
     * @type Number
     */
    this.lineHeight = 1;

    /**
     * The textures for all the characters in the alphabet
     *
     * @property textures
     * @type Object<Texture>
     * @readOnly
     * @private
     */
    this.textures = font;

    /**
     * The sprite pool to grab character sprites from
     *
     * @property sprites
     * @type ObjectPool
     * @readOnly
     * @private
     */
    this.sprites = new gf.ObjectPool(gf.Sprite, this);

    //call base ctor
    gf.DisplayObjectContainer.call(this, settings);

    if(this.ext && this.ext.charAt(0) !== '.')
        this.ext = '.' + this.ext;

    if(settings.text)
        this.setText(settings.text);
};

gf.inherits(gf.TextureFont, gf.DisplayObjectContainer, {
    /**
     * Gets a sprite from the pool for the character pased
     *
     * @method _getSprite
     * @param character {String} The character to get a sprite for
     * @return Sprite
     */
    _getSprite: function(ch) {
        if(this.map[ch])
            ch = this.map[ch];

        //skips spaces
        if(ch === '' || ch === ' ')
            return null;

        var texture = this.textures[ch + this.ext];

        //try character code
        if(!texture)
            texture = this.textures['#' + ch.charCodeAt(0) + this.ext];

        //if no match, error
        if(!texture)
            throw 'There is no texture for character "' + ch + '" with extension "' + this.ext + '"';

        var spr = this.sprites.create(texture);

        spr.setTexture(texture);
        spr.visible = true;

        return spr;
    },
    /**
     * Clones this font to get another just like it
     *
     * @method clone
     * @return TextureFont
     */
    clone: function() {
        return new gf.TextureFont(this.textures, {
            ext: this.ext,
            map: this.map,
            text: this.text,
            lineWidth: this.lineWidth,
            lineHeight: this.lineHeight
        });
    },
    /**
     * Sets the text of this font to the string passed
     *
     * @method setText
     * @param text {String} The text to display
     */
    setText: function(txt) {
        this.text = txt;

        //free all sprites
        for(var c = 0, cl = this.children.length; c < cl; ++c) {
            var child = this.children[c];
            child.visible = false;
            this.sprites.free(child);
        }

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

                if(spr !== null) {
                    spr.position.x = x;
                    spr.position.y = y;

                    if(spr.texture.frame.height > h)
                        h = spr.texture.frame.height;

                    x += spr.texture.frame.width * this.lineWidth;
                } else {
                    x += this.spaceSize * this.lineWidth;
                }

            }

            y += h * this.lineHeight;
        }
    }
});