### GrapeFruit Game Engine

The game engine that powers [lttp-webgl](https://github.com/englercj/lttp-webgl) and [shiv](https://github.com/englercj/shiv).

The goal of this project is for users to be able to make a game with minimal programming and judicious use 
of the [Tiled Map Editor](http://mapeditor.org); while at the same time providing a powerful API for creating
intense and complex 2D games.

Some features that GrapeFruit gives you:

 - WebGL rendering with Canvas Fallback
 - Powerful entity interaction system
 - Robust GUI/HUD system
 - Support for keyboard, mouse, and gamepad input
 - Channeled audio playback
 - First-class Tiled Map Editor integration
 - Easy-to-use plugin system
 - much more!

## Current State

This project is under heavy development, and the API is subject to change at any time. Check the GitHub issue list
to see what is needed to reach `v0.1.0`, the first unstable release.

## Rendering Engine

Under the hood gf uses [Pixi.js](https://github.com/GoodBoyDigital/pixi.js) for low-level WebGL Rendering. If you
haven't heard of this library I suggest you check it out, it is a super performant 2D rendering engine. It is what
allows gf to fallback to canvas and support a larger audience.
