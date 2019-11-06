/*
Ejemplo de snippet / Snippet example
LeParc-LC

MyPattern:

Create a grid


code:

// 1
snip('patterns1') // Evaluar para cargar snippet / Eval for load snippet

function setup() {
	rectMode(CENTER)
}

function draw() {
      displace(-1, 0)

      // MyPattern(cell_width, cell_height, (posx, posy, get_cell_w, get_cell_h)
	MyPattern(50, 80, (x, y, cx, cy) => {

            // hacer algo / do somethig
		stroke(255)
		fill(0, 20)
		beginRot(counter(), x, y)
            // rect(x, y, cx, cy)            
		rect(x, y, 40, 45)
            endRot()
            // ----------------------

	})
}

// 2

snip('patterns1')

function draw() {
	//displace(0, -10)
	fade(10)
	zoom(0.01)
	let i = 0
	MyPattern(100, 100, (x, y, cx, cy) => {
		stroke(255)
		strokeWeight(0.5)
		fill(255)
		beginRot(counter(0.1), x + sinOsc(0.01) * 200, y)
		rect(x + sinOsc(i * 0.01) * 20, y, 20, 200)
		endRot()
		i++
	})
	kaleido()
}
*/
let patterns = {
      grid() {
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
                        if (fn && typeof fn == 'function') {
                              fn(x, y, cellX, cellY)
                        } else {
                              beginRot(counter(), x, y)
                              rect(x, y, cellX, cellY)
                              endRot()
                        }
                  }
            }
            pop()
      },
      baloons() {
            let arg = arguments
            let cellX = 30
            let cellY = 30
            let fn = null
            if (arg.length == 1 && typeof arg[0] == 'function') {
                  fn = arg[0]
            }
            push()
            rectMode(CENTER)
            stroke(255)
            fill(0)
            for (let x = 0; x < width; x += cellX) {
                  for (let y = 0; y < height; y += cellY) {

                        push()
                        if (fn && typeof fn == 'function') {
                              fn()
                        }
                        circle(x, y,60)
                        pop()
                  }
            }
            pop()
      }
}
// function MyPattern() {
//       let arg = arguments
//       let cellX = 30
//       let cellY = 30
//       let fn = null
//       if (arg.length == 1 && typeof arg[0] == 'function') {
//             fn = arg[0]
//       }
//       if (arg.length == 2) {
//             cellX = arg[0]
//             cellY = arg[1]
//       }
//       if (arg.length == 3 && typeof arg[2] == 'function') {
//             cellX = arg[0]
//             cellY = arg[1]
//             fn = arg[2]
//       }
//       push()
//       rectMode(CENTER)
//       stroke(255)
//       fill(0)
//       for (let x = 0; x < width; x += cellX) {
//             for (let y = 0; y < height; y += cellY) {
//                   if (fn) {
//                         fn(x, y, cellX, cellY)
//                   } else {
//                         beginRot(counter(), x, y)
//                         rect(x, y, cellX, cellY)
//                         endRot()
//                   }
//             }
//       }
//       pop()
// }
// hacer global / make global
if (!global.hasOwnProperty('patterns')) {
      global.patterns = patterns
}