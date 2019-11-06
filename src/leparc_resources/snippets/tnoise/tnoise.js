
let toxi = loadLib('toxiclibs.min.js')

// hacer global / make global
if (!global.hasOwnProperty('toxi')) {
      global.toxi = toxi

      if (!global.hasOwnProperty('simplexNoise')) {
            global.simplexNoise = toxi.math.noise.simplexNoise.noise
            // Etc...
      }
      if (!global.hasOwnProperty('perlinNoise')) {
            global.perlinNoise = toxi.math.noise.PerlinNoise.noise
            // Etc...
      }
      // Etc...
}