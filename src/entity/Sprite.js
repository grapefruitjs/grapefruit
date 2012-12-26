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
            this.size = new THREE.Vector2(0, 0);

            //number of frames accross x / y (calculated, not set)
            this.numFrames = new THREE.Vector2(0, 0);

            //offset in the image to the first frame (in pixels)
            this.offset = new THREE.Vector2(0, 0);

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

            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(pos, settings);

            this._baseHitSize = this.hitSize.clone();
            this._baseScaledHitSize = this.scaledHitSize.clone();
            this._baseHitOffset = this.hitOffset.clone();

            // create a default animation sequence with all sprites
            this.addAnimation('default', null, 1000, true);
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
                this.anim[name].frames[i] = new THREE.Vector2(this.size.x * (settings.frames[i] % this.numFrames.x), this.size.y * Math.floor(settings.frames[i] / this.numFrames.x));
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
                if(this.currentAnim._cb && !this.currentAnim._cbCalled) {
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
                    if(this.currentAnim.hitSize instanceof THREE.Vector2) {
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
                    if(this.currentAnim.hitOffset instanceof THREE.Vector2)
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

            //var currColumn = (this.currentFrame + add) % (this.currentAnim.numFrames.x + add);
            this.texture.offset.x = (frame.x / this.texture.image.width);//(frame.x / this.currentAnim.numFrames.x);// + (this.offset.x / this.numFrames.x) + (this.currentAnim.offset.x / this.numFrames.x);

            //var currRow = Math.floor((this.currentTile + add) / (this.currentAnim.numFrames.x + add));
            this.texture.offset.y = 1 - (this.size.y / this.texture.image.height) - (frame.y / this.texture.image.height);//(frame.y / this.currentAnim.numFrames.y);// + (this.offset.y / this.numFrames.y) + (this.currentAnim.offset.y / this.numFrames.y);
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

            /*
             * Really need to be using sprite, not a plane...

            this._mesh = new THREE.Sprite({
                map: this.texture,
                useScreenCoordinates: this.useScreenCoords,
                scaleByViewport: true
            });
            //scale mesh
            this._mesh.scale.x = -(1 / this.numFrames.x);
            this._mesh.scale.y = (1 / this.numFrames.y);

            //texture offset to first frame
            this._mesh.uvOffset.x = 1 - this._mesh.scale.x;
            this._mesh.uvOffset.y = 1 - this._mesh.scale.y;

            //scale texture
            this._mesh.uvScale.x = (1 / this.numFrames.x);
            this._mesh.uvScale.y = (1 / this.numFrames.y);
            */

            //setup wrapping of the texture
            this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
            //scale the texture to show only one frame
            this.texture.repeat.set(
                (1 / this.numFrames.x),
                (1 / this.numFrames.y)
            );
            //move the texture to the frame defined in offset
            this.texture.offset.x = (this.offset.x / this.texture.image.width);
            this.texture.offset.y = 1 - (this.size.y / this.texture.image.height) - (this.offset.y / this.texture.image.height); //convert a topleft offset to a bottomleft offset

            //create the geometry, material, and mesh objects
            this._materials = [];

            this._materials.push(new THREE.MeshBasicMaterial({ map: this.texture, transparent: true }));

            //add outline material if needed
            if(gf.debug.showOutline) {
                this._materials.push(new THREE.MeshBasicMaterial({
                    color: gf.debug.outlineColor,
                    wireframe: true,
                    wireframeLinewidth: 1
                }));
            }

            this._geom = new THREE.PlaneGeometry(this.scaledSize.x, this.scaledSize.y);
            this._mesh = THREE.SceneUtils.createMultiMaterialObject(this._geom, this._materials);//new THREE.Mesh(this._geom, this._material);

            //multimaterials object doesn't have .geometry defined
            this._mesh.geometry = this._geom;
        }
    });
})();