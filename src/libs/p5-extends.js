// Extends p5js -------------------------------------
/**
 * Funcionalidades que extienden p5js
 */
// --------------------------------------------------

/**
 * Escrib mensaje en la barra inferior
 * 
 * @method console_msg
 * @param {String} msg      mensaje
 * @param {String} type     tipo de mensaje (info, warning,error)
 */
if (!p5.prototype.hasOwnProperty('console_msg')) {
      p5.prototype.console_msg = function (msj = '', type = null) {
            msj = msj.toString()
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
 * Escrib fadeIn -> to full color
 * 
 * @method console_msg
 * @param {String} msg      mensaje
 * @param {String} type     tipo de mensaje (info, warning,error)
 */
if (!p5.prototype.hasOwnProperty('___fadeAlpha')) {
      p5.prototype.___fadeAlpha = 0
}
if (!p5.prototype.hasOwnProperty('fadeIn')) {
      p5.prototype.fadeIn = function () {
            let arg = arguments
            let vel = 5
            let col = color(0, ___fadeAlpha)
            if (arg.length == 1) {
                  vel = arg[0]
                  col = color(0, ___fadeAlpha)
            }
            if (arg.length == 2) {
                  vel = arg[0]
                  col = color(arg[1], ___fadeAlpha)
            }

            if (___fadeAlpha > 255) ___fadeAlpha = 255
            if (___fadeAlpha < 0) ___fadeAlpha = 0
            push()
            rectMode(CORNER)
            noStroke()
            fill(col)
            rect(0, 0, width, height)
            pop()
            ___fadeAlpha -= vel
      }
}

if (!p5.prototype.hasOwnProperty('fadeOut')) {
      p5.prototype.fadeOut = function () {
            let arg = arguments
            let vel = 5
            let col = color(0, ___fadeAlpha)
            if (arg.length == 1) {
                  vel = arg[0]
                  col = color(0, ___fadeAlpha)
            }
            if (arg.length == 2) {
                  vel = arg[0]
                  col = color(arg[1], ___fadeAlpha)
            }

            if (___fadeAlpha > 255) ___fadeAlpha = 255
            if (___fadeAlpha < 0) ___fadeAlpha = 0
            push()
            rectMode(CORNER)
            noStroke()
            fill(col)
            rect(0, 0, width, height)
            pop()
            ___fadeAlpha += vel
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
            if (w < 150) w = 150
            if (h < 150) h = 150
            Lp5.main.resizeWin(w, h)
      }
}
/**
 * Setea el ancho y alto de la ventana (electron)
 * @method size
 * @param {Number} w          ancho
 * @param {Number} h          alto
 */
if (!p5.prototype.hasOwnProperty('size')) {
      p5.prototype.size = function (w, h) {
            if (w < 150) w = 150
            if (h < 150) h = 150
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
 * 
 * @method fade
 * 1 param
 * @param {Number} a          alfa
 * 4 param
 * @param {Number} r          red
 * @param {Number} g          green
 * @param {Number} b          blue
 * @param {Number} a          alfa
 * 5 param
 * @param {Number} r          red
 * @param {Number} g          green
 * @param {Number} b          blue
 * @param {Number} a          alfa
 * @param {Number} mode       RGB/HSB
 */
if (!p5.prototype.hasOwnProperty('fade')) {
      p5.prototype.fade = function () {
            let arg = arguments;
            if (arg.length == 1) {
                  push()
                  colorMode(RGB, 255)
                  background(0, 0, 0, arg[0])
                  pop()
            }
            if (arg.length == 4) {
                  push()
                  colorMode(RGB, 255)
                  background(arg[0], arg[1], arg[2], arg[3])
                  pop()
            }
            if (arg.length == 5) {
                  push()
                  colorMode(arg[4], 255)
                  background(arg[0], arg[1], arg[2], arg[3])
                  pop()
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
            }
            if (arg.length == 2) {
                  let i = get()
                  push()
                  imageMode(CORNER);
                  image(i, arg[0], arg[1])
                  pop()
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
                  rotate(counter(1))
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
 * beginRot3(vel) y endRot() se utilizan
 * juntas
 * 
 * @method beginRot3
 * 1 parametro
 * @param {Number} velr       velocidad rotacion en x,y,z
 * 3 parametros
 * @param {Number} velx       velocidad rotacion
 * @param {Number} vely       velocidad rotacion
 * @param {Number} velz       velocidad rotacion
 * 4 parametros
 * @param {Number} velr       velocidad rotacion en x,y,z
 * @param {Number} centrox    punto ancla de referencia x
 * @param {Number} centroy    punto ancla de referencia y
 * @param {Number} centroz    punto ancla de referencia z
 * 6 parametros
 * @param {Number} velx       velocidad rotacion
 * @param {Number} vely       velocidad rotacion
 * @param {Number} velz       velocidad rotacion
 * @param {Number} centrox    punto ancla de referencia x
 * @param {Number} centroy    punto ancla de referencia y
 * @param {Number} centroz    punto ancla de referencia z
 */
if (!p5.prototype.hasOwnProperty('beginRot3')) {
      p5.prototype.beginRot3 = function () {
            let arg = arguments;
            if (arg.length == 0) {
                  push();
                  //translate(width / 2, height / 2);
                  rotateX(counter())
                  rotateY(counter())
                  rotateZ(counter())
                  //translate(-width / 2, -height / 2);
            }
            if (arg.length == 1) {
                  push();
                  rotateX(arg[0])
                  rotateY(arg[0])
                  rotateZ(arg[0])
            }
            if (arg.length == 3) {
                  push();
                  rotateX(arg[0])
                  rotateY(arg[1])
                  rotateZ(arg[2])
            }
            if (arg.length == 4) {
                  push();
                  translate(arg[1], arg[2], arg[3]);
                  rotateX(arg[0])
                  rotateY(arg[0])
                  rotateZ(arg[0])
                  translate(-arg[1], -arg[2], -arg[3]);
            }
            if (arg.length == 6) {
                  push();
                  translate(arg[3], arg[4], arg[5]);
                  rotateX(arg[0])
                  rotateY(arg[1])
                  rotateZ(arg[2])
                  translate(-arg[3], -arg[4], -arg[5]);
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

if (!p5.prototype.hasOwnProperty('ZOOM_SCALE')) {
      p5.prototype.ZOOM_SCALE = 1;
}
if (!p5.prototype.hasOwnProperty('zoom')) {
      p5.prototype.zoom = function () {
            this.s = 1;
            this.c = null
            let arg = arguments;
            if (arg[1] != null) {
                  this.c = arg[1];
            }
            if (arg.length > 0) {
                  let i = get()
                  push()
                  imageMode(CORNER)
                  rectMode(CORNER)
                  translate(width / 2, height / 2)
                  scale(ZOOM_SCALE)
                  translate(-width / 2, -height / 2)
                  image(i, 0, 0)
                  if (this.c) {
                        noFill()
                        stroke(this.c)
                        strokeWeight(10)
                        rect(0, 0, width, height)
                  }
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
            blendMode(BLEND)
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
            blendMode(BLEND)
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
            blendMode(BLEND)
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
            blendMode(BLEND)
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
            blendMode(BLEND)
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
 * Metodo abreviado de la sentencia -> sin((millis()/1000) * TWO_PI [* arg])
 * 
 * @method sinOsc
 * @param {Number}  n          multiplicador frecuencia
 * @return {Number}
 */
if (!p5.prototype.hasOwnProperty('sinOsc')) {
      p5.prototype.sinOsc = function () {
            let arg = arguments
            let freq = (millis() / 1000) * TWO_PI
            if (arg.length == 1) {
                  freq = (millis() / 1000) * arg[0] * TWO_PI
            }
            return Math.sin(freq);
      }
}
/**
 * Metodo abreviado de la sentencia -> cos((millis()/1000) * TWO_PI [* arg])
 * 
 * @method cosOsc
 * @param {Number}  n          multiplicador frecuencia
 * @return {Number}
 */
if (!p5.prototype.hasOwnProperty('cosOsc')) {
      p5.prototype.cosOsc = function () {
            let arg = arguments
            let freq = (millis() / 1000) * TWO_PI
            if (arg.length == 1) {
                  freq = (millis() / 1000) * arg[0] * TWO_PI
            }
            return Math.cos(freq);
      }
}
/**
 * Metodo abreviado de la sentencia -> millis()/1000 [* arg]
 * 
 * @method counter
 * @param {Number} m      multiplicador
 */
if (!p5.prototype.hasOwnProperty('counter')) {
      p5.prototype.counter = function () {
            let arg = arguments
            let count = millis() / 10000
            if (arg.length == 1) {
                  count = millis() / 1000 * arg[0]
            }
            return count;
      }
}
/**
 * Metodo carga un archivo js externo
 * el archivo debe se guardado dentro de un
 * directorio con el mismo nombre ej. snippets/leparc/leparc.js
 * 
 * @method snip
 * @param {String} name      nombre del archivo sin extension .js
 */
if (!p5.prototype.hasOwnProperty('snip')) {
      p5.prototype.snip = function (name, fn = null) {
            let path = Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'snippets', name, name + '.js')
            try {
                  // verifica si ya se cargo la libreria
                  if (!lp.snippets.includes(name.trim())) {
                        loadStrings(path, (data) => {
                              let code = '';
                              console_msg(lang_msg.snip + name, 'info')
                              for (let i = 0; i < data.length; i++) {
                                    code += data[i] + '\n';
                              }
                              try {
                                    new Function(Lp5.doGlobals("'use strict';" + code))();
                                    lp.snippets.push(name.trim())
                                    if (typeof fn == 'function') {
                                          fn()
                                    }
                              } catch (e) {
                                    console_msg(lang_msg.snip_err + name, 'error')
                              }
                        })
                  } else {
                        if (typeof fn == 'function') {
                              fn()
                        }
                  }
            } catch (e) {
                  console_msg('snip(name): ' + e)
            }
      }
}
/**
 * Obtiene la ruta a leparc_resources/snippets/
 * 
 * @method snipPath
 * @param {String} name      nombre de la libreria sin extension .js
 */
if (!p5.prototype.hasOwnProperty('snipPath')) {
      p5.prototype.snipPath = function () {
            let arg = arguments
            if (arg.length == 1) {
                  return Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'snippets', arg[0])
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

/**
 * Obtiene la ruta a leparc_resources/libs/
 * 
 * @method libsPath
 * @param {String} name      nombre del directorio
 */
if (!p5.prototype.hasOwnProperty('libsPath')) {
      p5.prototype.libsPath = function () {
            let arg = arguments

            if (arg.length == 0) {
                  return Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'libs')
            }
            if (arg.length == 1) {
                  return Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'libs', arg[0])
            }
            return null;
      }
}

/**
 * Carga con require la ruta a leparc_resources/libs/
 * 
 * @method loadLib
 * @param {String} name      nombre del directorio
 * 
 * example:
 * 
 * $milib = loadLib("milib.js")
 */
if (!p5.prototype.hasOwnProperty('loadLib')) {
      p5.prototype.loadLib = function () {
            let arg = arguments
            if (arg.length == 1) {
                  return require(libsPath(arg[0]))
            }
            return null;
      }
}

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
                  console_msg(lang_msg.cam_init, 'info');
                  if (arg.length == 0) {
                        ___webcam = createCapture(VIDEO, () => {
                              ___webcam.size(320, 240);
                              ___webcam.hide()
                              console_msg(lang_msg.cam_loaded, 'info');
                        });
                  }
                  if (arg.length == 2) {
                        ___webcam = createCapture(VIDEO, () => {
                              ___webcam.size(arg[0], arg[1]);
                              ___webcam.hide()
                              console_msg(lang_msg.cam_loaded, 'info');
                        });
                  }
            } else {
                  console_msg('useCam() ' + lang_msg.local_server_mode, 'warning');
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
                  if (___webcam.loadedmetadata) {
                        if (arg.length == 1 && ___webcam != null) {
                              arg[0].push()
                              // https://github.com/processing/p5.js/issues/1087
                              // tint // noTint issue -> loadPixels() fix it 
                              ___webcam.loadPixels()
                              arg[0].image(___webcam, 0, 0)
                              arg[0].pop()
                        }
                        if (arg.length == 2 && ___webcam != null) {
                              push()
                              translate(arg[0], arg[1])
                              ___webcam.loadPixels()
                              image(___webcam, 0, 0)
                              pop()
                        }
                        if (arg.length == 3 && ___webcam != null) {
                              arg[0].push()
                              arg[0].translate(arg[1], arg[2])
                              ___webcam.loadPixels()
                              arg[0].image(___webcam, 0, 0)
                              arg[0].pop()
                        }
                  }
            } else {
                  console_msg('useCam() ' + lang_msg.local_server_mode, 'warning');
            }
      }
}

/**
 * Metodo que devuelve la captura
 * 
 * @method imgCam
 * @return image
 */

if (!p5.prototype.hasOwnProperty('imgCam')) {
      p5.prototype.imgCam = function () {

            if (Lp5.mode == 'SERVER' || Lp5.mode == 'LOCAL') {
                  let arg = arguments;
                  if (___webcam == null) {
                        console_msg('useCam() no esta declarado')
                  }
                  // https://github.com/processing/p5.js/issues/1087
                  // tint // noTint issue -> loadPixels() fix it 
                  ___webcam.loadPixels()
                  return ___webcam
            } else {
                  console_msg('useCam() ' + lang_msg.local_server_mode, 'warning');
                  return null
            }
            return null
      }
}

/**
 * Limpia el bloque draw()
 * 
 * @method clearDraw
 */

if (!p5.prototype.hasOwnProperty('clearDraw')) {
      p5.prototype.clearDraw = function () {
            Lp5.validCodeDraw = ''
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
                  console_msg('useAudio() ' + lang_msg.local_server_mode, 'warning');
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
                  console_msg('audioVol() ' + lang_msg.local_server_mode, 'warning');
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
                        console_msg('audioBeat() -> useAudio() ' + lang_msg.not_declared)
                        return null;
                  }
            } else {
                  console_msg('audioBeat() ' + lang_msg.local_server_mode, 'warning');
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
                        console_msg('audioEnergy() -> useAudio() ' + lang_msg.not_declared)
                        return null;
                  }
            } else {
                  console_msg('audioEnergy() ' + lang_msg.local_server_mode, 'warning');
            }
      }
}

// /**
//  * Crea un canvas
//  * Recarga la pantalla
//  * 
//  * @method useRender
//  */
// if (!p5.prototype.hasOwnProperty('useRender')) {
//       p5.prototype.useRender = function () {
//             let arg = arguments

//             let r = P2D

//             if (arg.length == 0) {
//                   console_msg('arg missing WEBGL or P2D')
//             }
//             if (arg.length == 1) {
//                   r = arg[0]
//                   Lp5.canvas = createCanvas(windowWidth, windowHeight, r)
//                   Lp5.renderer = arg[0]
//             }
//             if (arg.length == 3) {
//                   r = arg[3]
//                   Lp5.canvas = createCanvas(arg[0], arg[1], r)
//                   Lp5.renderer = WEBGL
//             }
//             if (arg.length > 0) {
//                   if (r == WEBGL) {
//                         ___webgl = true
//                         Lp5.el('lp5-os-r').style.display = 'inline'
//                   } else {
//                         ___webgl = false
//                         Lp5.el('lp5-os-r').style.display = 'one'
//                   }
//             }
//       }
// }

/**
 * Emite un trigger -> true cada n fotogramas
 * 
 * @method pulse
 * @param {Number} _each      numero en fotogramas
 */
if (!p5.prototype.hasOwnProperty('pulse')) {
      p5.prototype.pulse = function (_each) {
            if (frameCount % _each == 0) {
                  return true
            } else {
                  return false
            }
      }
}

/**
 * Emite un trigger -> true cada n millis
 * 
 * @method tpulse
 * @param each {Number}
 * @param gate {Number}
 */
if (!p5.prototype.hasOwnProperty('tpulse')) {
      p5.prototype.tpulse = function (_t = 500, _g = 100, _of = 0) {
            if (_t < 10) _t = 10
            if (_g < 20) _g = 20
            if (_of < 0) _of = 0
            if (Math.floor((millis() + _of) / _t * 2 % _t) % 2 == 0 && Math.floor(millis() + _of) % _t < _g) {
                  return true
            } else {
                  return false
            }
      }
}
/**
 * Contador en n tiempo / n time counter
 * 
 * @method trange
 * @param elements {Number}
 * @param time {Number}
 */
if (!p5.prototype.hasOwnProperty('trange')) {
      p5.prototype.trange = function (_n = 10, _t = 1000) {
            if (_t < 10) _t = 10
            if (_n < 1) _n = 1
            return Math.floor(millis() / _t * _n % _t) % _n
      }
}
/**
 * Contador en n tiempo / n time counter
 * 
 * @method frange
 * @param elements {Number}
 * @param time {Number}
 * @param fn {Function}
 */
if (!p5.prototype.hasOwnProperty('frange')) {
      p5.prototype.frange = function (_n = 10, _t = 1000, fn = null) {
            if (_t < 10) _t = 10
            if (_n < 1) _n = 1
            let i = Math.floor(millis() / _t * _n % _t) % _n
            if (typeof fn == 'function') {
                  fn(i)
            }
      }
}
/**
 * Emite un trigger -> true cada n fotogramas y duracion
 * 
 * @method gate
 * @param {Number} _cycle      numero en fotogramas
 * @param {Number} _duration   numero en fotogramas que dura abierto
 */
if (!p5.prototype.hasOwnProperty('gate')) {
      p5.prototype.gate = function (_cycle, _duration) {
            if (frameCount % _cycle > _cycle - _duration) {
                  return true
            } else {
                  return false
            }
      }
}

/**
 * Setea pixel
 * 
 * @method setPixel
 * 3 param
 * @param {Number} x      posicion x
 * @param {Number} y      posicion y
 * @param {Number} c      color (BN)
 * 4 param
 * @param {Number} x      posicion x
 * @param {Number} y      posicion y
 * @param {Number} c      color (BN)
 * @param {Number} a      alpha
 * 5 param
 * @param {Number} x      posicion x
 * @param {Number} y      posicion y
 * @param {Number} r      red/rojo
 * @param {Number} g      green/verde
 * @param {Number} b      blue/azul
 * 6 param
 * @param {Number} x      posicion x
 * @param {Number} y      posicion y
 * @param {Number} r      red/rojo
 * @param {Number} g      green/verde
 * @param {Number} b      blue/azul
 * @param {Number} a      alpha
 */
if (!p5.prototype.hasOwnProperty('setPixel')) {
      p5.prototype.setPixel = function () {
            let arg = arguments
            if (arg.length == 3) {
                  let x = arg[0]
                  let y = arg[1]
                  let c = arg[2]
                  let i = (int(x) + int(y) * width) * 4
                  pixels[i] = c
                  pixels[i + 1] = c
                  pixels[i + 2] = c
                  pixels[i + 3] = 255
            }
            if (arg.length == 4) {
                  let x = arg[0]
                  let y = arg[1]
                  let c = arg[2]
                  let a = arg[3]
                  let i = (x + y * width) * 4
                  pixels[i] = c
                  pixels[i + 1] = c
                  pixels[i + 2] = c
                  pixels[i + 3] = a
            }
            if (arg.length == 5) {
                  let x = arg[0]
                  let y = arg[1]
                  let r = arg[2]
                  let g = arg[3]
                  let b = arg[4]
                  let i = (x + y * width) * 4
                  pixels[i] = r
                  pixels[i + 1] = g
                  pixels[i + 2] = b
                  pixels[i + 3] = 255
            }
            if (arg.length == 6) {
                  let x = arg[0]
                  let y = arg[1]
                  let r = arg[2]
                  let g = arg[3]
                  let b = arg[4]
                  let a = arg[5]
                  let i = (x + y * width) * 4
                  pixels[i] = r
                  pixels[i + 1] = g
                  pixels[i + 2] = b
                  pixels[i + 3] = a
            }
      }
}

/**
 * Obtiene el codigo / Get text code
 * 
 * @method getCode
 */
if (!p5.prototype.hasOwnProperty('getCode')) {
      p5.prototype.getCode = function () {
            let code = Lp5.cmAux.getValue()
            return code
      }
}
/**
 * ----------------------
 * 
 * @method -------------
 */
if (!p5.prototype.hasOwnProperty('___shader')) {
      p5.prototype.___shader = null
}
if (!p5.prototype.hasOwnProperty('___createShader')) {
      p5.prototype.___createShader = function () {
            let frag = Lp5.cmFrag.getValue()
            let vert = Lp5.cmVert.getValue()
            ___shader = createShader(vert, frag)
      }
}
if (!p5.prototype.hasOwnProperty('getShader')) {
      p5.prototype.getShader = function () {
            return ___shader
      }
}
/**
 * Eventos key
 */
/*if (!p5.prototype.hasOwnProperty('keyPressed')) {
      p5.prototype.keyPressed = null
}
if (!p5.prototype.hasOwnProperty('keyReleased')) {
      p5.prototype.keyReleased = null
}*/