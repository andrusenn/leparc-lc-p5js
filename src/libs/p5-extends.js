// Extends p5js -------------------------------------
/**
 * Funcionalidades que extienden p5js
 */
// --------------------------------------------------

/**
 * Obtiene la ruta a leparc_resources/libs/
 * 
 * @method libPath
 * @param {String} name      nombre de la libreria sin extension .js
 */
if (!p5.prototype.hasOwnProperty('console_msg')) {
      p5.prototype.console_msg = function (msj = '', type = null) {
            let sclass = ''
            if (type == 'info') {
                  sclass = 'info'
            }
            if (type == 'error') {
                  sclass = 'error'
            }
            if (type == 'warning') {
                  sclass = 'warning'
            }
            if (msj != '') {
                  Lp5.el('lp5-console-out').innerHTML = '<span class="' + sclass + '">' + msj + '</span>'
            } else {
                  Lp5.el('lp5-console-out').innerHTML = ''
            }
      }
}
/**
 * Setea el ancho y alto de la ventana (electron)
 * @method winSize
 * @param {Number} w          ancho
 * @param {Number} h          alto
 */
if (!p5.prototype.hasOwnProperty('winSize')) {
      p5.prototype.winSize = function (w, h) {
            Lp5.main.resizeWin(w, h)
      }
}

/**
 * Abreviatura de background()
 * @method bg
 * 1 parametro
 * @param {Number} 0-255 Escala de grises
 * 3 parametros
 * @param {Number} r          rojo  | h tono
 * @param {Number} g          verde | s saturacion
 * @param {Number} b          azul  | b brillo
 * 2 parametros
 * @param {Number} r          rojo  | h tono
 * @param {Number} g          verde | s saturacion
 * @param {Number} b          azul  | b brillo
 * @param {Number} a          alfa
 */
if (!p5.prototype.hasOwnProperty('bg')) {
      p5.prototype.bg = function () {
            let arg = arguments;
            if (arg.length == 1) {
                  background(arg[0])
            }
            if (arg.length == 3) {
                  background(arg[0], arg[1], arg[2])
            }
            if (arg.length == 4) {
                  background(arg[0], arg[1], arg[2], arg[3])
            }
      }
}

/**
 * Fundido
 * @method fade
 * @param {Number} c          color
 * @param {Number} a          alfa
 */
if (!p5.prototype.hasOwnProperty('fade')) {
      p5.prototype.fade = function () {
            let arg = arguments;
            if (arg.length == 1) {
                  push()
                  colorMode(RGB, 255, 255, 255)
                  noStroke()
                  rectMode(CORNER)
                  fill(0, arg[0])
                  rect(0, 0, width, height)
                  pop()
            }
            if (arg.length == 2) {
                  push()
                  colorMode(RGB, 255, 255, 255)
                  noStroke()
                  rectMode(CORNER)
                  fill(red(arg[0]), green(arg[0]), blue(arg[0]), arg[1])
                  rect(0, 0, width, height)
                  pop()
            }
      }
}
/**
 * Variacion de elleipse()
 * @method circle
 * @param {Number} x          posicion x
 * @param {Number} y          posicion y
 * @param {Number} d          diametro
 */
if (!p5.prototype.hasOwnProperty('circle')) {
      p5.prototype.circle = function () {
            let arg = arguments;
            if (arg.length == 3) {
                  ellipse(arg[0], arg[1], arg[2], arg[2])
            }
      }
}
/**
 * Desplaza salida del canvas o un recorte
 * @method displace
 * 2 parametros
 * @param {Number} velx       velocidad de desplazo en x
 * @param {Number} vely       velocidad de desplazo en y
 * 
 * Recorte
 * 6 parametros
 * @param {Number} x          posicion x
 * @param {Number} y          posicion y
 * @param {Number} w          ancho del recorte
 * @param {Number} x          alto del recorte
 * @param {Number} velx       velocidad de desplazo en x
 * @param {Number} vely       velocidad de desplazo en y
 */

