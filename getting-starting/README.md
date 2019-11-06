# EXAMPLES

## Index

- [EXAMPLES](#examples)
  - [Index](#index)
    - [Basics](#basics)
      - [Differece between STATIC MODE and LIVECODE MODE](#differece-between-static-mode-and-livecode-mode)
      - [Interface](#interface)
      - [Basic functions](#basic-functions)

### Basics

#### Differece between STATIC MODE and LIVECODE MODE

(Press `Ctrl+TAB` to toggle config popup an select `STATIC`)

When you work on STATIC mode, you have to write all code like you where working on sketch.js, and when you press `Ctrl+ENTER` all the code is evaluated at once. In `setup` you must write `createCanvas` because it is no created automatically:

~~~js
// STATIC

function setup(){
      createCanvas(windowWidth,windowHeight);
      background(167);
}

function draw(){
      circle(width/2,height/2,400);
}

~~~

When `LIVECODE MODE` is selected, the `canvas` is created automatically filling entire window.
In this mode, you can omit `setup` and work only with `draw` for loop.

An important difference with `STATIC`, the evaluations are contextual. This mean that if you are with the cursor inside a function, only the function is evaluated. Try this:

~~~js
// LIVECODE

function draw(){
      background('red')
}

function draw(){
      background('green')
}

function draw(){
      background('blue')
}

~~~

Yes! you can have multiple loops! but run only one on eval.

Another substantial difference is error handling. In the `STATIC` if the code has errors, the loop will stop. While in `LIVECODE` the loop does not stop (or that is the idea!) It is not perfect, but there are many errors handlers working to maintain the flow.

#### Interface

![Image](http://andressenn.com/leparc-lc/interfaz/interfaz.jpg)

A quick review of the interface.

![Image](http://andressenn.com/leparc-lc/interfaz/interfaz01.png)

1. Two  vertical bars:
    - RED: Indicate an error in the code
    - WHITE: Indicate that the code has change

2. Highlight arrow indicate usaved code
3. System data
4. Show some log errors

![Image](http://andressenn.com/leparc-lc/interfaz/interfaz02.png)

1. Autorender is enabled (Auto eval)

![Image](http://andressenn.com/leparc-lc/interfaz/interfaz03.png)

1. 3d mode is enabled (WEBGL)

#### Basic functions

Using:

- `fade(10)` // Fade out to black by alpha 10 (0 to 255)
- `beginRot() endRot()` // Rotate content between
- `zoom(0.01)` zoom in by 0.01
- `counter(2)` // counter is (millis()/1000 [* arg])
- `mirrorY()` mirror contet in Y axis
- `sinOsc([mult])` return -1 to 1 at this vel `(millis() / 1000) * TWO_PI [* mult]`

~~~js
// Copy and paste

function setup() {
      rectMode(CENTER)
}

function draw() {
      fade(10)
      noFill()
      zoom(0.001)
      stroke(255)
      beginRot(counter(2))
      rect(width / 2, height / 2, 20 + sinOsc() * 100, 600 + sinOsc(0.05) * 200)
      endRot()
      mirrorY()
}
~~~

[Index](#Index)
