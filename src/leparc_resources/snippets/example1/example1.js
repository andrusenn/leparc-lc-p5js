/*
Ejemplo de snippet / Snippet example
LeParc-LC

code:

snip('example1')

function setup() {
	rectMode(CENTER)
}

function draw() {
	displace(-1, 0)
	MyPattern(50, 80, (x, y, cx, cy) => {
		stroke(255)
		fill(0, 20)
		beginRot(counter(), x, y)
		rect(x, y, cx, cy)
		endRot()
	})
}
*/
function MyPattern() {
      let arg = arguments
      let cellX = 30
      let cellY = 30
      let fn = null
      if (arg.length == 1 && typeof arg[0] == 'function') {
            fn = arg[0]
      }
      if (arg.length == 2) {
            cellX = arg[0]
            cellY = arg[1]
      }
      if (arg.length == 3 && typeof arg[2] == 'function') {
            cellX = arg[0]
            cellY = arg[1]
            fn = arg[2]
      }
      push()
      rectMode(CENTER)
      stroke(255)
      fill(0)
      for (let x = 0; x < width; x += cellX) {
            for (let y = 0; y < height; y += cellY) {
                  if (fn) {
                        fn(x, y, cellX, cellY)
                  } else {
                        beginRot(counter(), x, y)
                        rect(x, y, cellX, cellY)
                        endRot()
                  }
            }
      }
      pop()
}
// hacer global / make global
if (!global.hasOwnProperty('MyPattern')) {
      global.MyPattern = MyPattern
}