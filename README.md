# GrapeFruit Game Engine
[![Build Status](https://travis-ci.org/grapefruitjs/grapefruit.png?branch=master)](https://travis-ci.org/grapefruitjs/grapefruit)
[![Dependency Status](https://gemnasium.com/grapefruitjs/grapefruit.png)](https://gemnasium.com/grapefruitjs/grapefruit)
[![NPM version](https://badge.fury.io/js/grapefruit.png)](http://badge.fury.io/js/grapefruit)
[![Bower version](https://badge.fury.io/bo/grapefruit.png)](http://badge.fury.io/bo/grapefruit)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

The game engine that powers my remake of [lttp](https://github.com/englercj/lttp) and my original game [shiv](https://github.com/englercj/shiv).

The goal of this project is to provide a simple, yet powerful, API that enables game makers to quickly create amazing games. Anything
from simple top-down space shooters to complex RPGs are possible with grapefruit.

Some features that GrapeFruit gives you:

 - Rendering Engine (WebGL, with Canvas fallback)
 - Full featured [Tiled Map Editor](http://www.mapeditor.org/) support
 - Physics System via [Chipmunk-js](https://github.com/josephg/Chipmunk-js)
 - Audio Manager (WebAudio API with HTML5 Audio fallback)
 - Input Manager (keyboard, mouse, touch, and gamepad)
 - Camera Effects (Shake, Fade, Flash, Scanlines, and more)
 - GUI support (for HUDs and menus)
 - Bitmap and System Text
 - Plugin system
 - Asset Preloader
 - much more!

## Current State

This project is under heavy development, and the API is subject to change but is becoming increasing more stable. Check the GitHub issue list to see how to help!

## Coming Features

Grapefruit is still a baby, and it is only me working on it in my spare time, so I know it is missing a lot of features.
Below is a list of the features I want to add in. If there is something else I missed, please open an
[Issue](https://github.com/englercj/grapefruit/issues) and we can talk about it.

Prioritized list of coming features:

- Deterministic RNG
- Parallax Tilemap Layers
- Pathfinding
- Bitmap Alpha Masks
- Isometric maps
- Touch Gestures
- Multiple Cameras

## Plugins

Here is a list of some plugins for grapefruit that are planned, or in development. The list is prioritized.

- [Debugger](https://github.com/grapefruitjs/gf-debug)
- Saves and Storage
- UI Pack
- Achievements
- Spines and spinal animation
- Tilemap Generator & Exporter

## Rendering Engine

Under the hood gf uses [Pixi.js](https://github.com/GoodBoyDigital/pixi.js) for low-level WebGL and canvas rendering.
If you haven't heard of this library I suggest you check it out, it is a super performant 2D rendering engine.

## Physics Engine

Grapefruit leverages [Chipmunk-js](https://github.com/josephg/Chipmunk-js) for 2D physics. Because of this powerful
library grapefruit is able to support velocity, ellasticity, gravity, friction, collisions, and much more.

## Tile Engine

The tile map engine is custom written in grapefruit to support all kinds of maps. The main focus however has been on
supporting the [Tiled Map Editor](http://mapeditor.org), and its full feature set.

## License

The MIT License

Copyright (c) 2013-2014 Chad Engler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to prmit persons to whom the Software is
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
