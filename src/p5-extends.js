// Extends p5js -------------------------------------
/**
 * Funcionalidades que extienden p5js
 */
// --------------------------------------------------
/**
 * Setea el ancho y alto de la ventana (electron)
 * @method winSize
 * @param {Number} w          ancho
 * @param {Number} h          alto
 */
p5.prototype.winSize = function (w, h) {
      Dp5.main.resizeWin(w, h)
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


/**
 * Fundido
 * @method fade
 * @param {Number} c          color
 * @param {Number} a          alfa
 */
p5.prototype.fade = function () {
      let arg = arguments;
      if (arg.length == 1) {
            push()
            colorMode(RGB, 255)
            noStroke()
            rectMode(CORNER)
            fill(0, arg[0])
            rect(0, 0, width, height)
            pop()
      }
      if (arg.length == 2) {
            push()
            noStroke()
            rectMode(CORNER)
            fill(arg[0], arg[1])
            rect(0, 0, width, height)
            pop()
      }
}

/**
 * Variacion de elleipse()
 * @method circle
 * @param {Number} x          posicion x
 * @param {Number} y          posicion y
 * @param {Number} d          diametro
 */
p5.prototype.circle = function () {
      let arg = arguments;
      if (arg.length == 3) {
            ellipse(arg[0], arg[1], arg[2], arg[2])
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

/**
 * beginRot(vel) y endRot() se utilizan
 * juntas
 * 
 * @method beginRot
 * 1 parametro
 * @param {Number} velr       velocidad rotacion en radianes
 * 3 parametros
 * @param {Number} velr       velocidad rotacion en radianes
 * @param {Number} centrox    punto ancla de referencia x
 * @param {Number} centroy    punto ancla de referencia y
 */
p5.prototype.beginRot = function () {
      let arg = arguments;
      if (arg.length == 1) {
            push();
            translate(width / 2, height / 2);
            rotate(arg[0])
            translate(-width / 2, -height / 2);
      }
      if (arg.length == 3) {
            push();
            translate(arg[1], arg[2]);
            rotate(arg[0])
            translate(-arg[1], -arg[2]);
      }
}

/**
 * beginRot(vel) y endRot() se utilizan
 * juntas
 * 
 * @method endRot
 */
p5.prototype.endRot = function () {
      pop();
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

/**
 * Efecto de espejo sobre eje de Y
 * 
 * @method mirrorY
 */
p5.prototype.mirrorY = function () {
      let i = get(0, 0, width / 2, height);
      push()
      imageMode(CORNER)
      translate(width, 0)
      scale(-1, 1)
      image(i, 0, 0)
      pop()
}

/**
 * Efecto de espejo sobre eje de X
 * 
 * @method mirrorX
 */
p5.prototype.mirrorX = function () {
      let i = get(0, 0, width, height / 2);
      push()
      imageMode(CORNER)
      translate(0, height)
      scale(1, -1)
      image(i, 0, 0)
      pop()
}

/**
 * Efecto de caleidoscopio 4 caras
 * 
 * @method kaleido
 * 
 * TODO: no utilizar mirror, es redundante en el corte de la imagen
 * y quita recursos
 */
p5.prototype.kaleido = function () {
      let i = get(0, 0, width / 2, height / 2);
      push()
      translate(0, 0)
      translate(width - 1, 0)
      scale(-1, 1)
      image(i, 0, 0)
      pop()

      push()
      translate(0, 0)
      translate(0, height - 1)
      scale(1, -1)
      image(i, 0, 0)
      pop()

      push()
      translate(0, 0)
      translate(width - 1, height - 1)
      scale(-1, -1)
      image(i, 0, 0)
      pop()

}

/**
 * Metodo abreviado de la sentencia -> sin(frameCount * n)
 * 
 * @method osc
 * @param {Number} n          multiplicador para reducir frecuencia
 * @param {Number}  amp        amplitud
 */
p5.prototype.osc = function () {
      let arg = arguments
      let freq = 1
      let amp = 1
      if (arg.length == 1) {
            freq = frameCount * 0.01
            amp = arg[0]
      }
      if (arg.length == 2) {
            freq = frameCount * arg[1]
            amp = arg[0]
      }
      return sin(freq) * amp;
}
/**
 * Metodo abreviado de la sentencia -> frameCount * n
 * 
 * @method freq
 * @param {Number} m      multiplicador para reducir frameCount
 */
p5.prototype.freq = function () {
      let arg = arguments
      let freq
      if (arg.length == 1) {
            freq = arg[0]
            return frameCount * arg[0]
      }
      return 1;
}

/**
 * Metodo carga un archivo js externo
 * el archivo debe se guardado dentro de un
 * directorio con el mismo nombre ej. duchamp/duchamp.js
 * 
 * @method useLib
 * @param {String} name      nombre del archivo sin extension .js
 */
p5.prototype.useLib = function (name) {
      let path = Dp5.main.savePath() + '/duchamplc-resources/libs/' + name + '/' + name + '.js'
      loadStrings(path, (data) => {
            let code = '';
            for (let i = 0; i < data.length; i++) {
                  code += data[i] + '\n';
            }
            try {
                  new Function(code)();
            } catch (e) {
                  $('#console-out').html('useLib(name) -> problemas para cargar:' + name);
            }
      })
}

/**
 * Obtiene la ruta a duchamplc-resources/libs/
 * 
 * @method libPath
 * @param {String} name      nombre de la libreria sin extension .js
 */
p5.prototype.libPath = function () {
      let arg = arguments
      if (arg.length == 1) {
            return Dp5.main.savePath() + '/duchamplc-resources/libs/' + arg[0] + '/'
      }
      return null;
}

/**
 * Obtiene la ruta a duchamplc-resources/images/
 * 
 * @method imgsPath
 * @param {String} name      nombre del directorio
 */
p5.prototype.imgPath = function () {
      let arg = arguments

      if (arg.length == 0) {
            return Dp5.main.savePath() + '/duchamplc-resources/images/'
      }
      if (arg.length == 1) {
            return Dp5.main.savePath() + '/duchamplc-resources/images/' + arg[0] + '/'
      }
      return null;
}
p5.prototype.img = function (i, fn) {
      loadImage(Dp5.main.savePath() + '/duchamplc-resources/images/' + i, (__img) => {
            if (typeof fn == 'function') {
                  fn(__img)
            }
      })
}

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
//             $('#console-out').html('Se requieren 3 argumentos -> pic(index,x,y)');
//       }
// }
// p5.prototype.useIBank = function () {
//       let arg = arguments
//       if (arg.length == 1) {
//             Dp5.imagesBankPath[arg[0]] = Dp5.main.savePath() + '/duchamplc-resources/images/' + arg[0] + '/'
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

p5.prototype.useCam = function () {
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
}

/**
 * Metodo que imprime la captura
 * 
 * @method getCam
 * @param {Number} x      posicion en x
 * @param {Number} y      posicion en y
 */
p5.prototype.getCam = function () {
      let arg = arguments;
      if (___webcam == null) {
            $('#console-out').html('useCam() no esta declarado');
      }
      if (arg.length == 2 && ___webcam != null) {
            push()
            translate(arg[0], arg[1])
            image(___webcam, 0, 0)
            pop()
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
p5.prototype.___audio = null

/**
 * Propiedad que almacena la instancia de FFT
 * 
 * @property ___fft
 * 
 */
p5.prototype.___fft = null

/**
 * Metodo que inicializa la clase Audio
 * 
 * @method useAudio
 * @param {Number} source           fuente/source 0,1,2,n.. depende del hardware
 * @param {Number} smoothing        suavizado en el analisis new p5.FFT([smoothing], [bins])
 */
p5.prototype.useAudio = function (source = 0, smoothing = 0.3) {
      ___audio = new p5.AudioIn()
      ___fft = new p5.FFT(smoothing)
      ___audio.start()
      ___audio.getSources(function (deviceList) {
            if (deviceList.length > 0) {
                  ___audio.setSource(source)
                  ___fft.setInput(___audio)
            } else {
                  $('#console-out').html('No hay fuentes disponibles o configuradas');
            }
      })
}

/**
 * Metodo que obtiene el volume
 * 
 * @method audioVol
 */
p5.prototype.audioVol = function () {

      if (___fft != null && ___audio != null) {
            return ___audio.getLevel()
      } else {
            $('#console-out').html('getVolume() -> linein() no esta declarado');
            return null;
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
p5.prototype.audioBeat = function (band) {
      if (___fft != null && ___audio != null) {
            let spectrum = ___fft.analyze(128, 'db');
            if (band > spectrum.length) band = spectrum.length
            return spectrum[band] + 140
      } else {
            $('#console-out').html('audioBeat() -> useAudio() no esta declarado');
            return null;
      }
}

/**
 * Devuelve la energia (volume) del rango de frecuencias
 * 
 * @method audioEnergy
 * @param {Number} fq1 frecuencia 1
 * @param {Number} fq2 frecuencia 2
 */
p5.prototype.audioEnergy = function (f1, f2 = null) {
      if (___fft != null && ___audio != null) {
            f2 = (f2 == null) ? f1 : f2
            ___fft.analyze();
            return ___fft.getEnergy(f1, f2)
      } else {
            $('#console-out').html('audioEnergy() -> useAudio() no esta declarado');
            return null;
      }
}