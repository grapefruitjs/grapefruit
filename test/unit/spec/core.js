describe('core', function() {
    it('should export as `window.gf`', function() {
        window.should.have.property('gf');
    });

    it('should export all objects', function() {
        gf.should.have.properties([
            'AudioManager',
            'AudioPlayer',

            //camera
            'Camera',

            //controls
            'Controls',
            'TopDownControls',

            //display
            'BaseTexture',
            'Container',
            'Graphics',
            'RenderTexture',
            'Sprite',
            'SpriteBatch',
            'Texture',
            'TilingSprite',

            //fx
            'fx',

            //game
            'Game',
            'State',
            'StateManager',
            'World',

            //geometry
            'Circle',
            'Ellipse',
            'Polygon',
            'Rectangle',

            //input
            'Input',
            'InputManager',
            'Keyboard',
            'Gamepad',
            'GamepadButtons',
            'GamepadSticks',
            'Pointers',
            'Pointer',

            //loader
            'Loader',

            //math
            'math',
            'Vector',

            //particles
            'ParticleEmitter',
            'ParticleSystem',

            //physics
            'PhysicsSystem',
            'PhysicsTarget',

            //text
            'BitmapText',
            'Text',

            //tilemap
            'Tile',
            'Tilelayer',
            'Tilemap',
            'Tileset',
            'ObjectGroup',

            //utils
            'utils',
            'support',
            'inherit',
            'Cache',
            'Clock',
            'Color',
            'EventEmitter',
            'ObjectPool',
            'Queue',
            'SpritePool',
            'ObjectFactory',

            //vendor files
            'PIXI',
            'cp'
        ]);

        gf.fx.should.have.property('camera');
        gf.fx.camera.should.have.properties([
            'Effect',
            'Close',
            'Fade',
            'Flash',
            'Scanlines',
            'Shake'
        ]);

        gf.fx.should.have.property('filters');
        gf.fx.filters.should.have.properties([
            'FilterBlock', 'WebGLFilterManager', 'FilterTexture', 'AlphaMaskFilter',
            'ColorMatrixFilter', 'GrayFilter', 'DisplacementFilter', 'PixelateFilter',
            'BlurXFilter', 'BlurYFilter', 'BlurFilter', 'InvertFilter', 'SepiaFilter',
            'TwistFilter', 'ColorStepFilter', 'DotScreenFilter', 'CrossHatchFilter',
            'RGBSplitFilter'
        ]);
    });
});
