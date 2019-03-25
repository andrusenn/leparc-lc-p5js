/**
 * Duchamp!!
 * [ES] 
 *    Clase de ejemplo para la carga dinamica de codigo externo
 *    Imagen: rotorelief 1 (Marcel Duchamp)
 * [EN]
 *    Example class for load external code dynamically
 *    Image: rotorelief 1 (Marcel Duchamp)
 * 
 * 
 */

class Duchamp {
      constructor() {
            this.i = null
            loadImage(libPath('duchamp') + 'rotorelief.png', (i) => {
                  this.i = i
            })
      }
      rotorelief(x, y) {
            if (this.i) {
                  push()
                  imageMode(CENTER)
                  image(this.i, x, y)
                  pop()
            }
      }
}
// Igual a la libreria
duchamp = new Duchamp()