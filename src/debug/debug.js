/**
 * A simple object to show some debug items
 *
 * @class debug
 */
 gf.debug = {
    /**
     * The styles applied to the fps box after it is created
     *
     * @property fpsStyle
     */
    fpsStyle: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        'z-index': 10
    },
    /**
     * Shows the FPS Counter
     *
     * @method showFpsCounter
     */
    showFpsCounter: function() {
        gf.debug._fpsCounter = new gf.debug.FpsCounter();
        for(var s in gf.debug.fpsStyle) {
            gf.debug._fpsCounter.domElement.style[s] = gf.debug.fpsStyle[s];
        }
        document.body.appendChild(gf.debug._fpsCounter.domElement);
    },
    /**
     * Shows some debug info such as player position and the gamepad state
     *
     * @method showDebugInfo
     * @param game {Game} The game instance to show info for
     * @param pad {Boolean} Whether or not to show gamepad info (defaults to true)
     */
    showDebugInfo: function(game, pad) {
        gf.debug._info = new gf.debug.Info(game, pad);
        document.body.appendChild(gf.debug._info.domElement);
    },
    /**
     * Called internally by the Game instance
     *
     * @method update
     * @private
     */
    update: function() {
        //update fps box
        if(gf.debug._fpsCounter) gf.debug._fpsCounter.update();

        //update debug info
        if(gf.debug._info) gf.debug._info.update();
    },
    Info: function(game, pad) {
        this.game = game;
        this.showGamepad = pad !== undefined ? pad : true;

        var br = document.createElement('br');

        //container
        var container = document.createElement('div');
        container.id = 'gf-debug-info';
        container.style['position'] = 'absolute';
        container.style['top'] = '50px';
        container.style['left'] = '0';
        container.style['z-index'] = '10';
        container.style['color'] = '#FFF';
        container.style['font-size'] = '0.9em';

        //title
        var title = document.createElement('h3');
        title.id = 'gf-debug-info-title';
        title.textContent = 'Debug Info';
        title.style.cssText = 'margin:1px;display:block;';

        container.appendChild(title);

        //player position
        var pos = document.createElement('span'),
            posVal = document.createElement('span');
        pos.id = 'gf-debug-info-position';
        posVal.id = 'gf-debug-info-position-value';
        pos.textContent = 'Player Position: ';
        posVal.textContent = 'X: 0, Y: 0';

        //gamepads
        var pads = document.createElement('span');
        pads.id = 'gf-debug-info-gamepads';

        container.appendChild(pads);

        pos.appendChild(posVal);
        container.appendChild(pos);
        container.appendChild(br.cloneNode());

        this.player = 

        this.REVISION = 1;
        this.domElement = container;
        this.update = function() {
            posVal.textContent = this.game.players[0] ?
                                    'X: ' + this.game.players[0].position.x.toFixed(1) + ', Y: ' + this.game.players[0].position.y.toFixed(1) :
                                    'none';

            if(this.showGamepad) {
                pads.innerHTML = '';
                if(this.game.input.gamepad.pads && this.game.input.gamepad.pads.length) {
                    for(var i = 0, il = this.game.input.gamepad.pads.length; i < il; ++i) {
                        var pad = this.game.input.gamepad.pads[i];

                        pads.innerHTML += 'Gamepad: [' + pad.index + '] ' + pad.id + '<br/>';
                        pads.innerHTML += '&nbsp;&nbsp;&nbsp;Buttons:<br/>' + 
                                            pad.buttons.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.input.getGpButtonName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                        pads.innerHTML += '&nbsp;&nbsp;&nbsp;Axes:<br/>' + 
                                            pad.axes.map(function(v, i) { return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + gf.input.getGpAxisName(i) + ': ' + v.toFixed(2); }).join('<br/>') + '<br/>';
                    }
                }
            }
        };
    },
    //mrdoob's stats.js (stats.js r10 - http://github.com/mrdoob/stats.js)
    FpsCounter:function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="gf-stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
    k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
    "block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
    a+"px",m=b,r=0);return b},update:function(){l=this.end()}}}
};
