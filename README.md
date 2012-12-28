### GrapeFruit Game Engine

The game engine that powers [lttp-webgl](https://github.com/englercj/lttp-webgl), and the soon to come _Mana_.

## Dependencies

These dependencies are required for the Engine to work properly, but are not packaged with the Engine itself. They should be removed
as dependencies, or packaged with it (jQuery can be removed with some refactoring, the others not so easily).

* [Three.js r54+](https://github.com/mrdoob/three.js)
* [Tween.js v0.3.0+](http://www.createjs.com/#!/TweenJS)

## TODO

* Entity sugar methods
* Map collider edge rolling
* Loader retries
* Support for canvas fallback int TiledMapLayer
* Falling/Jumping support (need to check gravity/friction/slopes in side scroller)
* Tween animations for SceneObject movements