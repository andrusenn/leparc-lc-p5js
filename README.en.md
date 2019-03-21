# Duchamp p5 livecoding

Cross platform environment to run p5js code in real time.

![Image](http://andressenn.com/duchamp-lc/captura2.jpg)
![Image](http://andressenn.com/duchamp-lc/captura.jpg)

----

## Use

### Install

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

- `Ctrl+Enter` Eval code
- `Ctrl+H` Show/Hide code
- Show/Hide panels `F1` (setup)`F2` (draw)`F3` (global)
- `F11` Fullscreen
- `F10` Show/Hide dev tools (debug)
- `F5` Reload window
- `Ctrl+mousewheel` Zoom in/ zoom out code
- `Alt+mousewheel` Change transparency of code background


### Code blocks

>Each block are evaluated separately. There is an extra block `aux:` to run code outside from setup() and draw()

- `setup:` -> `setup(){ // }`
- `draw:` -> `draw(){ // }`

### Global vars and functions

For global acces from other blocks, declere vars without `var`,`let` o `const`
Same for functions:
~~~
myfunc = function(){
      console.log('Hello Duchamp!')
}
~~~

### Extended functions p5j

- `mirrorX()` Mirror - Invert image from X axis
- `mirrorY()` Mirror - Invert image from Y axis
- `kaleido()` = `mirrorX()` + `mirrorY()` kaleidoscope fx 4 faces
- `zoom(scale)` Add zoom in or zoom out (scale each frame by..): `zoom(0.01)` or negative `zoom(-0.01)`
- `displace(velx,vely)` Displace all screen to `velx` and `vely` (+ or -)
- `displace(x,y,w,h,velx,vely)` Cut an image portion and displace it
- `beginRot(vel_in_radians,[scale])` y `endRot()` Rotate all between functions

#### Media

##### Webcam

- In setup: `useCam([width,height])`
- In draw: `getCam(x,y)`