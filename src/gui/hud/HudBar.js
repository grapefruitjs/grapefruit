(function() {
    gf.HudBar = gf.HudItem.extend({
        init: function(x, y, settings) {
            //size of the bar
            this.size = new THREE.Vector2(10, 10);

            //the background of the bar
            this.bg = 'rgba(0,0,0,1)'; //any CSS background value works

            //size of the value bar within
            this.valueSize = new THREE.Vector2(9, 9);

            //the background of the value bar
            this.valueBg = 'rgba(1,1,1,1)';

            this._super(x, y, settings);
        },
        _createElement: function(x, y) {
            this.$elm = $('<div/>', {
                'class': 'gf-hud-item gf-hud-bar ' + this.name,
                position: 'relative',
                top: y,
                left: x
            });

            this.$val = $('<div/>', {
                'class': 'gf-hud-bar-value ' + this.name,
                position
            }).appendTo(this.$elm);

            this._bindEvents();
        },
    });
})();