if (!p5.prototype.hasOwnProperty('displace')) {
      p5.prototype.displace = function () {
            let arg = arguments;
            if (arg.length == 6) {
                  let i = get(arg[0], arg[1], arg[2], arg[3])
                  push()
                  imageMode(CORNER);
                  image(i, arg[0] + arg[4], arg[1] + arg[5])
                  pop()
            } else
                  if (arg.length == 2) {
                        let i = get()
                        push()
                        imageMode(CORNER);
                        image(i, arg[0], arg[1])
                        pop()
                  } else {
                        console.log('no entra')
                  }
            return this;
      }
}
/**
 * beginRot(vel) y endRot() se utilizan
 * juntas
 * 
 * @method beginRot
 * 1 parametro
 * @param {Number} velr       velocidad rotacion en radianes
 * 2 parametros
 * @param {Number} velr       velocidad rotacion en radianes
 * @param {Number} scale      escala
 * 3 parametros
 * @param {Number} velr       velocidad rotacion en radianes
 * @param {Number} centrox    punto ancla de referencia x
 * @param {Number} centroy    punto ancla de referencia y
 * 4 parametros
 * @param {Number} velr       velocidad rotacion en radianes
 * @param {Number} centrox    punto ancla de referencia x
 * @param {Number} centroy    punto ancla de referencia y
 * @param {Number} scale      escala
 */
if (!p5.prototype.hasOwnProperty('beginRot')) {
      p5.prototype.beginRot = function () {
            let arg = arguments;
            if (arg.length == 0) {
                  push();
                  translate(width / 2, height / 2);
                  rotate(freq(0.01))
                  translate(-width / 2, -height / 2);
            }
            if (arg.length == 1) {
                  push();
                  translate(width / 2, height / 2);
                  rotate(arg[0])
                  translate(-width / 2, -height / 2);
            }
            if (arg.length == 2) {
                  push();
                  translate(width / 2, height / 2);
                  scale(arg[1])
                  rotate(arg[0])
                  translate(-width / 2, -height / 2);
            }
            if (arg.length == 3) {
                  push();
                  translate(arg[1], arg[2]);
                  rotate(arg[0])
                  translate(-arg[1], -arg[2]);
            }
            if (arg.length == 4) {
                  push();
                  translate(arg[1], arg[2]);
                  scale(arg[3])
                  rotate(arg[0])
                  translate(-arg[1], -arg[2]);
            }
      }
}
/**
 * beginRot(vel) y endRot() se utilizan
 * juntas
 * 
 * @method endRot
 */
if (!p5.prototype.hasOwnProperty('endRot')) {
      p5.prototype.endRot = function () {
            pop();
      }
}
/**
 * Efecto de zoom
 * 
 * 
 * @method zoom
 * @param {Number} vels      velocidad de escalado
 * 
 * ZOOM es una variable global que almacena la referencia inicial
 */

if (!p5.prototype.hasOwnProperty('zoom')) {
      p5.prototype.ZOOM_SCALE = 1;
      p5.prototype.zoom = function () {
            this.s = 1;
            let arg = arguments;
            if (arg[1] != null) {
                  this.s = arg[1];
            }
            if (arg.length > 0) {
                  let i = get()
                  push()
                  imageMode(CORNER)
                  translate(width / 2, height / 2)
                  scale(ZOOM_SCALE)
                  translate(-width / 2, -height / 2)
                  image(i, 0, 0)
                  ZOOM_SCALE = this.s
                  pop()
                  ZOOM_SCALE += arg[0]
            }
      }
}
/**
 * Efecto de espejo sobre eje de Y
 * 
 * @method mirrorY
 */

if (!p5.prototype.hasOwnProperty('mirrorY')) {
      p5.prototype.mirrorY = function () {
            let i = get(0, 0, width / 2, height);
            push()
            imageMode(CORNER)
            translate(width, 0)
            scale(-1, 1)
            image(i, 0, 0)
            pop()
      }
}
/**
 * Efecto de espejo sobre eje de Y invertido
 * 
 * @method imirrorY
 */

if (!p5.prototype.hasOwnProperty('imirrorY')) {
      p5.prototype.imirrorY = function () {
            let i = get(0, 0, width / 2, height);
            push()
            imageMode(CORNER)
            translate(width, height)
            scale(-1, -1)
            image(i, 0, 0)
            pop()
      }
}
/**
 * Efecto de espejo sobre eje de X
 * 
 * @method mirrorX
 */
