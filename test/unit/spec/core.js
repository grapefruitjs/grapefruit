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

            //display
            'BaseTexture',
            'Texture',
            'Container',
            'Sprite',

            //font
            'BitmapText',

            //fx
            'fx',

            //game
            'Game',
            'State',
            'StateManager',

            //gui
            'GuiItem',

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

            //map
            'Tile',
            'Tilelayer',
            'Tilemap',
            'Tileset',
            'ObjectGroup',

            //math
            'math',
            'Circle',
            'Ellipse',
            'Polygon',
            'Rectangle',
            'Vector',

            //particles
            'ParticleEmitter',
            'ParticleSystem',

            //physics
            'PhysicsSystem',
            'PhysicsTarget',

            //utils
            'utils',
            'support',
            'inherit',
            'Cache',
            'Clock',
            'EventEmitter',
            'ObjectPool',
            'SpritePool',
            'ObjectFactory',

            //plugin
            'plugin',

            //vendor files
            'PIXI'
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
    });
});
