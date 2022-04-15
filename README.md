# LeParc p5js livecoder

This repository is not under maintenance. Feel free to clone/fork it and improve it :)

This reference is for versions 0.2 or higher.

> (English) - [Español](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.es.md)

Cross platform environment to run [p5js](http://p5js.org/) code in real time.
This project use [Electronjs](https://electronjs.org/)

The project was born as a tool for personal use, but it became a performative tool, and took some of the live coding philosophy.

The objective is that it be an extensible environment (hackable) where resources or snippets can be programmed to use and share. Also, load the js libraries compatible with p5js.

The core of _LeParc_ is Javascript and libraries p5js, Codemirror (editor), jsbeautify (formatter). And with Electronjs (node.js, chromium, v8) to create native applications.

You can report if you find an error or bug. I also encourage you to fork the project.

![Image](http://andressenn.com/leparc-lc/lp02.jpg)

[Get image code (gist)](https://gist.github.com/andrusenn/c5557160e3b0bb6c0d3f87024e66b5f2)

---

## Use

### Install

#### Releases

[download](https://github.com/andrusenn/leparc-lc-p5js/releases) linux/win/mac

On first run, a folder call "leparc_resources" will be created in "home" user account:

```txt

leparc_resources/
      ├── config/
      │      └── config.txt
      ├── extends/
      │     └──lp-extends.js
      ├── libs/
      ├── media/
      ├── save/
      │      ├── auxcode.txt
      └── snippets/
            └── espiro/
                  └── espiro.js

```

-   linux users: AppImage > change permission to make it "executable"

#### Download source

> [Nodejs](https://nodejs.org/en/) and Npm must be installed on your system

1. clone repository
2. `cd src` (root dir)
3. `npm install && npm run rebuild` (rebuild modules for run correctly in Electron)
4. `npm start`

For re-install and re-compile node_modules when Electron gives problems, use `npm run restart`
This command delete `node_modules` and `package-lock.json`
See [doc](https://electronjs.org/docs/tutorial/using-native-node-modules)

#### Build

1. `npm run dist-linux` | `npm run dist-win` | `npm run dist-mac`

#### Electron

You can experiment with latest Electron's releases:

-   Open console in `src` and run `npm i -D electron@latest electron-builder@latest`

---

## Getting started

[Interface and basic functions](https://github.com/andrusenn/leparc-lc-p5js/tree/master/getting-started)

## Quick reference

IMPORTANT! There are two modes in configurations (`Ctrl+Tab`) for play:

-   `STATIC` All code written is evaluated. This is for teach/learn or experimentation p5js. NO ERRROR HANDLERS (If there are any error the main loop will stop). The CANVAS must be created in `setup` `createCanvas(width,height)`
-   `LIVECODING` Each code is evaluate depend of it context. This allow play code on live session and there are some differences with global vars declarations.

## Commands

| Keyboard shortcut           | Action                                                |
| --------------------------- | ----------------------------------------------------- |
| `Ctrl+Enter`                | Evaluate code block depend of `PLAY MODE` option      |
| `Ctrl+H`                    | Show / hide code                                      |
| `Ctrl+N`                    | Show / hide line numbers                              |
| `F11`                       | Fullscreen                                            |
| `F10`                       | Show / hide development tools for debug (dev tools)   |
| `F5`                        | Screen reload (must be re-evaluated)                  |
| `Ctrl+mousewheel`           | Increase / decrease code size                         |
| `Alt+mousewheel`            | Modify the transparency of the background of the code |
| `Ctrl+Alt+mousewheel`       | Modify selected value addition / subtraction by 1     |
| `Ctrl+Alt+Shift+mousewheel` | Modify value selected addition / subtraction by 0.1   |
| `Ctrl+F`                    | Format (beautify) the block code                      |
| `Ctrl+L`                    | Toggle `loop()`/`noLoop()`                            |
| `Ctrl+Shift+C`              | Comment / Uncomment code                              |
| `Ctrl+Shift+A`              | Enable Autorender (Auto-Evaluate code block)          |

## Code blocks

`function setup(){}` and `function draw(){}` are the main blocks. If `PLAY MODE` option is on `LIVECODING`, a selective evaluation occurs by the context of each one. If `STATIC` option is selected, all code written will be evaluated.

You can use functions/methods of p5js.

## Global vars and functions (`Livecoding mode`)

In `LIVECODING` mode, an object is provided for global acces: `lp`, or shorthand manner with `$` prefix.

For better visualization, functions can be declared as `function my_function(){}` too. LeParc set this function to global and can be used anywhere.

```js
x = 1; // error -> is in strict mode

lp.x = "code!";
// or
$x = "code!";

lp.myFunction = function () {
    console.log("Hola LeParc!");
};
// or
$myFunction = function () {
    console.log("Hola LeParc!");
};
// or global -> window.myFunction
function myFunction() {
    console.log("Hola LeParc!");
}

lp.myFunction(); // out -> Hola LeParc!
console.log(lp.x); // out -> code!
// or
$myFunction(); // out -> Hola LeParc!
console.log($x); // out -> code!
```

## Events

```js
function mouseClicked() {
    console.log("evt click");
}

// Etc
```

## Extended functions p5j

| Method                                             | Description                                                                                                                                     |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `counter(n)`                                       | Returns an increased number based on `millis ()`. Shorthand of `millis () / 1000 [* n]`                                                         |
| `fade(alpha)`                                      | fade out to black `alpha` 0 to 255 every loop                                                                                                   |
| `fade(r,g,b,a)`                                    | fade out to r,g,b,a every loop                                                                                                                  |
| `fade(r,g,b,a,color_mode)`                         | fade out to r,g,b,a and set colorMode (RGB, HSB) every loop                                                                                     |
| `mirrorX([num_faces])`                             | Mirror - Reflects the image from the middle on the X axis by `num_faces`                                                                        |
| `mirrorY([num_faces])`                             | Mirror - Reflects the image from the middle on the Y axis by `num_faces`                                                                        |
| `imirrorX()`                                       | Inverted Mirror - Reflects the image from the middle on the inverted X axis                                                                     |
| `imirrorY()`                                       | Inverted Mirror - Reflects the image from the middle on the inverted Y axis                                                                     |
| `kaleido()`                                        | Kaleidoscope effect 4 faces (repeat the upper left face)                                                                                        |
| `zoom(escala)`                                     | Scales output image in each loop: `zoom(number)` or negative `zoom(-number)`                                                                    |
| `displace(velx,vely)`                              | Displace output image `velx` y `vely` (+ o -)                                                                                                   |
| `displace(x,y,w,h,velx,vely)`                      | Cut out a portion of the image and displace it                                                                                                  |
| `beginRot(vel_in_radians[,scale])` and `endRot()`  | rotate what is contained between those two functions                                                                                            |
| `freq([mult])`                                     | Shorthand of sentence `millis()/1000 [* mult]`                                                                                                  |
| `sinOsc([mult])`                                   | Shorthand of sentence `sin( (millis()/1000) * TWO_PI [* mult] )`                                                                                |
| `cosOsc([mult])`                                   | Shorthand of sentence `cos( (millis()/1000) * TWO_PI [* mult] )`                                                                                |
| `pulse(n_frames)`                                  | Flag (based on frameCount). Return true each n frame `if(frameCount % n_frames == 0 ) return true`                                              |
| `gate(n_frames, duration)`                         | Flag (based on frameCount). Return true each n_frames with an x duration `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true` |
| `tpulse(millis [,millis_duration, millis_offset])` | Flag (based on millis). Return `true` each millis with a `millis_ duration` and offset by `millis_offset`                                       |
| `trange(number [,millis_duration])`                | Flag (based on millis). Return `0` to `number` in a `millis_duration`                                                                           |
| `useOSC(['ip',port])`                              | Start OSC (UDP) for incoming messages. Default ip `127.0.0.1` and port `12345`                                                                  |
| `useOSC('ip')`                                     | Use different ip (pass string argument)                                                                                                         |
| `useOSC(port)`                                     | Use different port (pass int argument)                                                                                                          |
| `osc('/address')`                                  | return osc value                                                                                                                                |
| `osc('/address',index)`                            | (multiple args) return osc value on index array position                                                                                        |
| `useMIDI([channel],[deviceIndex|deviceName])`      | (multiple args) Midi init                                                                                                                       |
| `midiNoteOn(channel[,type="number"][,callback])`   | Get NoteOn params [number,name,velocity,octave]                                                                                                 |
| `midiNoteOff(channel[,type="number"][,callback])`  | Get NoteOff params [number,name,octave]                                                                                                         |
| `midiController(channel,number[,callback])`        | Get controller params                                                                                                                           |
| `midiPitch(channel[,callback])`                    | Get pitchbending params                                                                                                                         |
| `midiNrpn(channel[,type="entry"][,callback])`      | Get nrpn messages                                                                                                                               |

## Extended properties p5j

| Property  | Description                         |
| --------- | ----------------------------------- |
| `CENTERW` | Center x of the canvas `width / 2`  |
| `CENTERH` | Center y of the canvas `height / 2` |

## OSC Messages

By default, port 12345 is opened for listen in localhost

```js
useOSC();

let x = osc("/my_address");
// or, if multiple args, pass index position
let x = osc("/my_address", 0);
```

### Example

```js
//useOSC()
useOSC("192.168.0.5", 12345);

function setup() {
    rectMode(CENTER);
}

function draw() {
    fade(10);
    displace(0, osc("/displace"));
    noFill();
    stroke(255);
    beginRot(counter(2));
    rect(width / 2, height / 2, 20, 600);
    endRot();
    mirrorY(8);
}
```

Change default ip and port:

On `leparc_resources/config/config.txt`

```txt
osc-ip=127.0.0.1
osc-port=12345
```

## MIDI Messages

```js
function setup() {
	// Create events
    useMIDI()
    // MIDI IN -> Receive data from midi device 
	midiNoteOn(1, (rawData) => {
		console.log('noteon', rawData)

	})
	midiNoteOff(1, (rawData) => {
		console.log('noteoff')
	})
	midiControl(1, (rawData) => {
		console.log('control')
	})
	midiPitch(1, (rawData) => {
		console.log('pitch')
	})
	midiMessage(1, (rawData) => {
		console.log('message')
	})
}
```

## Media (`Livecoding mode`)

### Webcam

Shorthand of `creteCapture(VIDEO)`

-   In setup: `useCam([width,height])`
-   In draw: `getCam(x,y)`

For get image output `imgCam()` -> `image(imgCam(),0,0)` or `texture(imgCam())`

### Audio In

-   In setup: `useAudio(source)` -> source 0 is default index / 1,2,n.. depends on hardware. Smoothing is frequency response (0 fast to 1 slow)
-   In draw: `audioEnergy(fracuencia1[,frecuencia2])` -> get energy (volume) of single frequency or a range of frequencies. Return 0 to 255.

### External media files

Assets must be placed in _media_ dir.
The method `mediaPath()` return absolute path to _media_ folder.

```js
// All media files
// ~home/leparc_resources/media/

// Image use p5js method
loadImage(mediaPath("myImage.jpg"), (i) => {
    $im = i;
});

// Use loadVideo instead of createVideo
// It is not necessary to use mediaPath, write the name file directly
loadVideo("myImage.mp4", (v) => {
    $v = v;
    // $v.play()
});
$v.play();
```

## Client/Server mode (`Livecoding mode`)

In order to config IP and port for CLIENT/SERVER mode, set **server-ip** and **port** in _leparc_resources/config/config.txt_

## Config window

`Ctrl+TAB` open/close

-   **PLAY MODE** -> Livecoding or Static
-   **AUTO RENDER** -> In `draw(){}` only
-   **RENDER** -> 2D / 3D
-   **LINE NUMBERS** Show/hide line numbers
-   **MODE (net)**
    -   LOCAL -> Default
    -   SERVER -> Server mode
    -   CLIENT -> Client mode
-   **SYNC (net)** -> On/Off syncro with server (change `frameRate` of the client)
-   **NAME (net)** -> Client node name (Default: id socket)
-   **LANG** -> ES/EN Language of interface
