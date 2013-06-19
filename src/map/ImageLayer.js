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
gf.Layer = function(game, pos, layer) {
    this.sprite = new gf.Sprite(game, 0, {
        texture: layer.image || layer.texture || layer
    });

    this.addChild(this.sprite);

    //call base ctor
    gf.Layer.call(this, game, pos, layer);
};

gf.inherits(gf.ImageLayer, gf.Layer);