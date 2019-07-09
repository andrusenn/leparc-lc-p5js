# LeParc p5js livecoder

> ATENTION -> Now working in a branch for change three blocks to one and evaluating code blocks (setup,draw) by the context [see branch](https://github.com/andrusenn/leparc-lc-p5js/tree/bloque1)

> (English) - [Español](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.es.md)

Cross platform environment to run [p5js](http://p5js.org/) code in real time.
This project use [Electronjs](https://electronjs.org/)

This project was born as a tool for personal use, but it became a performative tool, and took some of the live coding philosophy.

The objective is that it be an extensible environment (hackable) where resources or snippets can be programmed to use and share. Also, load the js libraries compatible with p5js.

The core of *LeParc* is Javascript and libraries p5js, Codemirror (editor), jsbeautify (formatter). And with Electronjs (node.js, chromium, v8) to create native applications.

You can report if you find an error or bug. I also encourage you to fork the project.

> [Here you can find more help](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/en)

![Image](http://andressenn.com/leparc-lc/lp01.jpg)

----

## Use

### Install

#### Releases

[download](https://github.com/andrusenn/leparc-lc-p5js/releases) linux/win/mac

On first run, a folder call "leparc_resources" will be created in "home" user account:

~~~

leparc_resources/
      ├── config/
      │      └── config.txt
      ├── extends/
      │     └──lp-extends.js
      ├── libs/
      ├── media/
      ├── save/
      │      ├── auxcode.txt
      │      ├── draw.txt
      │      └── setup.txt
      └── snippets/
            └── espiro/
                  └── espiro.js

~~~

- linux users: AppImage > change permission to make it "executable"

#### Download source

> [Nodejs](https://nodejs.org/en/) and Npm must be installed on your system

1. clon repository
2. `cd src` (root dir)
3. `npm install && npm start`

#### Build

4. `npm run dist-linux` |  `npm run dist-win` | `npm run dist-mac`

### Commands

Keyboard shortcut | Action
--- | ---
`Ctrl+Enter` | Evaluate code block
`Alt+Enter` | Evaluate line of code (only in setup () and aux ())
`Ctrl+H` | Show / hide code
`F1 F2 F3` | Show/hide panels (aux) (setup) (draw/loop)
`F11` | Fullscreen
`F10` | Show / hide development tools for debug (dev tools)
`F5` | Screen reload (must be re-evaluated)
`Ctrl+mousewheel` | Increase / decrease code size
`Alt+mousewheel` | Modify the transparency of the background of the code
`Ctrl+Alt+mousewheel` | Modify selected value addition / subtraction by 1
`Ctrl+Alt+Shift+mousewheel` | Modify value selected addition / subtraction by 0.1
`Ctrl+ArrowUP` | Change the cursor / panel focus up
`Ctrl+ArrowDOWN` | Change the cursor / panel focus down
`Ctrl+F` | Format  (beautify) the block code
`Ctrl+L` | Toggle `loop()`/`noLoop()`
`Ctrl+Shift+C` | Comment / Uncomment code

### Code blocks

> `function setup(){}` and `function draw(){}` are just titles. You can not modify it. There are some tasks run underneath of each one. Check source code (lp5-renderer.js)
> Each block are evaluated separately. There is an extra block `aux:` to run code outside from setup() and draw()
> You can use functions/methods of p5js in any block

- `setup:` -> `function setup(){ // }`
- `loop:` -> `function draw(){ // }`

#### setup(){} vs aux(){}

Evaluating `setup` some objects and functions of p5 are reseted, while in `aux` not.

### Global vars and functions

For global acces from other blocks, an object is provided: `lp`, or shorthand manner with `$` prefix.

> In aux

~~~js

x = 1 // error -> is in strict mode

lp.x = 'code!'
// or
$x = 'code!'

lp.myFunction = function(){
      console.log('Hola LeParc!')
}
// or
$myFunction = function(){
      console.log('Hola LeParc!')
}

~~~

> In draw

~~~js

lp.myFunction() // out -> Hola LeParc!
console.log(lp.x) // out -> code!
// or
$myFunction() // out -> Hola LeParc!
console.log($x) // out -> code!

~~~

### Events

You can declare events in `aux` block

~~~js

mouseClicked = function(){
  console.log('evt click')
}

mouseMoved = function(){
  console.log('evt mousemove')
}

// Etc
~~~

### Extended functions p5j

| Method | Description |
| --- | --- |
| `mirrorX()` | Mirror - Reflects the image from the middle on the X axis |
| `mirrorY()` | Mirror - Reflects the image from the middle on the Y axis |
| `imirrorX()` | Inverted Mirror - Reflects the image from the middle on the inverted X axis |
| `imirrorY()` | Inverted Mirror - Reflects the image from the middle on the inverted Y axis |
| `kaleido()` | Kaleidoscope effect 4 faces (repeat the upper left face) |
| `zoom(escala)` | Scales output image in each loop: `zoom(0.01)` or negative `zoom(-0.01)` |
| `displace(velx,vely)` | Displace output image `velx`  y  `vely` (+ o -) |
| `displace(x,y,w,h,velx,vely)` | Cut out a portion of the image and displace it |
| `beginRot(vel_in_radians[,scale])` and `endRot()` | rotate what is contained between those two functions |
| `freq(mult)` | Shorthand of sentence `frameCount * mult` |
| `osc([freq])` | Shorthand of sentence  `sin( frameCount * freq )` |
| `cosc([freq])` | Shorthand of sentence  `{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}` |
| `pulse(n_frames)` | Flag (based on frameCount). Return true each n frame `if(frameCount % n_frames == 0 ) return true` |
| `gate(n_frames, duration)` | Flag (based on frameCount). Return true each n_frames with an x duration `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true` |
| `tpulse(millis [,millis_duration, millis_offset])` | Flag (based on millis). Return `true` each millis with a `millis_ duration` and offset by `millis_offset`  |
| `trange(number [,millis_duration])` | Flag (based on millis). Return  `0` to `number` in a `millis_duration` |

#### Media

##### Webcam

- In setup: `useCam([width,height])`
- In draw: `getCam(x,y)`

##### Audio

- In setup: `useAudio(source)` -> source 0 is default index / 1,2,n.. depends on hardware. Smoothing is frequency response (0 fast to 1 slow)
- In draw: `audioEnergy(fracuencia1[,frecuencia2])` -> get energy (volume) of single frequency or a range of frequencies. Return 0 to 255.

##### External media files

Assets must be placed in *media* dir.
The method `mediaPath()` return absolute path to *media*.

~~~js

// ~home/leparc_resources/media/
loadImage( mediaPath() + '/myImage.jpg',(i)=>{
  lp.im = i
})

~~~

### Client/Server mode

In order to config IP and port for CLIENT/SERVER mode, set **server-ip** and **port** in *leparc_resources/config/config.txt*

### Config window

- `Ctrl+TAB` open/close
  - **AUTO RENDER** -> Only in `draw(){}`
  - **RENDER** -> 2D / 3D
  - **BLOCK NAMES** -> Visual help (block names)
  - **MODE (net)**
    - LOCAL -> Default
    - SERVER -> Server mode
    - CLIENT -> Client mode
  - **SYNC (net)** -> On/Off syncro with server (change `frameRate` of the client)
  - **NAME (net)** -> Client node name (Default: id socket)
  - **LANG** -> ES/EN Language of interface
  
----

### Examples and howtos

> [View docs](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/en/ejemplos.md)
