/**
 * Duchamp!!
 * [ES] 
 *    Clase de ejemplo para la carga dinamica de codigo externo
 *    Imagen: rotorelief 1 (Marcel Duchamp)
 * [EN]
 *    Example class for load external code dynamically
 *    Image: rotorelief 1 (Marcel Duchamp)
 * 
 * Ej:
 * 
 * en aux:
 *    snip('duchamp',()=>{
 *          $d = new Duchamp()
 *    })
 * 
 * en draw:
 *    $d.rotorelief(width/2,height/2)
 * 
 */
class Duchamp {
      constructor() {
            this.i = null
            loadImage(snipPath('duchamp') + '/rotorelief.png', (i) => {
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
// hacer global
if (!global.hasOwnProperty('Duchamp')) {
      global.Duchamp = Duchamp
}