if (!p5.prototype.hasOwnProperty('mirrorX')) {
      p5.prototype.mirrorX = function () {
            let i = get(0, 0, width, height / 2);
            push()
            imageMode(CORNER)
            translate(0, height)
            scale(1, -1)
            image(i, 0, 0)
            pop()
      }
}
/**
 * Efecto de espejo sobre eje de X invertido
 * 
 * @method imirrorX
 */

if (!p5.prototype.hasOwnProperty('imirrorX')) {
      p5.prototype.imirrorX = function () {
            let i = get(0, 0, width, height / 2);
            push()
            imageMode(CORNER)
            translate(width, height)
            scale(-1, -1)
            image(i, 0, 0)
            pop()
      }
}
/**
 * Efecto de caleidoscopio 4 caras
 * 
 * @method kaleido
 * 
 */

if (!p5.prototype.hasOwnProperty('kaleido')) {
      p5.prototype.kaleido = function () {
            let i = get(0, 0, width / 2, height / 2);
            imageMode(CORNER)
            push()
            translate(0, 0)
            translate(- 1, 0)
            scale(1, 1)
            image(i, 0, 0)
            pop()

            push()
            translate(0, 0)
            translate(width - 1, 0)
            scale(-1, 1)
            image(i, 0, 0)
            pop()

            push()
            translate(0, 0)
            translate(0, height)
            scale(1, -1)
            image(i, 0, 0)
            pop()

            push()
            translate(0, 0)
            translate(width - 1, height)
            scale(-1, -1)
            image(i, 0, 0)
            pop()

      }
}
/**
 * Metodo abreviado de la sentencia -> sin(frameCount)
 * 
 * @method osc
 * @param {Number}  n          multiplicador frecuencia
 * @return {Number}
 */
if (!p5.prototype.hasOwnProperty('osc')) {
      p5.prototype.osc = function () {
            let arg = arguments
            let freq = 1
            if (arg.length == 0) {
                  freq = frameCount * 0.001 * 10
            }
            if (arg.length == 1) {
                  freq = frameCount * 0.001 * arg[0]
            }
            return sin(freq);
      }
}
/**
 * Metodo abreviado de la sentencia -> {sin: sin(frameCount * n), cos: cos(frameCount * n)}
 * 
 * @method cosc
 * @param {Number}  n          multiplicador frecuencia
 * @return {Object} 
 */
if (!p5.prototype.hasOwnProperty('cosc')) {
      p5.prototype.cosc = function () {
            let arg = arguments
            let freq = 1
            if (arg.length == 0) {
                  freq = frameCount * 0.001 * 10
            }
            if (arg.length == 1) {
                  freq = frameCount * 0.001 * arg[0]
            }
            return { sin: sin(freq), cos: cos(freq) };
      }
}
/**
 * Metodo abreviado de la sentencia -> frameCount * n
 * 
 * @method freq
 * @param {Number} m      multiplicador para reducir frameCount
 */
if (!p5.prototype.hasOwnProperty('freq')) {
      p5.prototype.freq = function () {
            let arg = arguments
            let freq
            if (arg.length == 1) {
                  freq = arg[0]
                  return frameCount * arg[0]
            }
            return 1;
      }
}
/**
 * Metodo carga un archivo js externo
 * el archivo debe se guardado dentro de un
 * directorio con el mismo nombre ej. leparc/leparc.js
 * 
 * @method useLib
 * @param {String} name      nombre del archivo sin extension .js
 */
if (!p5.prototype.hasOwnProperty('useLib')) {
      p5.prototype.useLib = function (name) {
            let path = Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'libs', name, name + '.js')
            try {
                  loadStrings(path, (data) => {
                        let code = '';
                        console_msg('Cargado -> ' + name, 'info')
                        for (let i = 0; i < data.length; i++) {
                              code += data[i] + '\n';
                        }
                        try {
                              new Function(code)();
                        } catch (e) {
                              console_msg('useLib(name) -> problemas para cargar:' + name, 'error')
                        }
                  })
            } catch (e) {
                  Lp5.el('lp5-console-out').innerHTML = 'useLib(name): ' + e
            }
      }
}
/**
 * Obtiene la ruta a leparc_resources/libs/
 * 
 * @method libPath
 * @param {String} name      nombre de la libreria sin extension .js
 */
