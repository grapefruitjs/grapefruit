/**
 * ImageLayer is a layer represented by a single image
 *
 * @class ImageLayer
 * @extends Layer
 * @constructor
 * @param game {Game} The game the layer is in
 * @param position {Point|Vector|Array|Number} The starting position of the layer
 * @param layer {Object|Texture} All the settings for the layer, or the texture to use
 */
gf.ImageLayer = function(game, pos, image) {
    this.sprite = new gf.Sprite(image);

    this.addChild(this.sprite);

    //call base ctor
    gf.Layer.call(this, game, pos, layer);
};

gf.inherits(gf.ImageLayer, gf.Layer);