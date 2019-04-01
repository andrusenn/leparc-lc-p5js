# LeParc p5 livecoder

> (English) - [Español](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.en.md)

Cross platform environment to run [p5js](http://p5js.org/) code in real time.
This project uses [Electronjs](https://electronjs.org/)

![Image](http://andressenn.com/leparc-lc/c1.jpg)
![Image](http://andressenn.com/leparc-lc/c2.jpg)
![Image](http://andressenn.com/leparc-lc/c3.jpg)
![Image](http://andressenn.com/leparc-lc/c4.jpg)

----

## Use

### Install

#### Releases

[download](https://github.com/andrusenn/leparc-lc-p5js/releases) linux/win/mac

- On first run, a folder call "leparc_resources" will be created in "home" or user account
- linux users: AppImage > change permission to make it "executable"

#### Download source

1. clon repository
2. `cd src` (root dir)
3. `npm install && npm start`

#### Build

1. clon repository
2. `cd src` (root dir)
3. `npm install`
4. `npm run dist-linux` |  `npm run dist-win` | `npm run dist-mac`

### Comands

- `Ctrl+Enter` Eval code block
- `Alt+Enter` Eval code line (only on setup() and aux())
- `Ctrl+H` Show/Hide code
- Show/Hide panels `F1` (setup)`F2` (draw)`F3` (aux)
- `F11` Fullscreen
- `F10` Show/Hide dev tools (debug)
- `F5` Reload window
- `Ctrl+mousewheel` Zoom in/ zoom out code
- `Alt+mousewheel` Change transparency of code background
- `Ctrl+Alt+mousewheel` Change selected number value by 1 (-1/+1)
- `Ctrl+Alt+Shift+mousewheel` Change selected number value by 0.1 (-0.1/+0.1)
- `Ctrl+ArrowUP` Change cursor/focus to the next up pannel
- `Ctrl+ArrowDOWN` Change cursor/focus to the next down pannel
- `Ctrl+F` Beautify code block

### Code blocks

> Each block are evaluated separately. There is an extra block `aux:` to run code outside from setup() and draw()
> You can use functions/methods of p5js in any block

- `setup:` -> `setup(){ // }`
- `draw:` -> `draw(){ // }`

#### setup(){} vs aux(){}

Evaluating `setup` some objects and functions of p5 are reseted, while in `aux` not.

### Global vars and functions

For global acces from other blocks, you can declare vars without `var`,`let` o `const`. But this is risky, because you can re-declare a property of `window` global object.
In order to avoid this, an object is provided: `lp`

> En aux

~~~js

lp.x = 'code'

lp.miFuncion = function(){
      console.log('Hola LeParc!')
}

~~~

> En draw

~~~js

lp.miFuncion() // out -> Hola LeParc!
console.log(lp.x) // out -> code

~~~

### Extended functions p5j

- `mirrorX()` Mirror - Reflect image from X axis
- `mirrorY()` Mirror - Reflect image from Y axis
- `imirrorX()` Invert Mirror - Reflect image from X axis inverted
- `imirrorY()` Invert Mirror - Reflect image from Y axis inverted
- `kaleido()` kaleidoscope fx 4 faces (left up cut is repeated)
- `zoom(scale)` Add zoom in or zoom out (scale each frame by..): `zoom(0.01)` or negative `zoom(-0.01)`
- `displace(velx,vely)` Displace all screen to `velx` and `vely` (+ or -)
- `displace(x,y,w,h,velx,vely)` Cut an image portion and displace it
- `beginRot(vel_in_radians,[scale])` and `endRot()` Rotate all between functions
- `freq(mult)` Shorthand of `frameCount * mult`
- `osc([freq])` Shorthand of `sin( frameCount * freq )`
- `cosc([freq])` Shorthand of `{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}`

#### Media

##### Webcam

- In setup: `useCam([width,height])`
- In draw: `getCam(x,y)`

##### Audio

- In setup: `useAudio(source)` -> source 0 is default index / 1,2,n.. depends on hardware. Smoothing is frequency response (0 fast to 1 slow)
- En draw: `audioEnergy(fracuencia1[,frecuencia2])` -> get energy (volume) of single frequency or a range of frequencies (0-255)
  
### Client/Server mode

In order to config IP and port for CLIENT/SERVER mode, set **server-ip** and **port** in *leparc_resources/config/config.txt*

### Config window

- `Ctrl+TAB` open/close
  - **AUTO RENDER** -> Only in `draw(){}`
  - **MODE (net)**
    - LOCAL -> Default
    - SERVER -> Server mode
    - CLIENT -> Client mode
  - **SYNC (net)** -> On/Off syncro with server (change `frameRate` of the client)
  - **NAME (net)** -> Client node name (Default: id socket)
  
----

### Examples

> [Examples](https://github.com/andrusenn/leparc-lc-p5js/wiki)