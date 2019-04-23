// Extender P5 / Estends P5
/*
if (!p5.prototype.hasOwnProperty('method')) {
      p5.prototype.method = function () {
            let arg = arguments
            if (arg.length == 1) {
                  return 'Hello my method!!'
            }
            return null;
      }
}
*/
/**
 * EXPERIMENTAL
 * videos o camara layers con efectos
 * videos or cam layers with 
 * 
 * uso / use
 * 
 * aux:
 * let v1 = createVideo(mediaPath('video.mp4'),()=>{
 *    $layer1 = new VideoLayer(v1)
 * })
 * 
 * loop:
 * 
 * $layer1.video().play()
 * 
 * $layer1.tint(255,10).video().play()
 * //
 * $layer1.blend(DIFFERENCE).video().play()
 * $layer2.video().play()
 * 
 */
class VideoLayer {
      constructor(_v) {
            this.v = _v
            this.x = width / 2
            this.y = height / 2
            this.mx = 0
            this.my = 0
            this.nx = 0
            this.ny = 0
            this.noffset = 0
            this.playing = false
      }
      play() {
            if (!this.playing && this.v.elt.paused) {
                  this.v.loop()
                  this.playing = true
            }
            return this
      }
      pause() {
            if (!this.v.elt.paused) {
                  this.v.pause()
                  this.playing = false
            }
            return this
      }
      video(display = true) {
            push()
            imageMode(CENTER)
            // https://github.com/processing/p5.js/issues/1087
            this.v.loadPixels()
            let cx = width / 2
            let cy = height / 2
            if(___webgl){
                  cx = 0
                  cy = 0
            }
            if (display) {
                  image(this.v, cx, cy)
            }
            pop()
            return this
      }
      elt() {
            return this.v.elt
      }
      time() {
            let arg = arguments
            if (arg.length == 0) {
                  return this.v.elt.currentTime
            }
            if (arg.length == 1) {
                  if (typeof arg[0] == 'function') {
                        let o = {
                              time: this.v.elt.currentTime,
                              duration: this.v.elt.duration
                        }
                        arg[0](o)
                  }
            }
            return this
      }
      fx(_fx, opts = {}) {
            let prop = {}
            if (_fx == 'dots') {
                  prop = Object.assign({
                        cell: 20,
                        color: null,
                        weight: 1,
                        getBright: false
                  }, opts)
                  // fx
                  beginShape(POINTS)
                  this.v.loadPixels()
                  translate(width / 2 - this.v.width / 2, height / 2 - this.v.height / 2)
                  for (let x = 0; x < this.v.width; x += prop.cell) {
                        for (let y = 0; y < this.v.height; y += prop.cell) {
                              const i = (y * this.v.width + x) * 4;
                              //const darkness = this.v.pixels[i];

                              if (prop.getBrightv) {

                              } else {

                              }
                              const c = (prop.color) ? color(prop.color, this.v.pixels[i]) : this.getColor(this.v, x, y)
                              stroke(c)
                              strokeWeight(prop.weight)
                              vertex(x, y)
                        }
                  }
                  endShape()
            }
            return this
      }
      getColor(img, x, y) {
            let i = (x + y * img.width) * 4
            return [img.pixels[i + 0], img.pixels[i + 1], img.pixels[i + 2], img.pixels[i + 3]]

      }
      displace() {
            let arg = arguments
            push()
            if (arg.length == 0) {
                  this.v.loadPixels()
                  translate(width / 2 - this.v.width / 2, height / 2 - this.v.height / 2)
                  imageMode(CORNER)
                  let g = 1
                  for (let y = 0; y < this.v.height; y += g) {
                        let n = map(noise((y + frameCount) * 0.01), 0, 1, -100, 100)
                        let i = this.v.get(0, y, this.v.width, y + g)
                        image(i, n, y)
                  }
            }
            if (arg.length == 2) {
                  let offl = arg[0]
                  let offr = arg[1]
                  this.v.loadPixels()
                  translate(width / 2 - this.v.width / 2, height / 2 - this.v.height / 2)
                  imageMode(CORNER)
                  let g = 1
                  for (let y = 0; y < this.v.height; y += g) {
                        let n = map(noise((y + frameCount) * 0.01), 0, 1, offl, offr)
                        let i = this.v.get(0, y, this.v.width, y + g)
                        image(i, n, y)
                  }
            }

            if (arg.length == 1) {
                  let img = arg[0]
                  img.loadPixels()
                  translate(width / 2 - img.width / 2, height / 2 - img.height / 2)
                  imageMode(CORNER)
                  let g = 1
                  for (let y = 0; y < img.height; y += g) {
                        let n = map(noise((y + frameCount) * 0.01, (12000 + frameCount) * 0.01, (800 + frameCount) * 0.01), 0, 1, -100, 100)
                        let i = img.get(0, y, img.width, y + g)
                        image(i, n, y)
                  }
            }
            if (arg.length == 3) {
                  let img = arg[0]
                  let offl = arg[1]
                  let offr = arg[2]
                  img.loadPixels()
                  translate(width / 2 - img.width / 2, height / 2 - img.height / 2)
                  imageMode(CORNER)
                  let g = 1
                  for (let y = 0; y < img.height; y += g) {
                        let n = map(noise((y + frameCount) * 0.01, (12000 + frameCount) * 0.01, (800 + frameCount) * 0.01), 0, 1, offl, offr)
                        let i = img.get(0, y, img.width, y + g)
                        image(i, n, y)
                  }
            }
            pop()
            return this
      }
      duration() {
            return this.v.elt.duration
      }
      move(_x, _y) {
            this.mx = _x
            this.my = _y
            return this
      }
      center() {
            this.mx = 0
            this.my = 0
            this.x = width / 2
            this.y = height / 2
            return this
      }
      blend(_bm) {
            blendMode(_bm)
            return this
      }
      tint() {
            let arg = arguments
            try {
                  if (arg.length == 1) {
                        tint(arg[0])
                  }
                  if (arg.length == 2) {
                        tint(arg[0], arg[1])
                  }
                  if (arg.length == 3) {
                        tint(arg[0], arg[1], arg[2])
                  }
                  if (arg.length == 4) {
                        tint(arg[0], arg[1], arg[2], arg[3])
                  }
                  // https://github.com/processing/p5.js/issues/1087
                  // tint // noTint issue -> loadPixels() fix it 
                  this.v.loadPixels()
            } catch (e) {
                  //console.log(e)
            }
            return this
      }
      noTint() {
            try {
                  noTint()
                  // https://github.com/processing/p5.js/issues/1087
                  // tint // noTint issue -> loadPixels() fix it 
                  this.v.loadPixels()
            } catch (e) {
                  //
            }
            return this
      }

}

if (!global.hasOwnProperty('VideoLayer')) {
      global.VideoLayer = VideoLayer
}