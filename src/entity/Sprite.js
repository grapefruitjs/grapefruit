(function() {
    gf.Sprite = gf.Entity.extend({
        //initializes a new entity with the start position (pos) and the settings defined in Tiled
        init: function(pos, settings) {
            /****************************************************************************
             * Properties that are defined in the `settings` object,
             * these can be specified in the properties of the object layer
             * in Tiled, and overriden on a per-object basis
             ****************************************************************************/
            //size of the sprite (each frame)
            this.size = new gf.Vector(0, 0);

            //number of frames accross x / y (calculated, not set)
            this.numFrames = new gf.Vector(0, 0);

            //offset in the image to the first frame (in pixels)
            this.offset = new gf.Vector(0, 0);

            //opacity of the sprite
            this.opacity = 1.0;

            //raw THREE.Texture instance loaded by the gf.loader
            this.texture = null;

            //defined sprite animations
            this.anim = {};

            //currently active animation
            this.currentAnim = null;

            //currently active frame's active time
            this.currentFrameTime = 0;

            //animations paused
            this.animPaused = false;

            //use screen coords instead of world coords
            this.useScreenCoords = false;

            if(typeof settings.texture == 'string') {
                if(gf.resources[settings.texture])
                    settings.texture = gf.resources[settings.texture].data;
                else
                    throw 'Unable to find texture ' + settings.texture + '; resource not loaded.';
            }

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(pos, settings);

            this._baseHitSize = this.hitSize.clone();
            this._baseScaledHitSize = this.scaledHitSize.clone();
            this._baseHitOffset = this.hitOffset.clone();

            // create a default animation sequence with all sprites
            this.addAnimation('default', { frames: null, duration: 1000 });
            // set as default
            this.setActiveAnimation('default');
        },
        //add a new animation
        addAnimation: function(name, settings) {
            settings = settings || {};

            if(settings instanceof Array)
                settings = { frames: settings };

            this.anim[name] = {
                name: name,
                frames: [],
                idx: 0,
                length: 0,
                frameTime: 0,
                loop: !!settings.loop,
                hitSize: settings.hitSize,
                hitOffset: settings.hitOffset
            };

            if(!settings.frames) {
                settings.frames = [];
                // create a default animation with all sprites in the spritesheet
                for(var f = 0, fl = this.numFrames.x * this.numFrames.y; f < fl; ++f) {
                    settings.frames[f] = f;
                }
            }

            // compute and add the offset of each frame
            for(var i = 0, il = settings.frames.length; i < il; ++i) {
                this.anim[name].frames[i] = new gf.Vector(this.size.x * (settings.frames[i] % this.numFrames.x), this.size.y * Math.floor(settings.frames[i] / this.numFrames.x));
            }
            this.anim[name].length = this.anim[name].frames.length;
            this.anim[name].frameTime = (settings.duration || 0) / this.anim[name].frames.length;

            return this;
        },
        setActiveAnimation: function(name, resetAnim, cb) {
            if(typeof resetAnim == 'function') {
                cb = resetAnim;
                resetAnim = null;
            }

            if(!this.anim[name]) {
                this.currentAnim = name;
            } else {
                if(this.currentAnim && this.currentAnim._cb && !this.currentAnim._cbCalled) {
                    this.currentAnim._cbCalled = true;
                    this.currentAnim._cb(true);
                }

                this.currentAnim = this.anim[name];
                this.currentAnim._done = false;
                this.currentAnim._cbCalled = false;
                this.currentAnim._cb = cb;
                if(resetAnim) this.currentAnim.idx = 0;
                this._setOffset();

                //if we are changing hitbox, save current settings and update
                if(this.currentAnim.hitSize) {
                    if(this.currentAnim.hitSize instanceof gf.Vector) {
                        this.hitSize.copy(this.currentAnim.hitSize);
                        this.scaledHitSize.copy(this.currentAnim.hitSize).multiplyScalar(this.scale);
                    }
                    else if(this.currentAnim.hitSize instanceof Array) {
                        this.hitSize.set(this.currentAnim.hitSize[0], this.currentAnim.hitSize[1]);
                        this.scaledHitSize.set(this.currentAnim.hitSize[0], this.currentAnim.hitSize[1]).multiplyScalar(this.scale);
                    }
                }
                else {
                    this.hitSize.copy(this._baseHitSize);
                    this.scaledHitSize.copy(this._baseScaledHitSize);
                }

                if(this.currentAnim.hitOffset) {
                    if(this.currentAnim.hitOffset instanceof gf.Vector)
                        this.hitOffset.copy(this.currentAnim.hitOffset);
                    else if(this.currentAnim.hitOffset instanceof Array)
                        this.hitOffset.set(this.currentAnim.hitOffset[0], this.currentAnim.hitOffset[1]);
                }
                else {
                    this.hitOffset.copy(this._baseHitOffset);
                }

                this._hitboxMesh.scale.set(this.scaledHitSize.x, this.scaledHitSize.y, 1);
                this.setPosition(this._mesh.position);
            }

            this.currentFrameTime = 0;

            return this;
        },
        isActiveAnimation: function(name) {
            return this.currentAnim.name == name;
        },
        update: function() {
            this._super();

            if(!this.currentAnim || this.currentAnim.frameTime === 0 || this.currentAnim.length <= 1) return;

            this.currentFrameTime += gf.game._delta * 1000;

            //update animation if necessary
            if (this.isVisible && !this.animPaused && !this.currentAnim._done && (this.currentFrameTime > this.currentAnim.frameTime)) {
                while(this.currentFrameTime > this.currentAnim.frameTime) {
                    this.currentFrameTime -= this.currentAnim.frameTime;
                    this.currentAnim.idx++;

                    if(this.currentAnim.idx == this.currentAnim.length) {
                        if(this.currentAnim.loop) {
                            this.currentAnim.idx = 0;
                        }
                        else {
                            this.currentAnim._done = true;
                            if(this.currentAnim._cb && !this.currentAnim._cbCalled) {
                                this.currentAnim._cbCalled = true;
                                this.currentAnim._cb();
                            }
                            return;
                        }
                    }

                    this._setOffset();
                }
            }

            return this;
        },
        _setOffset: function() {
            //for some reason when inversed, the tiles need to start at 1 instead of 0
            var add = this.currentAnim.inverse ? 1 : 0,
                frame = this.currentAnim.frames[this.currentAnim.idx];

            this._material.uvOffset.set(
                frame.x / this.texture.image.width,
                1 - (this.size.y / this.texture.image.height) - (frame.y / this.texture.image.height)
            );
        },
        //override Entity mesh with a sprite instead
        _createMesh: function() {
            if(this._mesh) return;

            if(this.filtered) {
                this.texture.magFilter = THREE.LinearFilter;
                this.texture.minFilter = THREE.LinearMipMapLinearFilter;
            } else {
                this.texture.magFilter = THREE.NearestFilter;
                this.texture.minFilter = THREE.NearestMipMapNearestFilter;
            }

            this.numFrames.set(this.texture.image.width / this.size.x, this.texture.image.height / this.size.y);

            this._material = new THREE.SpriteMaterial({
                color: 0xffffff,
                opacity: 1,
                map: this.texture,

                blending: THREE.NormalBlending,
                alignment: THREE.SpriteAlignment.center,
                useScreenCoordinates: this.useScreenCoords,
                //depthTest: false, //default: !useScreenCoordinates
                sizeAttenuation: true, //default: !useScreenCoordinates
                //scaledByViewport: true //default: !sizeAttenuation
            });

            this._material.uvScale.set(
                1 / this.numFrames.x,
                1 / this.numFrames.y
            );
            this._material.uvOffset.set(0, 0);

            this._mesh = new THREE.Sprite(this._material);

            //scale of a frame
            var scale = new THREE.Vector3(
                (this.size.x / this.texture.image.width),
                (this.size.y / this.texture.image.width),
                1
            );
            scale.multiplyScalar(this.texture.image.width / gf.game._renderer.domElement.height); //relationship to viewport
            scale.multiplyScalar(this.scale); //user defined scale
            scale.z = 1;
            this._mesh.scale.copy(scale);
        }
    });
})();