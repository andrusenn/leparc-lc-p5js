// Carga de una libreria externa / debe existir en la carpeta libs
// Loading external lib / must be exists in libs folder
/**
 * loop:
$world.update()
stroke(255)
beginShape(POINTS)
for (let i = 0; i < $world.particles.length; i++) {
	let p = $world.particles[i];
	vertex(p.x, p.y);
}
endShape()

 * aux:

 snip('toxi', () => {
	$world = new World2D()
	$world.setWorldBounds(new Rect(0, 0, width, height))
	$world.setDrag(0.05)
	for (let x = 0; x < width; x += 50) {
		for (let y = 0; y < height; y += 50) {
			let p = new Parlicle2D(new Vec2D(x, y))
			$world.addBehavior(new AttractionBehavior(p, 100, -1.2))
			$world.addParticle(p)
		}
	}
})
// Events
mouseMoved = () => {
	// Mouse

	let ma = new AttractionBehavior(new Vec2D(mouseX, mouseY), 100, -2);
	$world.addBehavior(ma);
}
 */

let toxi = loadLib('toxiclibs.min.js')

// hacer global / make global
if (!global.hasOwnProperty('toxi')) {
      global.toxi = toxi
      global.Vec2D = toxi.geom.Vec2D
      global.Rect = toxi.geom.Rect
      global.World2D = toxi.physics2d.VerletPhysics2D
      global.Parlicle2D = toxi.physics2d.VerletParticle2D
      global.AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior

      // Etc...
}

// vec2D
// if (!global.hasOwnProperty('Vec2D')) {
//       global.Vec2D = toxi.geom.Vec2D
// }
