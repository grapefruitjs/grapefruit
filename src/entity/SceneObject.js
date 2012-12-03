(function() {
    gf.SceneObject = Class.extend({
        //initialize this scene object
        init: function(settings) {
            //size of the entity
            this.size = new THREE.Vector2(1, 1);

            this.zIndex = settings.zIndex || 0;

            this.inViewport = true;

            //for typing arrays as strings in Tiled
            this._arrayDelim = '|';

            this.id = gf.game.getNextObjectId();

            //raw mesh that is the actual object in the scene
            this._mesh = null;

            this.animationQueue = [];

            this.setValues(settings);
        },
        addToScene: function(scene) {
            this.scene = scene;

            if(this._mesh) scene.add(this._mesh);

            return this;
        },
        removeFromScene: function(scene) {
            this.scene = null;

            if(this._mesh) scene.remove(this._mesh);

            return this;
        },
        //similar to https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js#L42
        setValues: function(values) {
            if(!values) return;

            for(var key in values) {
                var newVal = values[key];

                if(newVal === undefined) {
                    console.warn('Object parameter "' + key + '" is undefined.');
                    continue;
                }

                if(key in this) {
                    var curVal = this[key];

                    //type massaging
                    if(typeof curVal === 'number' && typeof newVal === 'string') {
                        var n;
                        if(newVal.indexOf('0x') === 0) n = parseInt(newVal, 16);
                        else n = parseInt(newVal, 10);

                        if(!isNaN(n))
                            curVal = n;
                        else
                            console.warn('Object parameter "' + key + '" evaluated to NaN, using default. Value passed: ' + newVal);

                    } else if(curVal instanceof THREE.Color && typeof newVal === 'number') {
                        curVal.setHex(newVal);
                    } else if(curVal instanceof THREE.Vector2 && newVal instanceof Array) {
                        curVal.set(newVal[0] || 0, newVal[1] || 0);
                    } else if(curVal instanceof THREE.Vector3 && newVal instanceof Array) {
                        curVal.set(newVal[0] || 0, newVal[1] || 0, newVal[2] || 0);
                    } else if(curVal instanceof THREE.Vector2 && typeof newVal === 'string') {
                        var a = newVal.split(_arrayDelim, 2);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0);
                    } else if(curVal instanceof THREE.Vector3 && typeof newVal === 'string') {
                        var a = newVal.split(this._arrayDelim, 3);
                        curVal.set(parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0);
                    } else if(curVal instanceof Array && typeof newVal === 'string') {
                        curVal = newVal.split(this._arrayDelim);
                        gf.utils.each(curVal, function(i, val) {
                            if(!isNaN(val)) curVal[i] = parseInt(val, 10);
                        });
                    } else {
                        this[key] = newVal;
                    }
                }
            }

            return this;
        },
        //set the position of this object in the scene
        setPosition: function(x, y, z) {
            if(!this._mesh) return;

            var zi = (z !== undefined ? z : (this.zIndex ? this.zIndex : 0));

            if(x instanceof THREE.Vector2)
                this._doSetPos(x.x, x.y, zi);
            else if(x instanceof THREE.Vector3)
                this._doSetPos(x.x, x.y, x.z);
            else if(x instanceof Array) {
                if(x.length === 2) this._doSetPos(x[0], x[1], zi);
                else if(x.length === 3) this._doSetPos(x[0], x[1], x[2]);
            } else
                this._doSetPos(x, y, zi);

            return this;
        },
        _doSetPos: function(x, y, z) {
            if(this._mesh) this._mesh.position.set(x, y, z);

            return this;
        },
        update: function() {
            return this;
        }
        //This is being replaced by TWEEN
        /*update: function() {
            return;
            //go backwards so we can splice off things without destroying the array iteration
            for(var i = this.animationQueue.length - 1; i >= 0 && this.animationQueue.length; --i) {
                var item = this.animationQueue[i], ms = delta * 1000;

                item.ms += ms;
                item.part = ms / item.duration;

                //custom animation function
                if(item.step && typeof item.step == 'function') {
                    item.step(item);
                }

                //do property animation
                for(var p in item.properties) {
                    var op, val = util.getObjectProperty(item.object, p);

                    if(!item.interpol[p]) {
                        op = item.properties[p].toString().match(/^(.=)[ ]*(\-?[\d]+\.?[\d]*)$/);

                        if(op === null) {
                            item.op = '+=';
                            item.interpol[p] = parseInt(item.properties[p], 10) - val;
                        } else {
                            item.op = op[1];
                            item.interpol[p] = parseInt(op[2], 10);
                        }
                    }

                    switch(item.op) {
                        case '+=': val += item.part * item.interpol[p]; break;
                        case '-=': val -= item.part * item.interpol[p]; break;
                        case '*=': val *= item.part * item.interpol[p]; break;
                        case '/=': val /= item.part * item.interpol[p]; break;
                    }

                    util.setObjectProperty(item.object, p, val);
                }

                //complete the animation
                if(item.ms >= item.duration) {
                    if(item.complete && typeof item.complete == 'function') {
                        item.complete(item);
                    }

                    this.animationQueue.splice(i, 1);
                }
            }
        },
        //object to aniamte, properties to animate, duration of animation, completed callback
        //not really "Queue" right now, so much as a "list" of animations. There is no deferal yet
        animate: function(obj, opts) {
            this.animationQueue.push({
                object: obj,
                properties: opts.props,
                duration: opts.duration,
                step: opts.step,
                complete: opts.complete,
                ms: 0,
                interpol: {}
            });
        }*/
    });
})();