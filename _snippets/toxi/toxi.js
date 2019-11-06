let toxi = require('toxiclibsjs')

class Atract{
      constructor(){
            this.grid = 10
            this.particles = []
            //this.physics2d = new toxi.physics2d.VerletPhysics2D();
            this.physics2d.setDrag(0.05);
      }
      particles(_p){
            for(let x = 0; x < width; x += this.grid){
                  for(let y = 0; y < height; y += this.grid){
                        let particle = new toxi.physics2d.VerletParticle2D(toxi.geom.Vec2D(x,y));
                  }
            }
            this.particles.push()
      }

}

// hacer global / make global
if (!global.hasOwnProperty('toxi')) {
      global.toxi = toxi
        physics.setDrag(0.05);
}