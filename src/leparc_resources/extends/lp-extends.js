class EspiroNoise {
      constructor(_cx, _cy, _snapshot = null) {
            this.cx = _cx
            this.cy = _cy
            this.col = 255
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
            // this.toggle = false
            // this.vel_theta1 = (0.2);
            // this.vel_phi1 = (0.1);

            this.numlaps = 500;

            // Radio del plano / Plane radius (Pendulo1/Pendulum1)
            this.radiox = 700;
            this.radioy = 700;

            this.frict = 1.0;//1.0/0.9999996;


            this.theta = 0.0;
            this.phi = 0.0;
            // this.theta1 = 0.0;
            // this.phi1 = 0.0;


            //float noise_size = 0.001;
            this.noise_size = 0.004;
      }
      get pos() {
            return { x: this.x, y: this.y }
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
      update() {

            this.x = (this.cx + this.movx) + cos(this.theta) * (this.radiox * noise((this.x + this.offx) * this.noise_size, (this.y + this.offy) * this.noise_size));
            this.y = (this.cy + this.movy) + sin(this.theta) * (this.radioy * noise((this.x + this.offx) * this.noise_size, (this.y + this.offy) * this.noise_size));

            this.theta += this.vel_theta;
            this.offx += this.offxvel
            this.offy += this.offyvel
      }
      color(_c) {
            this.col = _c
            return this
      }
      draw() {
            beginShape(POINTS)
            for (let i = 0; i < this.numlaps; i++) {

                  this.x = (this.cx + this.movx) + cos(this.theta) * (this.radiox * noise((this.x + this.offx) * this.noise_size, (this.y + this.offy) * this.noise_size));
                  this.y = (this.cy + this.movy) + sin(this.theta) * (this.radioy * noise((this.x + this.offx) * this.noise_size, (this.y + this.offy) * this.noise_size));

                  this.theta += this.vel_theta;
                  this.phi += this.vel_phi;

                  // this.theta1 += this.vel_theta1;
                  // this.phi1 += this.vel_phi1;
                  //if (dist(x, y, width*0, height*0.5) > 200) {
                  //float nn = noise(x * noise_size, y * noise_size);
                  if (this.snapshot) {
                        if (brightness(this.snapshot.get(int(this.x), int(this.y))) > 20) {
                              stroke(0, this.alp);
                        } else {
                              stroke(255, this.alp);
                        }
                  } else {
                        stroke(this.col);
                  }
                  strokeWeight(this.strokew)
                  vertex(this.x, this.y);
                  this.offx += this.offxvel
                  this.offy += this.offyvel

            }
            endShape()
            return this
      }
      move() {
            this.movx += this.velx;
            this.movy += this.vely;
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
            } else {
                  this.radiox *= this.frict
                  this.radioy *= this.frict
            }
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
// hacer global
if (!global.hasOwnProperty('EspiroNoise')) {
      global.EspiroNoise = EspiroNoise
}
// Glitch
class GlitchTools {
      constructor() {
            this.img = null
      }
      loadimg(_i) {
            this.img = _i
      }
      addnoise() {
            return this
      }
      render() {

      }
}
// hacer global
if (!global.hasOwnProperty('GlitchTools')) {
      global.GlitchTools = GlitchTools
}