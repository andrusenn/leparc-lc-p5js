# Index

- [Index](#index)
  - [Basics](#basics)
    - [Basic functions](#basic-functions)

## Basics

### Basic functions

Using:

- `fade(10)` // Fade in to black by alpha 10 (0 to 255)
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
