(function() {
    gf.debug = {
        //show fps counter
        showFps: false,
        fpsStyle: {
            position: 'absolute',
            top: '0px',
            left: '0px',
            'z-index': 10
        },

        //provide detailed debug info such as player position, number of entities,
        // tiles the player is colliding with.
        showInfo: false,
        infoStyle: {
            position: 'absolute',
            top: '50px',
            left: '0px',
            'z-index': 10,
            color: '#fff'
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



        /****************************************************************************
         * DebugInfo box that displays live-updaing debug info
         ****************************************************************************/
        Info: function() {
            var br = document.createElement('br');

            //container
            var container = document.createElement('div');
            container.id = 'gf-debug-info';

            //title
            var title = document.createElement('h5');
            title.id = 'gf-debug-info-title';
            title.textContent = 'Debug Info';
            title.style.cssText = 'margin:1px;display:block;';

            container.appendChild(title);

            //number of entities
            var ents = document.createElement('span'),
                entsVal = document.createElement('span');
            ents.id = 'gf-debug-info-entities';
            entsVal.id = 'gf-debug-info-entities-value';
            ents.textContent = 'Number of Objects: ';
            entsVal.textContent = '0';

            ents.appendChild(entsVal);
            container.appendChild(ents);
            container.appendChild(br.cloneNode());

            //player position
            var pos = document.createElement('span'),
                posVal = document.createElement('span');
            pos.id = 'gf-debug-info-position';
            posVal.id = 'gf-debug-info-position-value';
            pos.textContent = 'Player Position: ';
            posVal.textContent = 'X: 0, Y: 0, Z: 0';

            pos.appendChild(posVal);
            container.appendChild(pos);
            container.appendChild(br.cloneNode());

            //colliding tiles
            var tiles = document.createElement('span'),
                tilesVal = document.createElement('span');
            tiles.id = 'gf-debug-info-tiles';
            tilesVal.id = 'gf-debug-info-tiles-value';
            tiles.textContent = 'Colliding Tiles: ';
            tilesVal.textContent = '';

            tiles.appendChild(tilesVal);
            container.appendChild(tiles);
            container.appendChild(br.cloneNode());

            return {
                REVISION: 1,
                domElement: container,
                update: function() {
                    entsVal.textContent = gf.game.numObjects;
                    posVal.textContent = gf.game.player ?
                                            'X: ' + gf.game.player._hitboxMesh.position.x.toFixed(1) +
                                                ', Y: ' + gf.game.player._hitboxMesh.position.y.toFixed(1) +
                                                ', Z: ' + gf.game.player._hitboxMesh.position.z.toFixed(1) :
                                            'none';

                    if(gf.debug._playerColliders && gf.debug._playerColliders.dirty) {
                        gf.debug._playerColliders.dirty = false;
                        tilesVal.innerHTML = '<br/>';
                        for(var i = 0, il = gf.debug._playerColliders.length; i < il; ++i) {
                            tilesVal.innerHTML += 'Tile (' + gf.debug._playerColliders[i].axis + '): ' + 
                                                gf.debug._playerColliders[i].tile.type + 
                                                ' (' + (!!gf.debug._playerColliders[i].tile.normal ? 
                                                        gf.debug._playerColliders[i].tile.normal.x + ', ' + gf.debug._playerColliders[i].tile.normal.y :
                                                        '0, 0')
                                                    + ')<br/>';
                        }
                    }
                }
            }
        },
        /****************************************************************************
         * mrdoob's stats.js (stats.js r10 - http://github.com/mrdoob/stats.js)
         ****************************************************************************/
        FpsCounter:function(){var l=Date.now(),m=l,g=0,n=1E3,o=0,h=0,p=1E3,q=0,r=0,s=0,f=document.createElement("div");f.id="gf-stats";f.addEventListener("mousedown",function(b){b.preventDefault();t(++s%2)},!1);f.style.cssText="width:80px;opacity:0.9;cursor:pointer";var a=document.createElement("div");a.id="fps";a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i=document.createElement("div");i.id="fpsText";i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
        i.innerHTML="FPS";a.appendChild(i);var c=document.createElement("div");c.id="fpsGraph";c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";for(a.appendChild(c);74>c.children.length;){var j=document.createElement("span");j.style.cssText="width:1px;height:30px;float:left;background-color:#113";c.appendChild(j)}var d=document.createElement("div");d.id="ms";d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k=document.createElement("div");
        k.id="msText";k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML="MS";d.appendChild(k);var e=document.createElement("div");e.id="msGraph";e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";for(d.appendChild(e);74>e.children.length;)j=document.createElement("span"),j.style.cssText="width:1px;height:30px;float:left;background-color:#131",e.appendChild(j);var t=function(b){s=b;switch(s){case 0:a.style.display=
        "block";d.style.display="none";break;case 1:a.style.display="none",d.style.display="block"}};return{domElement:f,setMode:t,begin:function(){l=Date.now()},end:function(){var b=Date.now();g=b-l;n=Math.min(n,g);o=Math.max(o,g);k.textContent=g+" MS ("+n+"-"+o+")";var a=Math.min(30,30-30*(g/200));e.appendChild(e.firstChild).style.height=a+"px";r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),p=Math.min(p,h),q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",a=Math.min(30,30-30*(h/100)),c.appendChild(c.firstChild).style.height=
        a+"px",m=b,r=0);return b},update:function(){l=this.end()}}}
    };
})();