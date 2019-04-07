# LeParc p5 livecoder

> (English) - [Español](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.en.md)

Cross platform environment to run [p5js](http://p5js.org/) code in real time.
This project use [Electronjs](https://electronjs.org/)

This project was born as a tool for personal use, but it became a performative tool, and took some of the live coding philosophy.

![Image](http://andressenn.com/leparc-lc/lp01.jpg)

----

## Use

### Install

#### Releases

[download](https://github.com/andrusenn/leparc-lc-p5js/releases) linux/win/mac

- On first run, a folder call "leparc_resources" will be created in "home" user account:

~~~

|_leparc_resources/
  |__config/
    |__config.txt
  |__extends/
    |__lp-extends.js
  |__media/
  |__save/
    |__auxcode.txt
    |__draw.txt
    |__setup.txt
  |__snippets/
    |__mi_snippet/
      |__mi_snipet.js

~~~

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

<table>
  <tr>
    <th>Key Shortcut</th><th>Action</th>
  </tr>
  <tr>
    <td><code>Ctrl+Enter</code></td><td>Eval code block</td>
  </tr>
  <tr>
    <td><code>Alt+Enter</code></td><td>Eval code line (only on setup() and aux())</td>
  </tr>
  <tr>
    <td><code>Ctrl+H</code></td><td>Show/Hide code</td>
  </tr>
  <tr>
    <td><code>F1 F2 F3</code></td><td>Show/Hide panels (setup) (draw) (aux)</td>
  </tr>
  <tr>
    <td><code>F11</code></td><td>Fullscreen</td>
  </tr>
  <tr>
    <td><code>F10</code></td><td>Show/Hide dev tools (debug)</td>
  </tr>
  <tr>
    <td><code>F5</code></td><td>Reload window (must be evaluate again)</td>
  </tr>
  <tr>
    <td><code>Ctrl+mousewheel</code></td><td>Zoom in / zoom out code</td>
  </tr>
  <tr>
    <td><code>Alt+mousewheel</code></td><td>Change background transparency of code</td>
  </tr>
  <tr>
    <td><code>Ctrl+Alt+mousewheel</code></td><td>Change selected number value by 1 (-1/+1)</td>
  </tr>
  <tr>
    <td><code>Ctrl+Alt+Shift+mousewheel</code></td><td>Change selected number value by 0.1 (-0.1/+0.1)</td>
  </tr>
  <tr>
    <td><code>Ctrl+ArrowUP</code></td><td>Change cursor/focus to the next up pannel</td>
  </tr>
  <tr>
    <td><code>Ctrl+ArrowDOWN</code></td><td>Change cursor/focus to the next down pannel</td>
  </tr>
  <tr>
    <td><code>Ctrl+F</code></td><td>Beautify code block</td>
  </tr>
  <tr>
    <td><code>Ctrl+L</code></td><td>toggle loop()/noLoop()</td>
  </tr>
  <tr>
    <td><code>Ctrl+Shift+C</code></td><td>Comment/Uncomment code</td>
  </tr>
</table>

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

<table>
  <tr>
    <th>method</th><th>Desc</th>
  </tr>
  <tr>
    <td>
    <code>mirrorX()</code>
    </td>
    <td>
    Mirror - Reflect image from X axis
    </td>
  </tr>
  <tr>
    <td>
    <code>mirrorY()</code>
    </td>
    <td>
    Mirror - Reflect image from Y axis
    </td>
  </tr>
  <tr>
    <td>
    <code>imirrorX()</code>
    </td>
    <td>
    Invert Mirror - Reflect image from X axis inverted
    </td>
  </tr>
  <tr>
    <td>
    <code>imirrorY()</code>
    </td>
    <td>
    Invert Mirror - Reflect image from Y axis inverted
    </td>
  </tr>
  <tr>
    <td>
    <code>kaleido()</code>
    </td>
    <td>
    kaleidoscope fx 4 faces (left up cut is repeated)
    </td>
  </tr>
  <tr>
    <td>
    <code>zoom(scale)</code>
    </td>
    <td>
    Add zoom in or zoom out (scale each frame by..): <code>zoom(0.01)</code> or negative <code>zoom(-0.01)</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>displace(velx,vely)</code>
    </td>
    <td>
   Displace all screen to <code>velx</code> y <code>vely</code> (+ or -)
    </td>
  </tr>
  <tr>
    <td>
    <code>displace(x,y,w,h,velx,vely)</code>
    </td>
    <td>
    Cut an image portion and displace it
    </td>
  </tr>
  <tr>
    <td>
    <code>beginRot(vel_in_radians[,scale])</code> and <code>endRot()</code>
    </td>
    <td>
   Rotate all between functions
    </td>
  </tr>
  <tr>
    <td>
    <code>freq(mult)</code>
    </td>
    <td>
  Shorthand of <code>frameCount * mult</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>osc([freq])</code>
    </td>
    <td>
   Shorthand of <code>sin( frameCount * freq )</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>cosc([freq])</code>
    </td>
    <td>
   Shorthand of <code>{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>pulse(n_frames)</code>
    </td>
    <td>
   Flag - return true each n frames <code>if(frameCount % frames == 0 ) return true</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>gate(n_frames, duration)</code>
    </td>
    <td>
   Flag - return true each n frames with duration x <code>if(frameCount % n_frames > n_frames - duration ) return true</code>
    </td>
  </tr>
</table>

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
  - **MODE (net)**
    - LOCAL -> Default
    - SERVER -> Server mode
    - CLIENT -> Client mode
  - **SYNC (net)** -> On/Off syncro with server (change `frameRate` of the client)
  - **NAME (net)** -> Client node name (Default: id socket)
  - **BLOCK NAMES** -> Visual help (block names)
  
----

### Examples

> [Examples](https://github.com/andrusenn/leparc-lc-p5js/wiki)