if (!p5.prototype.hasOwnProperty('libPath')) {
      p5.prototype.libPath = function () {
            let arg = arguments
            if (arg.length == 1) {
                  return Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'libs', arg[0])
            }
            return null;
      }
}
/**
 * Obtiene la ruta a leparc_resources/images/
 * 
 * @method mediaPath
 * @param {String} name      nombre del directorio
 */
if (!p5.prototype.hasOwnProperty('mediaPath')) {
      p5.prototype.mediaPath = function () {
            let arg = arguments

            if (arg.length == 0) {
                  return Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'media')
            }
            if (arg.length == 1) {
                  return Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'media', arg[0])
            }
            return null;
      }
}
// p5.prototype.img = function (i, fn) {
//       loadImage(Lp5.main.resourcesPath() + '/leparc_resources/images/' + i, (__img) => {
//             if (typeof fn == 'function') {
//                   fn(__img)
//             }
//       })
// }

/**
 * // NO IMPLEMENTADO
 * Metodo carga banco de imagenes
 * 
 */
// p5.prototype.___pics = [];
// p5.prototype.pic = function () {
//       let arg = arguments;
//       if (arg.length == 3 && ___pics.length > 0) {
//             image(___pics[arg[0]], arg[1] - ___pics[arg[0]].width / 2, arg[2] - ___pics[arg[0]].height / 2)
//       } else {
//             Lp5.el('lp5-console-out').innerHTML = 'Se requieren 3 argumentos -> pic(index,x,y)'
//       }
// }
// p5.prototype.useIBank = function () {
//       let arg = arguments
//       if (arg.length == 1) {
//             Lp5.imagesBankPath[arg[0]] = Lp5.main.resourcesPath() + '/leparc_resources/images/' + arg[0] + '/'
//       }
//       return null;
// }
// p5.prototype.img = new Array()

// MEDIA ------------------------------------------

/******************************************************/
/* Cam ************************************************/
/******************************************************/

/**
 * Propiedad que almacena la instancia de Cam
 * 
 * @property ___webcam
 * 
 */

p5.prototype.___webcam = null;

/**
 * Metodo inicializa camara (CAPTURE)
 * 
 * @method useCam
 * 
 * sin parametro alto y ancho 320x240
 * 
 * 2 parametros
 * @param {String} w         ancho del video
 * @param {String} h         alto del video
 * 
 */

if (!p5.prototype.hasOwnProperty('useCam')) {
      p5.prototype.useCam = function () {
            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {
                  let arg = arguments;
                  if (arg.length == 0) {
                        ___webcam = createCapture(VIDEO);
                        ___webcam.size(320, 240);
                        ___webcam.hide()
                  }
                  if (arg.length == 2) {
                        ___webcam = createCapture(VIDEO);
                        ___webcam.size(arg[0], arg[0]);
                  }
            } else {
                  console_msg('useCam() Solo puede conectarse en modo LOCAL o SERVER', 'warning');
            }
      }
}
/**
 * Metodo que imprime la captura
 * 
 * @method getCam
 * @param {Number} x      posicion en x
 * @param {Number} y      posicion en y
 */

if (!p5.prototype.hasOwnProperty('getCam')) {
      p5.prototype.getCam = function () {

            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {
                  let arg = arguments;
                  if (___webcam == null) {
                        console_msg('useCam() no esta declarado')
                  }
                  if (arg.length == 2 && ___webcam != null) {
                        push()
                        translate(arg[0], arg[1])
                        image(___webcam, 0, 0)
                        pop()
                  }
            } else {
                  console_msg('useCam() - Solo puede conectarse en modo LOCAL o SERVER', 'warning');
            }
      }
}
/******************************************************/
/* Audio **********************************************/
/******************************************************/
/**
 * Estos metodos son creados para la captura 
 * de los parametros del audio
 *  
 */

/**
 * Propiedad que almacena la instancia de Audio
 * 
 * @property ___audio
 * 
 */

