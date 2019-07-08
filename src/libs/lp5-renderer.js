/**
 * lp5-rederer.js
 *  
 */


// Global var scope --------------------------------------------
if (!global.hasOwnProperty('lp')) {
      global.lp = {
            snippets: []
      }
} else {
      console.trace('no se pudo crear el objeto global "lp"')
}
// Init
window.addEventListener('load', function () {
      // Extends --------------------------------------------
      try {
            require(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'extends', 'lp-extends.js'))
      } catch (e) {
            console.trace('No se pudo cargar lp-extends.js')
      }
      // ----------------------------------------------------
      setInterval(() => {
            // Memoria
            Lp5.el('lp5-os-ram').innerText = '| free ram:' + Lp5.main.getMemory() + "%";
      }, 2000)
      setInterval(() => {
            // FPS
            let osfps = Math.round(Lp5.fps);
            if (!Lp5.looping) osfps = '<span class="info">NO LOOP</span>'
            Lp5.el('lp5-os-fps').innerHTML = '| fps:' + osfps;
      }, 500)
      Lp5.toggleModal('cnf')

      // // Servidor ---------------------------
      Lp5.serverRq = require('./libs/server.js')
      // // Cliente ----------------------------
      Lp5.clientRq = require('./libs/client.js')
      // IP ------------------------------------
      Lp5.IP = Lp5.main.getIP()
      Lp5.el('lp5-os-ip').innerText = '| ip:' + Lp5.IP;
      // Tit -----------------------------------
      document.title = 'LeParc - livecoder - P5js - v' + Lp5.version
      // Lang ----------------------------------
      if (localStorage.lang == 'es') {
            Lp5.el('cnf-lang').options[0].selected = true
      }
      if (localStorage.lang == 'en') {
            Lp5.el('cnf-lang').options[1].selected = true
      }
      // Num lineas-----------------------------
      if (localStorage.linenumbers == null) {
            localStorage.linenumbers = 1;
      }
      if (localStorage.linenumbers == 1) {
            Lp5.el('cnf-linenumbers').checked = true
      } else {
            Lp5.el('cnf-linenumbers').checked = false
      }
      if (Lp5.main.globalSettings().renderer == 'webgl') {
            Lp5.el('lp5-os-r').style.display = 'inline'
            Lp5.el('cnf-render').options[1].selected = true
      } else {
            Lp5.el('lp5-os-r').style.display = 'none'
            Lp5.el('cnf-render').options[0].selected = true
      }
      // -------------------------------------------------------------------------------
      // Code mirror ------------------------------------------------------------------- 
      Lp5.cmAux = CodeMirror(Lp5.codeAux, {
            mode: "javascript",
            matchBrackets: true,
            lineNumbers: (localStorage.linenumbers == 1) ? true : false
      });
      Lp5.cmAux.on('change', function (cm, ob) {
            if (Lp5.renderCodeAux != Lp5.doGlobals("'use strict';" + cm.getValue())) {
                  Lp5.historyChangesAux = 1
                  Lp5.el('lp5-aux').parentElement.classList.add('change');
            } else {
                  Lp5.el('lp5-aux').parentElement.classList.remove('change');
            }
      })

      // Init cursor
      Lp5.pannelFocus('aux')
});
// ********************************************************************
// ********************************************************************
// P5js ***************************************************************
// ********************************************************************
// p5.disableFriendlyErrors = true;
function preload() {
      //
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'save', 'auxcode.txt'), (file) => {
            Lp5.auxTxt = file
            let atxt = '';
            for (let i = 0; i < Lp5.auxTxt.length; i++) {
                  atxt += Lp5.auxTxt[i] + '\n';
            }
            try {
                  // Lp5.codeAux.innerHTML = Lp5.beautify_js(txt.trim())
                  if (atxt != '') {
                        Lp5.cmAux.setValue(Lp5.beautify_js(atxt.trim()));
                        Lp5.pannelFocus('aux')
                  } else {
                        Lp5.cmAux.setValue('//');
                  }
            } catch (e) {
                  console.trace(e)
            }
      })
      // Cargar config / Load config
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'config', 'config.txt'), (file) => {
            Lp5.cnfTxt = file
            for (let i = 0; i < Lp5.cnfTxt.length; i++) {
                  let vars = Lp5.cnfTxt[i].split('=')
                  if (vars[0] && vars[1]) Lp5.configs[vars[0].trim()] = (vars[1].trim())
            }

            // Checkea si toma muchos recursos y para el loop
            // Check if takes too much resources and stop loop
            let cfps = setInterval(function () {
                  if (getFrameRate() < _targetFrameRate * parseFloat(Lp5.configs['mfr'])) {
                        noLoop()
                        Lp5.looping = false
                  }
            }, 2000)
      })
}
function setup() {
      // WebGl --------------------------------------------
      // Fix default this.pointSize = 5 ?
      p5.RendererGL.prototype.strokeWeight = function (w) {
            if (this.curStrokeWeight !== 0.0001) {
                  this.pointSize = w;
                  this.curStrokeWeight = w;
            }
      };

      // Init setup --------------------------
      if (!Lp5.canvas) {
            Lp5.canvas = createCanvas(windowWidth, windowHeight, Lp5.main.globalSettings().renderer);
      }
      // Webcam/video capture
      if (___webcam) {
            ___webcam.remove()
      }
      ___webcam = null
      // Audio
      if (___audio != null) {
            ___audio.disconnect()
            ___audio = null
            ___fft = null
      }
      blendMode(BLEND)
      setFrameRate(60)
      imageMode(CORNER)
      angleMode(RADIANS)
      rectMode(CORNER)
      ellipseMode(CENTER)
      colorMode(RGB, 255, 255, 255)
      background(0);
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeSetup)();
      } catch (e) {
            console_msg('setup: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }



}
function draw() {
      // FPS
      Lp5.fps = getFrameRate();
      // // Revisar
      if ((Lp5.historyChangesSetup + Lp5.historyChangesDraw + Lp5.historyChangesAux) > 0) {
            Lp5.el('lp5-os-status').classList.add('unsave')
      } else {
            Lp5.el('lp5-os-status').classList.remove('unsave')
      }
      // Clear -------------------------------
      //if (Lp5.cmDraw.getValue().trim() == '') clear()

      // reset -------------------------------
      noTint()
      strokeWeight(1)
      blendMode(BLEND)

      // funciones en WEBGL ----
      try {
            if (___webgl) {
                  // en use3d -> default
                  directionalLight(100, 100, 100, 1, 1, 0)
                  ambientLight(50)
                  colorMode(RGB, 255, 255, 255)
                  ambientMaterial(color(167, 167, 167))
            } else {
                  textLeading(15)
                  textSize(15)
                  textAlign(LEFT, TOP)
                  textStyle(NORMAL)
            }
      } catch (e) {
            //
      }
      // Live --------------------------------
      if (!Lp5.drawOnFly) {
            try {
                  new Function(Lp5.validCodeDraw)()
            } catch (e) {
                  Lp5.el('lp5-console-out').innerHTML = 'draw: ' + e
            }
      } else {
            /**************
             * DRAW ON FLY
             **************/
            if (Lp5.blockData.func == 'draw') {
                  Lp5.renderCodeDraw = Lp5.doGlobals("'use strict';" + Lp5.blockData.code);
            }
            try {
                  let valid = true;
                  let word = '';
                  let render = Lp5.main.globalSettings().renderer
                  let wordList = (render == 'webgl') ? Lp5.prog.draw3d : Lp5.prog.draw
                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i]
                        if (Lp5.renderCodeDraw.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(word))
                              if (!Lp5.renderCodeDraw.match(r)) {
                                    valid = false;
                                    if (render == 'webgl') {
                                          Lp5.el('lp5-console-out').innerHTML = '| draw: ' + word + ' ' + lang_msg.priv_words_render
                                    } else {
                                          Lp5.el('lp5-console-out').innerHTML = '| draw: ' + word + ' ' + lang_msg.priv_words
                                    }
                              }
                        }
                  }
                  // Try eval
                  // Verificar que se ejecuta correctamente
                  try {
                        new Function(Lp5.renderCodeDraw)()
                  } catch (e) {
                        new Function(Lp5.validCodeDraw)()
                        valid = false
                        Lp5.el('lp5-console-out').innerHTML = 'draw: ' + e
                  }
                  if (valid) {
                        Lp5.validCodeDraw = Lp5.renderCodeDraw;
                        Lp5.el('lp5-aux').parentElement.classList.remove('error');
                        Lp5.el('lp5-aux').parentElement.classList.remove('change');
                  } else {
                        Lp5.el('lp5-aux').parentElement.classList.add('error');
                  }
            } catch (e) {
                  Lp5.el('lp5-aux').parentElement.classList.add('error');
                  Lp5.el('lp5-console-out').innerHTML = 'draw: ' + e
                  new Function(Lp5.validCodeDraw)()
            }
      }
}
function mouseMoved() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.mouseMoved)();
      } catch (e) {
            console_msg('mouseMoved: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function mousePressed() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.mousePressed)();
      } catch (e) {
            console_msg('mousePressed: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function mouseReleased() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.mouseReleased)();
      } catch (e) {
            console_msg('mouseReleased: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function mouseClicked() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.mouseClicked)();
      } catch (e) {
            console_msg('mouseClicked: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function doubleClicked() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.doubleClicked)();
      } catch (e) {
            console_msg('doubleClicked: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function mouseDragged() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.mouseDragged)();
      } catch (e) {
            console_msg('mouseDragged: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function mouseWheel() {
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeEvent.mouseWheel)(global);
      } catch (e) {
            console_msg('mouseWheel: ' + e.stack)
            Lp5.el('lp5-aux').parentElement.classList.add('error');
      }
}
function windowResized() {
      try {
            resizeCanvas(windowWidth, windowHeight, true);
            try {
                  new Function(Lp5.validCodeSetup)();
            } catch (e) {
                  console_msg('setup: ' + e.stack)
                  //Lp5.el('lp5-setup').parentElement.classList.add('error');
            }
      } catch (e) {
            console.trace('en resize ' + e);
      }
}
// ********************************************************************
// ********************************************************************
// ********************************************************************

// -----------------------------------------------------
// EVENTS ----------------------------------------------

// -----------------------------------------------------
// AUXILIAR EVENTS -------------------------------------

// Lp5.codeAux.addEventListener('click', (ev) => {
//       // Obtiene la ultima posicion del cursor
//       Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
//       Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
//       //Lp5.panelIndex = 0
//       Lp5.cmFocused = 'aux';
//       Lp5.cmAux.focus()
//       // Obtiene los datos del bloque
//       Lp5.blockData = Lp5.getCodeBlock(Lp5.cmAux, Lp5.cmAuxCp)
// })
Lp5.codeAux.addEventListener('mousedown', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
      Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
      //Lp5.panelIndex = 0
      Lp5.cmFocused = 'aux';
      Lp5.cmAux.focus()
      // Obtiene los datos del bloque
      Lp5.blockData = Lp5.getCodeBlock(Lp5.cmAux, Lp5.cmAuxCp)
})
Lp5.codeAux.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
      Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
      // Obtiene los datos del bloque
      Lp5.blockData = Lp5.getCodeBlock(Lp5.cmAux, Lp5.cmAuxCp)
})
Lp5.codeAux.addEventListener('keydown', (ev) => {
      // Evalua bloque ---------------------------------------------------
      if (ev.ctrlKey && ev.keyCode == 13) {
            if (Lp5.blockData.isFunc) {
                  if (Lp5.blockData.func == 'setup') {
                        Lp5.renderCodeSetup = Lp5.doGlobals("'use strict';" + Lp5.blockData.code)
                        Lp5.evalSetup()
                        Lp5.evalConn('setup')
                  }
                  if (Lp5.blockData.func == 'draw') {
                        Lp5.renderCodeDraw = Lp5.doGlobals("'use strict';" + Lp5.blockData.code)
                        Lp5.evalDraw()
                        Lp5.evalConn('draw')

                  }
                  for (var key in Lp5.renderCodeEvent) {
                        if (Lp5.blockData.func == key) {
                              //Lp5.clearEvts()
                              Lp5.renderCodeEvent[key] = Lp5.doGlobals(Lp5.blockData.code)
                              Lp5.evalEvent(key)
                              Lp5.evalConn('event')
                              break;

                        }
                  }
                  if (Lp5.blockData.func == 'any') {
                        Lp5.renderCodeAux = Lp5.doGlobals("'use strict';" + Lp5.blockData.code)
                        Lp5.evalAux()
                        Lp5.evalConn('any')
                  }
            } else {
                  Lp5.renderCodeAux = Lp5.doGlobals("'use strict';" + Lp5.blockData.code)
                  Lp5.evalAux()
                  Lp5.evalConn('line')
            }
            Lp5.evalLineFx('lp5-aux', Lp5.blockData.lf, Lp5.blockData.lt)
      }
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  Lp5.cmAux.setValue(Lp5.beautify_js(Lp5.cmAux.getValue()))
                  Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: 0 })
            } catch (e) {
                  console.trace(e)
            }
      }
});
// -----------------------------------------------------
// -----------------------------------------------------
// Global keyup event ----------------------------------
document.addEventListener('keyup', (ev) => {
      if (ev.ctrlKey && ev.keyCode == 90) {
            ev.preventDefault();
            return false
      }
      // Fullscreen ----------------------------
      if (ev.keyCode == 122) {
            if (!Lp5.fullscreen) {
                  Lp5.main.setFull();
                  Lp5.fullscreen = true;
            } else {
                  Lp5.main.setUnFull();
                  Lp5.fullscreen = false;
            }
      }
      // Chrome Devtools ----------------------------
      if (ev.keyCode == 121) {
            if (!Lp5.devtools) {
                  Lp5.main.devTools(true);
                  Lp5.devtools = true;
            } else {
                  Lp5.main.devTools(false);
                  Lp5.devtools = false;
            }
      }
      // Recargar
      if (ev.keyCode == 116) {
            Lp5.main.reload();
      }
      // Mostrar/ocultar codigo
      if (ev.ctrlKey && ev.keyCode == 72) {
            if (Lp5.showWin) {
                  Lp5.el('win').style.display = 'none';
                  Lp5.showWin = false;
            } else {
                  //if (localStorage.pannels == 'vert') {
                  Lp5.el('win').style.display = 'block';
                  //Lp5.el('codeblock-resizable').style.width = '100%'
                  //Lp5.el('codeblock').style.width = '100%'
                  Lp5.showWin = true;
            }
      }
      // Exit
      if (ev.keyCode == 27) {
            if (confirm(lang_msg.exit_app)) {
                  Lp5.main.exit();
            }
      }
      Lp5.changeBgLineAlpha()

      // Sockets -------------------------------------
      if (Lp5.mode == 'SERVER') {
            Lp5.server.sendClient(frameCount)
      }
      if (Lp5.mode == 'CLIENT') {
            Lp5.client.sendServer()
      }
      // Node name
      Lp5.nodeName = Lp5.el('cnf-name').value

});
// Global keydown event -----------------------------------
document.addEventListener('keydown', function (ev) {
      // Comment ----------------------
      if (ev.shiftKey && !ev.altKey && ev.ctrlKey && ev.keyCode == 67) {
            ev.preventDefault();
            Lp5.cmAux.toggleComment({
                  lineComment: '//'
            })
      }
      // Format code ----------------------
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  Lp5.cmAux.setValue(Lp5.beautify_js(Lp5.cmAux.getValue()))
                  Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: 0 })
            } catch (e) {
                  console.trace(e)
            }
      }
      // ----------------------------------
      // Config win -----------------------
      if (ev.ctrlKey && ev.keyCode == 9) {
            ev.preventDefault();
            Lp5.toggleModal('cnf')
      }
      // Panic Loop --------------------
      if (ev.ctrlKey && ev.keyCode == 76) {
            if (Lp5.looping) {
                  noLoop()
                  Lp5.looping = false
            } else {
                  loop()
                  Lp5.looping = true
            }
      }
      // Salvar codigo --------------------
      if (ev.ctrlKey && ev.keyCode == 83) {
            Lp5.main.saveCode('auxcode', Lp5.cmAux.getValue())
            Lp5.historyChangesAux = 0
            console_msg(lang_msg.saved)
      }
      if (ev.ctrlKey && ev.keyCode == 90) {
            ev.preventDefault();
            return false
      }
      // Refrescar fondo lineas
      Lp5.changeBgLineAlpha()
})
// Global select event -----------------------------------
document.addEventListener("select", (ev) => {
      if (Lp5.cmAux.hasFocus()) Lp5.cmSelect = new Number(Lp5.cmAux.getSelection())
})
// Global mousewheel event -----------------------------------
document.addEventListener("mousewheel", (ev) => {
      Lp5.blockData = Lp5.getCodeBlock(Lp5.cmAux, Lp5.cmAuxCp)
      if (ev.altKey && ev.ctrlKey) {
            if (Lp5.cmAux.somethingSelected()) {
                  ev.preventDefault()
                  var dir = Math.sign(ev.deltaY);
                  if (!isNaN(Lp5.cmSelect)) {
                        if (dir == 1) {
                              if (ev.shiftKey) {
                                    Lp5.cmSelect -= 0.1
                                    Lp5.cmSelect = parseFloat(Lp5.cmSelect.toFixed(3))
                              } else {
                                    Lp5.cmSelect--
                              }
                        }
                        if (dir == -1) {
                              if (ev.shiftKey) {
                                    Lp5.cmSelect += 0.1
                                    Lp5.cmSelect = parseFloat(Lp5.cmSelect.toFixed(3))
                              } else {
                                    Lp5.cmSelect++
                              }
                        }
                        if (Lp5.cmAux.hasFocus()) Lp5.cmAux.replaceSelection(Lp5.cmSelect.toString(), "around")
                        // Refresca el fondo ya que el el replace se elimina el atributo
                        Lp5.changeBgLineAlpha()
                  }
                  if (Lp5.blockData.func == 'draw') {
                        Lp5.renderCodeDraw = Lp5.doGlobals("'use strict';" + Lp5.blockData.code);
                  }
            }
      }
      if (ev.altKey && !ev.ctrlKey && !ev.shiftKey) {
            ev.preventDefault()
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Lp5.bg_code_alpha -= 0.03;
            }
            if (dir == -1) {
                  Lp5.bg_code_alpha += 0.03;
            }
            if (Lp5.bg_code_alpha < 0.0) {
                  Lp5.bg_code_alpha = 0.0;
            }
            if (Lp5.bg_code_alpha > 1.0) {
                  Lp5.bg_code_alpha = 1.0;
            }
            Lp5.changeBgLineAlpha()
      }
      // Sockets -------------------------------------
      if (Lp5.mode == 'SERVER') {
            Lp5.server.sendClient(frameCount)
            //Lp5.server.setBookmark()
      }
      if (Lp5.mode == 'CLIENT') {
            Lp5.client.sendServer()
            //Lp5.client.setBookmark()
      }
      // ---------------------------------------------
      if (ev.ctrlKey && !ev.altKey && !ev.shiftKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Lp5.scale_st -= 0.1;
            }
            if (dir == -1) {
                  Lp5.scale_st += 0.1;
            }
            if (Lp5.scale_st > 0.05) {
                  Lp5.codeAux.style.fontSize = Lp5.scale_st + "rem";
                  Lp5.codeAux.style.lineHeight = (Lp5.scale_st * 1.7) + "rem";
                  Lp5.cmAux.refresh()

                  Lp5.querySelAll('.lp5-code-parent', (el) => {
                        el.style.paddingLeft = (Lp5.scale_st * 40) + 'px'
                  })


            } else {
                  Lp5.scale_st = 0.05;
            }
      }
});
document.addEventListener('mousedown', (ev) => {

      // Panel resize
      Lp5.mousePressed = true
})
// -----------------------------------------------------
// CONFIGS ----------------------------------------------
Lp5.el('cnf-renderonfly').addEventListener('click', () => {
      if (Lp5.el('cnf-renderonfly').checked) {
            Lp5.drawOnFly = true
      } else {
            Lp5.drawOnFly = false
      }
});
Lp5.el('cnf-sync').addEventListener('click', () => {
      if (Lp5.el('cnf-sync').checked) {
            Lp5.sync = true
      } else {
            Lp5.sync = false
      }
});
Lp5.el('cnf-linenumbers').addEventListener('click', () => {
      if (Lp5.el('cnf-linenumbers').checked) {
            localStorage.linenumbers = 1
            Lp5.cmAux.setOption('lineNumbers', true)
            Lp5.cmSetup.setOption('lineNumbers', true)
            Lp5.cmDraw.setOption('lineNumbers', true)
      } else {
            localStorage.linenumbers = 0
            Lp5.cmAux.setOption('lineNumbers', false)
            Lp5.cmSetup.setOption('lineNumbers', false)
            Lp5.cmDraw.setOption('lineNumbers', false)
      }
});

