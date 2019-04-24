/**
 * Noise & Particles
 * 
 * LeParc LC
 * 
 * by Andrés Senn
 */
class NC {
      constructor() {
            this.cellx = 10
            this.celly = 10
            this.offx = 0
            this.offy = 0
            this.scalex = 0.01
            this.scaley = 0.01
            this.scalez = 0.01
            this.oscx = 10
            this.oscy = 10
      }
      noiseCoord(fn = null) {
            for (let x = 0; x < width; x += this.cellx) {
                  for (let y = 0; y < height; y += this.celly) {
                        //let i = (x + y * width) * 4
                        let n = map(noise((x + this.offx) * this.scalex, (y + this.offy) * this.scalex, frameCount * this.scalez), 0, 1, -this.oscx, this.oscy)
                        // let ny = map()
                        if (typeof fn == 'function') {
                              let nx = (x + n) % width
                              let ny = (y + n) % height
                              let data = { nx: nx, ny: ny, x: x, y: y }
                              fn(data);
                        }
                  }
            }
            return this
      }
      cell(_w, _h) {
            this.cellx = _w
            this.celly = _h
            return this
      }
      cellX(_w) {
            this.cellx = _w
            return this
      }
      cellY(_h) {
            this.celly = _h
            return this
      }
      osc(_ox, _oy) {
            this.oscx = _ox
            this.oscy = _oy
            return this
      }
      oscX(_ox) {
            this.oscx = _ox
            return this
      }
      oscY(_oy) {
            this.oscy = _oy
            return this
      }
      nscale(_sx, _sy, _sz) {
            this.scalex = _sx
            this.scaley = _sy
            this.scalez = _sz
            return this
      }
      nscaleX(_sx) {
            this.scalex = _sx
            return this
      }
      nscaleY(_sy) {
            this.scaley = _sy
            return this
      }
      nscaleZ(_sz) {
            this.scalez = _sz
            return this
      }
      noffset(_ox, _oy) {
            this.offx = _ox
            this.offy = _oy
            return this
      }
      noffsetX(_ox) {
            this.offx = _ox
            return this
      }
      noffsetY(_oy) {
            this.offy = _oy
            return this
      }

}
class NP {
      constructor(x, y) {
            this.posx = x
            this.posy = y
            this.velx = 0
            this.vely = 0
            this.noise_size = 0.008
            this.step = 10
            this.offset = 50
            this.a = 0
            this.av = 1
            this.randv = random(-50, 50)
      }
      update() {
            this.velx = this.step * noise(this.offset + this.posx * this.noise_size, this.offset + this.posy * this.noise_size) * cos(radians(this.a + this.randv) * noise(this.posx * this.noise_size, this.posy * this.noise_size));
            this.vely = this.step * noise(this.offset + this.posx * this.noise_size, this.offset + this.posy * this.noise_size) * sin(radians(this.a + this.randv) * noise(this.posx * this.noise_size, this.posy * this.noise_size));
            this.posx += this.velx
            this.posy += this.vely
            this.a += this.av
            this.offset += 10
            return this
      }
      setBounds() {
            if (this.posx < 0) {
                  this.posx = width
                  // this.posy = random(height)
                  this.a = 0
                  this.offset = 0
            }
            if (this.posx > width) {
                  this.posx = 0
                  // this.posy = random(height)
                  this.a = 0
                  this.offset = 0
            }
            if (this.posy < 0) {
                  this.posy = height
                  // this.posx = random(width)
                  this.a = 0
                  this.offset = 0
            }
            if (this.posy > height) {
                  this.posy = 0
                  // this.posx = random(width)
                  this.a = 0
                  this.offset = 0
            }
            return this
      }
      nSize(_ns) {
            this.noise_size = _ns
      }
      aVel(_av) {
            this.av = _av
      }
      nVel(_sv) {
            this.step = _sv
      }

}

class NPSys {
      constructor() {
            this.objs = []
            this.noise_size = 0.008
            this.av = 1
            this.step = 10
      }
      update(fn = null) {
            for (let i = 0; i < this.objs.length; i++) {
                  this.objs[i].update()
                  this.objs[i].setBounds()
                  this.objs[i].nSize(this.noise_size)
                  this.objs[i].aVel(this.av)
                  this.objs[i].nVel(this.step)
                  if (typeof fn == 'function') {
                        fn(this.objs[i].posx, this.objs[i].posy);
                  }
            }
            return this
      }
      addObj(_p) {
            this.objs.push(_p)
      }
      resetObjs() {
            this.objs = []
      }
      nSize(_ns) {
            this.noise_size = _ns
            return this
      }
      aVel(_av) {
            this.av = _av
            return this
      }
      nVel(_sv) {
            this.step = _sv
            return this
      }
      resetDir(){
            for (let i = 0; i < this.objs.length; i++) {
                  this.objs[i].update()
                  this.objs[i].setBounds()
                  this.objs[i].a = (random(-500,500))
                  // this.objs[i].av = (random(-500,500))
            }
            return this
      }

}
// hacer global / make global
if (!global.hasOwnProperty('NC')) {
      global.NC = NC
}
// hacer global / make global
if (!global.hasOwnProperty('NP')) {
      global.NP = NP
}
// hacer global / make global
if (!global.hasOwnProperty('NPSys')) {
      global.NPSys = NPSys
}