if (!p5.prototype.hasOwnProperty('___audio')) {
      p5.prototype.___audio = null
}
/**
 * Propiedad que almacena la instancia de FFT
 * 
 * @property ___fft
 * 
 */

if (!p5.prototype.hasOwnProperty('___fft')) {
      p5.prototype.___fft = null
}
/**
 * Metodo que inicializa la clase Audio
 * 
 * @method useAudio
 * @param {Number} source           fuente/source 0,1,2,n.. depende del hardware
 * @param {Number} smoothing        suavizado en el analisis new p5.FFT([smoothing], [bins])
 */

if (!p5.prototype.hasOwnProperty('useAudio')) {
      p5.prototype.useAudio = function (source = 0, smoothing = 0.3) {
            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {
                  ___audio = new p5.AudioIn()
                  ___fft = new p5.FFT(smoothing)
                  ___audio.start()
                  ___audio.getSources(function (deviceList) {
                        if (deviceList.length > 0) {
                              ___audio.setSource(source)
                              ___fft.setInput(___audio)
                        } else {
                              console_msg('No hay fuentes disponibles o configuradas');
                        }
                  })
            } else {
                  console_msg('useAudio() Solo puede conectarse en modo LOCAL o SERVER', 'warning');
            }
      }
}
/**
 * Metodo que obtiene el volume
 * 
 * @method audioVol
 */
if (!p5.prototype.hasOwnProperty('audioVol')) {
      p5.prototype.audioVol = function () {
            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {

                  if (___fft != null && ___audio != null) {
                        return ___audio.getLevel()
                  } else {
                        console_msg('getVolume() -> linein() no esta declarado')
                        return null;
                  }
            } else {
                  console_msg('audioVol() Solo puede conectarse en modo LOCAL o SERVER', 'warning');
            }
      }
}
/**
 * Metodo que obtiene el volume en una banda
 * particular de 0 a 128
 * 
 * 
 * @method audioBeat
 * @param {Number} band             Indice de la banda 0 a 128
 */
if (!p5.prototype.hasOwnProperty('audioBeat')) {
      p5.prototype.audioBeat = function (band) {

            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {
                  if (___fft != null && ___audio != null) {
                        let spectrum = ___fft.analyze(128, 'db');
                        if (band > spectrum.length) band = spectrum.length
                        return spectrum[band] + 140
                  } else {
                        console_msg('audioBeat() -> useAudio() no esta declarado')
                        return null;
                  }
            } else {
                  console_msg('Solo puede conectarse en modo LOCAL o SERVER');
            }
      }
}
/**
 * Devuelve la energia (volume) del rango de frecuencias
 * 
 * @method audioEnergy
 * @param {Number} fq1 frecuencia 1
 * @param {Number} fq2 frecuencia 2
 */
if (!p5.prototype.hasOwnProperty('audioEnergy')) {
      p5.prototype.audioEnergy = function (f1, f2 = null) {

            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {
                  if (___fft != null && ___audio != null) {
                        f2 = (f2 == null) ? f1 : f2
                        ___fft.analyze();
                        return ___fft.getEnergy(f1, f2)
                  } else {
                        console_msg('audioEnergy() -> useAudio() no esta declarado')
                        return null;
                  }
            } else {
                  console_msg('Solo puede conectarse en modo LOCAL o SERVER', 'warning');
            }
      }
}

/**
 * Crea un canvas con WEBGL
 * 
 * @method use3D
 */

if (!p5.prototype.hasOwnProperty('___webgl')) {
      if (Lp5.main.globalSettings().renderer == 'p2d') {
            p5.prototype.___webgl = false
      } else {
            p5.prototype.___webgl = true
      }
}
if (!p5.prototype.hasOwnProperty('use3d')) {
      p5.prototype.use3d = function () {
            if (Lp5.main.globalSettings().renderer == 'p2d') Lp5.main.reload('webgl')
      }
}
if (!p5.prototype.hasOwnProperty('use2d')) {
      p5.prototype.use2d = function () {
            if (Lp5.main.globalSettings().renderer == 'webgl') Lp5.main.reload('p2d')
      }
}