Lp5.el('cnf-lang').addEventListener('change', () => {
      localStorage.lang = Lp5.el('cnf-lang').value
      Lp5.main.reload()
});
Lp5.el('cnf-render').addEventListener('change', () => {
      Lp5.main.reload(Lp5.el('cnf-render').value)
});
Lp5.el('cnf-server').addEventListener('change', (ev) => {

      switch (Lp5.el('cnf-server').value) {
            case 'LOCAL':
                  Lp5.mode = 'LOCAL'
                  // Close server
                  if (Lp5.server != null) {
                        Lp5.server.close(() => {
                              console.log('close server')
                        })
                        Lp5.server = null
                  }
                  if (Lp5.client != null) {
                        Lp5.client.close(() => {
                              console.log('close client')
                        })
                        Lp5.client = null
                  }

                  break;

            case 'SERVER':
                  Lp5.mode = 'SERVER'
                  if (Lp5.client != null) {
                        Lp5.client.close(() => {
                              console.log('close client')
                        })
                        Lp5.client = null
                  }
                  Lp5.server = Lp5.serverRq
                  Lp5.server.initServer(Lp5)

                  break;

            case 'CLIENT':
                  Lp5.mode = 'CLIENT'
                  if (Lp5.server != null) {
                        Lp5.server.close(() => {
                              console.log('close server')
                        })
                        Lp5.server = null
                  }

                  Lp5.client = Lp5.clientRq
                  Lp5.client.connect(Lp5)
                  break;

      }
});