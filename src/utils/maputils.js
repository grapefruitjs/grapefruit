var Vector = require('../math/Vector');

var maputils = {
	screenToMap: function(x,y,camx,camy, stageWidth, stageHeight, unitsPerPixel) {
		var r = new Vector(0,0);
		
		var scrx = (x - (stageWidth/2)) /2;
        var scry = (y - (stageHeight/2)) /2;

        r.x = (unitsPerPixel.x * scrx) + (unitsPerPixel.y * scry) + camx;
        r.y = (unitsPerPixel.y * scry) - (unitsPerPixel.x * scrx) + camy;
		
		return r;
	},
	mapToScreen: function(x,y,camx,camy, stageWidth, stageHeight, unitsPerPixel) {
		var r = new Vector(0,0);
		
		var adjustX = ((stageWidth/2) + 0.5) * unitsPerPixel.x;
		var adjustY = ((stageHeight/2) + 0.5) * unitsPerPixel.y;
		
		 r.x = (x - camx - y + camy + adjustX)/unitsPerPixel.x;
         r.y = (x - camx + y - camy + adjustY)/unitsPerPixel.y;
				
		return r;
	},
	centerTile: function centerTile(p,tileSizeY) {
		p.y += tileSizeY/2;
		return p;
	}
};

module.exports = maputils;