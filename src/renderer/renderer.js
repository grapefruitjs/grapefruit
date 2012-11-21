(function() {
    gf.renderer = {
        init: function(contId, width, height) {
            gf._scene = new THREE.Scene();
            gf._clock = new THREE.Clock(false);
            gf._renderer = new THREE.WebGLRenderer();
            gf._$cont = $('#' + contId);

            var w = width || gf._$cont.width(),
                h = height || gf._$cont.height();

            gf._renderer.setSize(w, h);
            gf._$cont.append(gf._renderer.domElement);

            gf._camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);
            gf._camera.position.z = 250;

            gf._scene.add(this.camera);

            //add ambient light
            gf._scene.add(new THREE.AmbientLight(0xFFFFFF));

            //fps counter
            if(gf.debug.showFps) {
                gf.debug._fpsCounter = new Stats();
                gf.debug._fpsCounter.domElement.style.position = 'absolute';
                gf.debug._fpsCounter.domElement.style.top = '0px';
                gf.debug._fpsCounter.domElement.style.left = '0px';

                $('body').append(gf.debug._fpsCounter.domElement);
            }
        },
        addObject: function(obj) {
            if(obj && obj.addToScene)
                return obj.addToScene(gf._scene);

            return false;
        },
        render: function() {
            gf._clock.start();
            return gf.renderer._tick();
        },
        _tick: function() {
            //start render loop
            requestAnimationFrame(gf.renderer._tick);

            var delta = gf._clock.getDelta();

            //update fps box
            if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

            //render scene
            gf._renderer.render(gf._scene, gf._camera);
        }
    };
})();