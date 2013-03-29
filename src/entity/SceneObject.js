(function() {
    gf.SceneObject = Class.extend.call(PIXI.DisplayObjectContainer, {
        //initialize this stage object
        init: function(settings) {
            //size of the entity
            this.size = new gf.Vector(1, 1);

            this.zIndex = settings.zIndex || 0;

            this.inViewport = true;

            //for typing arrays as strings in Tiled
            this._arrayDelim = '|';

            this.id = gf.game.getNextObjectId();

            //raw mesh that is the actual object in the stage
            this._mesh = null;

            this.animationQueue = [];

            gf.utils.setValues(this, settings);
        },
        addToScene: function(stage) {
            this.stage = stage;

            stage.addChild(this);

            return this;
        },
        removeFromScene: function(stage) {
            this.stage = null;

            stage.removeChild(this._mesh);

            return this;
        },
        //set the position of this object in the stage
        setPosition: function(x, y) {
            if(!this._mesh) return;

            //var zi = (z !== undefined ? z : (this.zIndex ? this.zIndex : 0));

            if(x instanceof gf.Vector) {
                this._mesh.position.x = x.x;
                this._mesh.position.y = x.y;
            } else if(x instanceof Array) {
                this._mesh.position.x = x[0];
                this._mesh.position.y = x[1];
            } else {
                this._mesh.position.x = x;
                this._mesh.position.y = y;
            }

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