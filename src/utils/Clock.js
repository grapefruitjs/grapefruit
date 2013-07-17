/**
 * High performance clock, from mrdoob's Three.js:
 * <a target="_blank" href="https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js">/src/core/Clock.js</a>
 *
 * @class Clock
 * @extends Object
 * @namespace gf
 * @constructor
 * @param autoStart {Boolean} Automatically start the counter or not
 * @example
 *      var clock = new gf.Clock(false);
 *      //... some code ...
 *      clock.start();
 *      //... some long code ...
 *      var delta = clock.getDelta();
 */
gf.Clock = function(autoStart) {
    this.autoStart = (autoStart !== undefined) ? autoStart : true;

    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;

    this.running = false;
};

gf.inherits(gf.Clock, Object, {
    /**
     * Starts the timer
     *
     * @method start
     * @example
     *      clock.start();
     */
    start: function() {
        this.startTime = window.performance !== undefined && window.performance.now !== undefined ?
                            window.performance.now() : Date.now();

        this.oldTime = this.startTime;
        this.running = true;
    },
    /**
     * Stops the timer
     *
     * @method stop
     * @example
     *      clock.stop();
     */
    stop: function() {
        this.getElapsedTime();
        this.running = false;
    },
    /**
     * Gets the total time that the timer has been running
     *
     * @method getElapsedTime
     * @return {Number} Total ellapsed time in ms
     * @example
     *      clock.getElapsedTime();
     */
    getElapsedTime: function() {
        this.getDelta();

        return this.elapsedTime;
    },
    /**
     * Gets the difference in time since getDelta() was called last
     *
     * @method getDelta
     * @return {Number} Ellapsed time since last call in seconds
     * @example
     *      clock.getDelta();
     */
    getDelta: function() {
        var diff = 0;

        if(this.autoStart && !this.running) {
            this.start();
        }

        if(this.running) {
            var newTime = window.performance !== undefined && window.performance.now !== undefined ?
                                window.performance.now() : Date.now();

            diff = 0.001 * (newTime - this.oldTime);
            this.oldTime = newTime;

            this.elapsedTime += diff;
        }

        return diff;
    }
});
