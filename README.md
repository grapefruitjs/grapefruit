# GrapeFruit Game Engine

The game engine that powers [lttp-webgl](https://github.com/englercj/lttp-webgl) and [shiv](https://github.com/englercj/shiv).

The goal of this project is to provide a simple, yet powerful, API that enables game makers to quickly create amazing games. Anything
from simple top-down shooters to complex RPGs are possible with grapefruit.

Some features that GrapeFruit gives you:

 - WebGL rendering with Canvas Fallback
 - Entity and Tilemap Collisions
 - GUI/HUD system
 - Texture Fonts
 - Support for keyboard, mouse, and gamepad input
 - Channeled audio playback
 - Tiled Map Editor integration
 - Plugin system
 - much more!

## Current State

This project is under heavy development, and the API is subject to change at any time. Check the GitHub issue list to see how to help!

## Coming Features

Grapefruit is still a baby, and it is only me working on it in my spare time, so I know it is missing a lot of features.
Below is a list of the features I want to add in. If there is something else I missed, please open
an [Issue](https://github.com/englercj/grapefruit/issues) and we can talk about it.

Soon to come:

- Generic Text (non-texture based font)
- Sprite Sheet Animations (without forcing TexturePacker format)

Coming in the future:

- Multiple Cameras
- Path Finding
- Touch Gestures

## Plugins

As of right now there are no grapefruit plugins; however, here is a list of some planned plugins that will get some 
work as soon as gf is stable:

- Particle System
- Typewriter (for dialog-like text printing)
- Path Finding

## Rendering Engine

Under the hood gf uses [Pixi.js](https://github.com/GoodBoyDigital/pixi.js) for low-level WebGL Rendering. If you
haven't heard of this library I suggest you check it out, it is a super performant 2D rendering engine. It is what
allows gf to fallback to canvas and support a larger audience.

## Physics Engine

Grapefruit leverages [Chipmunk-js](https://github.com/josephg/Chipmunk-js) for 2D physics. Because of this powerful
library grapefruit is able to support velocity, ellasticity, gravity, friction, collisions, and much more.

## Tile Engine

The tile map engine is custom written in grapefruit to support all kinds of maps. The main focus however has been on
supporting the [Tiled Map Editor](http://mapeditor.org), and as many features of it as possible.

## License

The MIT License

Copyright (c) 2013-2014 Chad Engler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.