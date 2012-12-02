(function() {
    gf.gui = {
        init: function() {}
    };

    gf.GuiObject = gf.SceneObject.extend({
        init: function(pos, settings) {
            /****************************************************************************
             * Call base constructor
             ****************************************************************************/
            this._super(settings);

            /****************************************************************************
             * Create the actual object for the scene
             ****************************************************************************/
            //if the hitbox size isn't set, use the same as normal size
            if(this.hitSize.x === 0 && this.hitSize.y === 0)
                this.hitSize = this.size.clone();

            //scale size vectors
            this.scaledSize = this.size.clone().multiplyScalar(this.scale);
            this.scaledHitSize = this.hitSize.clone().multiplyScalar(this.scale);
            this.scaledHitOffset = this.hitOffset.clone().multiplyScalar(this.scale);

            //create main entity mesh
            this._createMesh();

            //create a second mesh for the hitbox
            this._createHitboxMesh();

            //set default position
            this.setPosition(pos);
        },
        _doSetPos: function(x, y, z) {
            this._super(x, y, z);

            // if(this._hitboxMesh) {
            //     this._hitboxMesh.position.set(x, y, z);
            //     if(this.hitOffset) {
            //         this._hitboxMesh.position.x += this.scaledHitOffset.x;
            //         this._hitboxMesh.position.y += this.scaledHitOffset.y;
            //         //translate doesn't seem to work
            //         //this._hitboxMesh.translateX(this.hitOffset.x);
            //         //this._hitboxMesh.translateY(this.hitOffset.y);
            //     }
            // }
        },
    });
})();