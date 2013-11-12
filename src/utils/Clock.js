var inherit = require('./inherit');

/**
 * High performance clock, based on mrdoob's
 * [Three.js clock](https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js),
 * but with tweaks.
 *
 * @class Clock
 * @extends Object
 * @constructor
 */
var Clock = function() {
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;

    this.running = false;

    this.timer = window.performance && window.performance.now ? window.performance : Date;
};

inherit(Clock, Object, {
    /**
     * Gets the current time from the underlying timer
     *
     * @method now
     * @return {Number} The current timestamp
     * @example
     *      clock.now();
     */
    now: function() {
        return this.timer.now();
    },
    /**
     * Starts the timer
     *
     * @method start
     * @return {Clock} Returns itself.
     * @chainable
     * @example
     *      clock.start();
     */
    start: function() {
        this.startTime = this.oldTime = this.now();
        this.running = true;

        return this;
    },
    /**
     * Stops the timer
     *
     * @method stop
     * @return {Clock} Returns itself.
     * @chainable
     * @example
     *      clock.stop();
     */
    stop: function() {
        this.getElapsedTime();
        this.running = false;

        return this;
    },
    /**
     * Resets the timer
     *
     * @method reset
     * @return {Clock} Returns itself.
     * @chainable
     * @example
     *      clock.reset();
     */
    reset: function() {
        this.elapsedTime = 0;
        this.startTime = this.oldTime = this.now();

        return this;
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

        if(this.running) {
            var newTime = this.now();

            diff = 0.001 * (newTime - this.oldTime);
            this.oldTime = newTime;

            this.elapsedTime += diff;
        }

        return diff;
    }
});

module.exports = Clock;
