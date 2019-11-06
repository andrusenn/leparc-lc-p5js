/**
 * Cut
 * 
 * LeParc LC
 * 
 * by Andrés Senn
 */

class Cut {
      constructor(_cx, _cy, _snapshot = null) {
            this.cx = _cx
            this.cy = _cy
            this.col = color(255)
            this.alp = 120;
            this.snapshot = _snapshot
            this.x = 0, this.y = 0
            this.strokew = 0.5
            this.movx = 0, this.movy = 0
            this.velx = 0.0000;
            this.vely = 0.0000;
            this.vel_theta = (0.01);
            this.vel_phi = (0.03);
            this.grow = false
            this.offx = 0
            this.offy = 0
            this.offxvel = 0.0001
            this.offyvel = 0.0002

            this.numlaps = 500;
            
            this.radiox = 700;
            this.radioy = 700;

            this.frict = 0.999;//1.0/0.9999996;


            this.theta = 0.0;
            this.phi = 0.0;

            this.noise_size = 0.004;
      }
      offsetVel(_x, _y) {
            this.offxvel = _x
            this.offyvel = _y
            return this
      }
      angVel(_av) {
            this.vel_theta = _av
            return this
      }
      color(_c) {
            this.col = _c
            return this
      }
      draw(fn=null) {
            if(!fn) beginShape(POINTS)
            for (let i = 0; i < this.numlaps; i++) {

                  this.x = (this.cx + this.movx) + Math.cos(this.theta) * (this.radiox * noise((this.x + this.offx) * this.noise_size, (this.y + this.offy) * this.noise_size));
                  this.y = (this.cy + this.movy) + Math.sin(this.theta) * (this.radioy * noise((this.x + this.offx) * this.noise_size, (this.y + this.offy) * this.noise_size));

                  this.theta += this.vel_theta;
                  this.phi += this.vel_phi;

                  if (this.snapshot) {
                        if (brightness(this.snapshot.get(int(this.x), int(this.y))) > 20) {
                              stroke(0, this.alp);
                        } else {
                              stroke(255, this.alp);
                        }
                  } else {
                        stroke(this.col);
                  }

                  if(!fn) strokeWeight(this.strokew)

                  if(typeof fn == 'function'){
                        fn(this.x, this.y);
                  }else{
                        vertex(this.x, this.y);
                  }

                  this.offx += this.offxvel
                  this.offy += this.offyvel

            }
            if(!fn) endShape()
            return this
      }
      move(_cx,_cy) {
            this.cx = _cx
            this.cy = _cy
            return this
      }
      moveX(_cx) {
            this.cx = _cx
            return this
      }
      moveY(_cy) {
            this.cy = _cy
            return this
      }
      points(_p) {
            this.numlaps = _p
            return this
      }
      friction(_f) {
            this.frict = _f
            if (this.grow) {
                  this.radiox *= (1.0 / this.frict)
                  this.radioy *= (1.0 / this.frict)
                  if(this.radiox > width*4) this.radiox = width*4
                  if(this.radioy > height*4) this.radioy = height*4
            } else {
                  this.radiox *= this.frict
                  this.radioy *= this.frict
                  if(this.radiox < 1) this.radiox = 1
                  if(this.radioy < 1) this.radioy = 1
            }
            return this

      }
      radio(_r){
            this.radiox = _r
            this.radioy = _r
            return this
      }
      radioX(_r){
            this.radiox = _r
            return this
      }
      radioY(_r){
            this.radioy = _r
            return this
      }
      toggle(min, max) {
            if (this.radiox < min || this.radioy < min) {
                  this.grow = true
            }
            if (this.radiox > max || this.radioy > max) {
                  this.grow = false
            }
            return this
      }
}
// hacer global / make global
if (!global.hasOwnProperty('Cut')) {
      global.Cut = Cut
}