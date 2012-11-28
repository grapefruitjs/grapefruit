(function() {
    gf.debug = {
        //show fps counter
        showFps: false,
        fpsStyle: {
            position: 'absolute',
            top: '0px',
            left: '0px'
        },

        //draw hitboxes on entities
        showHitbox: false,
        hitboxColor: new THREE.Color(0xff00ff),

        //draw outline around entities
        showOutline: false,
        outlineColor: new THREE.Color(0x000000),

        //provide access directly to the tiledmap layer shader uniforms
        accessTiledUniforms: false,
        tiledUniforms: [],

        //draw map collision points
        showMapColliders: false,
        solidMapColor: new THREE.Color(0xff0000)
    };
})();