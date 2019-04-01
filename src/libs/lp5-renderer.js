/**
 * lp5-rederer.js
 * 
 * Objeto Lp5 y todas las funcionalidades (core)
 * 
 */

// -----------------------------------------------------
// LeParc Object --------------------------------------
// -----------------------------------------------------
let Lp5 = {
      // Version
      version: '0.0.5-a',
      // Canvas
      canvas: null,
      // mian.js
      main: require('electron').remote.require('./main'),
      mode: 'LOCAL',
      configs: new Array(),
      // Net
      markers: new Array(),
      IP: null,
      sync: false,
      nodeName: '',
      serverIP: null,
      serverPort: 7777,
      serverRq: null,
      server: null,
      clientRq: null,
      client: null,
      clients: 0,
      // Env
      fullscreen: false,
      devtools: false,
      fps: 0,
      historyChangesSetup: 0,
      historyChangesDraw: 0,
      historyChangesAux: 0,
      drawOnFly: false,
      // Codemirror
      cmFocused: null,
      cmSetup: null,
      cmDraw: null,
      cmAux: null,
      // cmClient:         null,
      cmSetupCp: {
            line: 0,
            ch: 0
      },
      cmDrawCp: {
            line: 0,
            ch: 0
      },
      cmAuxCp: {
            line: 0,
            ch: 0
      },
      panelIndex: 0,
      cmSelect: '',
      // DOM en index.html
      codeSetup: document.getElementById('lp5-setup'),
      codeDraw: document.getElementById('lp5-draw'),
      // codeClient:       document.getElementById('lp5-client'),
      codeAux: document.getElementById('lp5-aux'),
      consoleView: document.getElementById('lp5-console'),
      // Almacena los codigos a evaluar
      isValidCodeAux: true,
      isValidCodeSetup: true,
      isValidCodeDraw: true,
      validCodeDraw: '',
      renderCodeDraw: '',
      validCodeSetup: '',
      renderCodeSetup: '',
      validCodeAux: '',
      renderCodeAux: '',
      setupTxt: '',
      drawTxt: '',
      auxTxt: '',
      // Escala de los campos a
      scale_st: 1,
      scale_dr: 1,
      scale_ax: 1,
      // bg alfa
      bg_code_alpha: 0.4,
      // p5 externas
      setup: null,
      // Mostrar ventanas
      showSetupWin: true,
      showDrawWin: true,
      showAuxWin: true,
      showWin: true,
      // Imagenes
      // imagesBank: new Array(),
      // Funciones
      beautify_js: function (data) {
            let ob = {
                  "indent_size": 1,
                  "indent_char": "\t"
            }
            return js_beautify(data, ob);
      },
      el: function (id) {
            return document.getElementById(id)
      },
      restoreCursor: function (cm, cmc) {
            //cm.focus()
            cm.setCursor({ line: cmc.line, ch: cmc.ch })
      },
      caretEnd(el) {
            let len = el.getValue().length;
            el.setCursor(len)
      },
      addSysName: function (name) {
            this.prog.push(name)
      },
      changeBgLineAlpha: function () {
            let els = document.querySelectorAll(".CodeMirror-line>span")
            for (let i = 0; i < els.length; i++) {
                  els[i].style.backgroundColor = "rgba(0,0,0," + this.bg_code_alpha + ")";
            }
      },
      // Palabras reservadas
      prog: {
            setup: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas'
            ],
            draw: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'use2d',
                  'use3d',
                  'useCam',
                  'useAudio'
            ],
            aux: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'use2d',
                  'use3d',
                  'useCam',
                  'useAudio'
            ]
      },
      checkProgWord: function (_word) {
            return `('|") {0,}${_word} {0,}('|")`
      },
      // hasProgWord: function (_word) {
      //       return `(\n| ){1,}${_word}`
      // },
      evalDraw: function () {
            this.renderCodeDraw = this.cmDraw.getValue();
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < this.prog.draw.length; i++) {
                        word = this.prog.draw[i]
                        if (this.renderCodeDraw.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeDraw.match(r)) {
                                    valid = false;
                                    this.el('lp5-console-out').innerHTML = 'en draw: ' + word + ' no puede ser utilizada en este bloque'
                              }
                        }
                  }
                  // Try eval
                  // Verificar que se ejecuta correctamente
                  try {
                        new Function(this.renderCodeDraw)()
                  } catch (e) {
                        valid = false
                        this.el('lp5-console-out').innerHTML = 'draw: ' + e
                  }
                  if (valid) {
                        this.validCodeDraw = this.renderCodeDraw;
                        this.el('lp5-draw').parentElement.classList.remove('error');
                        this.el('lp5-draw').parentElement.classList.remove('change');
                        this.main.saveCode('draw', this.validCodeDraw)
                        this.historyChangesDraw = 0
                  } else {
                        this.el('lp5-draw').parentElement.classList.add('error');
                  }
            } catch (e) {
                  this.el('lp5-draw').parentElement.classList.add('error');
                  this.el('lp5-console-out').innerHTML = 'draw: ' + e
            }
      },
      evalAux: function () {
            this.renderCodeAux = this.cmAux.getValue();
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < this.prog.aux.length; i++) {
                        word = this.prog.aux[i]
                        if (this.renderCodeAux.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeAux.match(r)) {
                                    valid = false;
                                    this.el('lp5-console-out').innerHTML = 'en aux: ' + word + ' no puede ser utilizada en este bloque'
                              }
                        }
                  }
                  if (valid) {
                        this.validCodeAux = this.renderCodeAux;
                        new Function(this.validCodeAux)();
                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                        this.historyChangesAux = 0
                        this.el('lp5-console-out').innerHTML = ''
                        this.main.saveCode('auxcode', this.validCodeAux)
                  }
            } catch (e) {
                  console.log('en aux: ' + e);
                  this.el('lp5-console-out').innerHTML = 'en aux:' + e
                  this.el('lp5-aux').parentElement.classList.add('error');
            }
      },
      evalSetup: function () {
            this.renderCodeSetup = this.cmSetup.getValue();
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < this.prog.setup.length; i++) {
                        word = this.prog.setup[i];
                        if (this.renderCodeSetup.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeSetup.match(r)) {
                                    valid = false;
                                    this.el('lp5-console-out').innerHTML = 'en setup: ' + word + ' no puede ser utilizada en este bloque'
                              }
                        }
                  }
                  if (valid) {
                        this.validCodeSetup = this.renderCodeSetup;
                        this.el('lp5-setup').parentElement.classList.remove('error');
                        this.el('lp5-setup').parentElement.classList.remove('change');
                        this.el('lp5-console-out').innerHTML = ''
                        this.main.saveCode('setup', this.validCodeSetup)
                        this.historyChangesSetup = 0
                        setup();
                  } else {
                        this.el('lp5-setup').parentElement.classList.add('error');
                  }
            } catch (e) {
                  this.el('lp5-console-out').innerHTML = 'setup: ' + e
                  this.el('lp5-setup').parentElement.classList.add('error');
            }
      },
      // Config
      toggleModal: function (el) {
            if (this.el(el).style.display == 'none') {
                  this.el(el).style.display = 'block'
            } else {
                  this.el(el).style.display = 'none'
            }
      },
      // Modo: CLIENTE-SERVIDOR
      evalConn: function (block) {
            if (this.mode == 'CLIENT') this.client.eval(block)
            if (this.mode == 'SERVER') this.server.eval(block)
      }

}

// Global var scope --------------------------------------------
if (!window.hasOwnProperty('lp')) {
      window.lp = {}
} else {
      console.log('no se pudo crear el objeto global "lp"')
}
// Init
window.addEventListener('load', function () {
      // Extends --------------------------------------------
      try {
            require(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'extends', 'lp-extends.js'))
      } catch (e) {
            console.log('No se pudo cargar lp-extends.js')
      }
      // ----------------------------------------------------
      setInterval(() => {
            // Memoria
            Lp5.el('lp5-os-ram').innerText = '| free ram:' + Lp5.main.getMemory() + "%";
      }, 2000)
      setInterval(() => {
            // FPS
            Lp5.el('lp5-os-fps').innerText = '| fps:' + Math.round(Lp5.fps);
      }, 500)
      Lp5.toggleModal('cnf')

      // // Servidor
      Lp5.serverRq = require('./libs/server.js')
      // // Cliente
      Lp5.clientRq = require('./libs/client.js')
      // IP
      Lp5.IP = Lp5.main.getIP()
      Lp5.el('lp5-os-ip').innerText = '| ip:' + Lp5.IP;
      // Tit
      document.title = 'LeParc - livecoder - P5js - v' + Lp5.version
});

// ********************************************************************
// P5js ***************************************************************
// ********************************************************************
function preload() {
      // try {
      //       console.log(Lp5.main.loadImgsBank())
      // } catch (e) {
      //       console.log(e)
      // }

      // Code mirror
      Lp5.cmSetup = CodeMirror(Lp5.codeSetup, {
            mode: "javascript"
      });
      // Init cursor
      Lp5.cmSetup.focus()
      Lp5.cmSetup.setCursor({ line: 0, ch: 0 })
      //
      Lp5.cmDraw = CodeMirror(Lp5.codeDraw, {
            mode: "javascript"
      });
      //
      Lp5.cmAux = CodeMirror(Lp5.codeAux, {
            mode: "javascript"
      });
      //
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'save', 'setup.txt'), (file) => {
            Lp5.setupTxt = file
            let txt = '';
            for (let i = 0; i < Lp5.setupTxt.length; i++) {
                  txt += Lp5.setupTxt[i] + '\n';
            }
            try {
                  // Lp5.codeSetup.innerText = Lp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Lp5.cmSetup.setValue(Lp5.beautify_js(txt.trim()));
                  } else {
                        Lp5.cmSetup.setValue(' ');
                  }
                  // Carga en setup
                  // Lp5.renderCodeSetup = txt.trim()
                  // Llama a setup
                  // setup()
            } catch (e) {
                  console.log(e)
            }

      })
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'save', 'draw.txt'), (file) => {
            Lp5.drawTxt = file
            let txt = '';
            for (let i = 0; i < Lp5.drawTxt.length; i++) {
                  txt += Lp5.drawTxt[i] + '\n';
            }
            try {
                  // Lp5.codeDraw.innerHTML = Lp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Lp5.cmDraw.setValue(Lp5.beautify_js(txt.trim()));
                  } else {
                        Lp5.cmSetup.setValue(' ');
                  }
                  // Lp5.renderCodeDraw = txt.trim()
            } catch (e) {
                  console.log(e)
            }
      })
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'save', 'auxcode.txt'), (file) => {
            Lp5.auxTxt = file
            let txt = '';
            for (let i = 0; i < Lp5.auxTxt.length; i++) {
                  txt += Lp5.auxTxt[i] + '\n';
            }
            try {
                  // Lp5.codeAux.innerHTML = Lp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Lp5.cmAux.setValue(Lp5.beautify_js(txt.trim()));
                  } else {
                        Lp5.cmSetup.setValue(' ');
                  }
            } catch (e) {
                  console.log(e)
            }
      })
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'config', 'config.txt'), (file) => {
            Lp5.cnfTxt = file
            for (let i = 0; i < Lp5.cnfTxt.length; i++) {
                  let vars = Lp5.cnfTxt[i].split('=')
                  if (vars[0] && vars[1]) Lp5.configs[vars[0].trim()] = (vars[1].trim())
            }
      })
}
function setup() {
      // Init setup --------------------------
      Lp5.canvas = createCanvas(windowWidth, windowHeight, Lp5.main.globalSettings().renderer);
      // Webcam/video capture
      ___webcam = null;
      // Audio
      if (___audio != null) {
            ___audio.disconnect()
            ___audio = null
            ___fft = null
      }
      // reset -------------------------------
      try {
            if (!___webgl) blendMode(NORMAL)
      } catch (e) {
            //
      }
      setFrameRate(60)
      imageMode(CORNER)
      angleMode(RADIANS)
      rectMode(CORNER)
      ellipseMode(CENTER)
      background(0);
      colorMode(RGB, 255, 255, 255)
      lp = {}
      // Live --------------------------------
      try {
            new Function(Lp5.validCodeSetup)();
      } catch (e) {
            console_msg('setup: ' + e.stack)
      }



}
function draw() {
      // FPS
      Lp5.fps = getFrameRate();
      // reset -------------------------------
      noTint()
      // funciones no soportadas en WEBGL ----
      try {
            if (!___webgl) { 
                  blendMode(NORMAL) 
            } else {
                  // en use3d
                  // ambientLight(0, 0)
                  // directionalLight(color(0,0,0,0), 0, 0, 0)
                  // ambientMaterial(color(167,167,167))
            }
      } catch (e) {
            //
      }
      // Live --------------------------------
      if (!Lp5.drawOnFly) {
            try {
                  new Function(Lp5.validCodeDraw)()
            } catch (e) {
                  console_msg('draw: ' + e)
            }
      } else {
            /**************
             * DRAW ON FLY
             **************/
            Lp5.renderCodeDraw = Lp5.cmDraw.getValue();
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Lp5.prog.draw.length; i++) {
                        word = Lp5.prog.draw[i];
                        if (Lp5.renderCodeDraw.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(word))
                              if (!Lp5.renderCodeDraw.match(r)) {
                                    valid = false;
                                    Lp5.el('lp5-console-out').innerHTML = 'en draw: ' + word + ' no puede ser utilizada en este bloque'
                              }
                        }
                  }
                  // Try eval
                  //Verificar que se ejecuta correctamente
                  try {
                        new Function(Lp5.renderCodeDraw)()
                  } catch (e) {
                        new Function(Lp5.validCodeDraw)()
                        valid = false
                        Lp5.el('lp5-console-out').innerHTML = 'draw: ' + e
                  }
                  if (valid) {
                        Lp5.validCodeDraw = Lp5.renderCodeDraw;
                        Lp5.el('lp5-draw').parentElement.classList.remove('error');
                        Lp5.el('lp5-draw').parentElement.classList.remove('change');
                  } else {
                        Lp5.el('lp5-draw').parentElement.classList.add('error');
                  }
            } catch (e) {
                  Lp5.el('lp5-draw').parentElement.classList.add('error');
                  Lp5.el('lp5-console-out').innerHTML = 'draw: ' + e
            }
      }
}
function windowResized() {
      try {
            resizeCanvas(windowWidth, windowHeight, true);
            //setup();
            //Lp5.evalAux()
      } catch (e) {
            console.log('en resize ' + e);
      }
}
// ********************************************************************
// ********************************************************************
// ********************************************************************

// -----------------------------------------------------
// EVENTS ----------------------------------------------

// -----------------------------------------------------
// AUXILIAR EVENTS -------------------------------------

Lp5.codeAux.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
      Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
      Lp5.panelIndex = 2

      Lp5.cmFocused = 'aux';
})
Lp5.codeAux.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
      Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
})
Lp5.codeAux.addEventListener('keydown', (ev) => {

      // Verifica si hubo cambios
      if (Lp5.validCodeAux != Lp5.cmAux.getValue()) {
            //Lp5.el('aux-change').innerHTML = '*&nbsp;&nbsp;';
            Lp5.historyChangesAux = 1
            Lp5.el('lp5-aux').parentElement.classList.add('change');
      } else {
            //Lp5.el('aux-change').innerHTML = '';
            Lp5.historyChangesAux = 0
            Lp5.el('lp5-aux').parentElement.classList.remove('change');
      }
      // Evalua linea ---------------------------------------------------
      if (ev.altKey && ev.keyCode == 13) {
            Lp5.renderCodeAux = Lp5.cmAux.getLine(Lp5.cmAuxCp.line)
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Lp5.prog.aux.length; i++) {
                        word = Lp5.prog.aux[i];
                        if (Lp5.renderCodeAux.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(Lp5.prog.aux[i]))
                              if (!Lp5.renderCodeAux.match(r)) {
                                    valid = false;
                                    Lp5.el('lp5-console-out').innerHTML = 'en aux: ' + word + ' no puede ser utilizada en este bloque';
                              }
                        }
                  }
                  if (valid) {
                        Lp5.validCodeAux = Lp5.renderCodeAux;
                        new Function(Lp5.validCodeAux)();
                        Lp5.el('lp5-aux').parentElement.classList.remove("error");
                        Lp5.el('lp5-aux').parentElement.classList.remove('change');
                        Lp5.el('lp5-console-out').innerHTML = '';
                  }
            } catch (e) {
                  console.log('en aux eval ' + e);
                  Lp5.el('lp5-console-out').innerHTML = 'en aux: ' + e
                  Lp5.el('lp5-aux').parentElement.classList.add('error');
            }
      }
      // Evalua bloque ---------------------------------------------------
      if (ev.ctrlKey && ev.keyCode == 13) {
            Lp5.evalAux()
            Lp5.evalConn('aux')
      }
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  Lp5.cmAux.setValue(Lp5.beautify_js(Lp5.cmAux.getValue()))
                  Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: 0 })
            } catch (e) {
                  console.log(e)
            }
      }
});
Lp5.codeAux.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey && !ev.altKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Lp5.scale_ax -= 0.1;
            }
            if (dir == -1) {
                  Lp5.scale_ax += 0.1;
            }
            if (Lp5.scale_ax > 0.05) {
                  Lp5.codeAux.style.fontSize = Lp5.scale_ax + "rem";
                  Lp5.codeAux.style.lineHeight = (Lp5.scale_ax * 1.4) + "rem";
                  Lp5.cmAux.refresh()
            } else {
                  Lp5.scale_ax = 0.05;
            }
      }
});
// -----------------------------------------------------
// SETUP EVENTS ----------------------------------------
Lp5.codeSetup.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmSetupCp.line = Lp5.cmSetup.getCursor().line;
      Lp5.cmSetupCp.ch = Lp5.cmSetup.getCursor().ch;
      Lp5.panelIndex = 0

      Lp5.cmFocused = 'setup';
})
Lp5.codeSetup.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmSetupCp.line = Lp5.cmSetup.getCursor().line;
      Lp5.cmSetupCp.ch = Lp5.cmSetup.getCursor().ch;
})
Lp5.codeSetup.addEventListener('keydown', (ev) => {

      // Verifica si hubo cambios
      if (Lp5.validCodeSetup != Lp5.cmSetup.getValue()) {
            //Lp5.el('setup-change').innerHTML = '*&nbsp;&nbsp;';
            Lp5.el('lp5-setup').parentElement.classList.add('change');
            Lp5.historyChangesSetup = 1
      } else {
            //Lp5.el('setup-change').innerHTML = '';
            Lp5.el('lp5-setup').parentElement.classList.remove('change');
            Lp5.historyChangesSetup = 0
      }
      // Evalua linea ---------------------------------------------------
      if (ev.altKey && ev.keyCode == 13) {
            Lp5.renderCodeSetup = Lp5.cmSetup.getLine(Lp5.cmSetupCp.line)
            // Lp5.renderCodeSetup = Lp5.cmSetup.getValue();
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Lp5.prog.setup.length; i++) {
                        word = Lp5.prog.setup[i];
                        if (Lp5.renderCodeSetup.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(Lp5.prog.setup[i]))
                              if (!Lp5.renderCodeSetup.match(r)) {
                                    valid = false;
                                    Lp5.el('lp5-console-out').innerHTML = 'en setup: ' + word + ' no puede ser utilizada en este bloque'
                              }
                        }
                  }
                  if (valid) {
                        Lp5.validCodeSetup = Lp5.renderCodeSetup;
                        Lp5.el('lp5-setup').parentElement.classList.remove('error');
                        Lp5.el('lp5-setup').parentElement.classList.remove('change');
                        Lp5.el('lp5-console-out').innerHTML = ''
                        new Function(Lp5.validCodeSetup)()
                        Lp5.main.saveCode('setup', Lp5.validCodeSetup)
                        Lp5.historyChangesSetup = 0
                  } else {
                        Lp5.el('lp5-setup').parentElement.classList.add('error');
                  }
            } catch (e) {
                  Lp5.el('lp5-console-out').innerHTML = 'setup: ' + e
                  Lp5.el('lp5-setup').parentElement.classList.add('error');
            }
      }
      // Evalua bloque ----------------------------------------------------------
      if (ev.ctrlKey && ev.keyCode == 13) {
            Lp5.evalSetup()
            Lp5.evalConn('setup')
      }
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  Lp5.cmSetup.setValue(Lp5.beautify_js(Lp5.cmSetup.getValue()))
                  Lp5.cmSetup.setCursor({ line: Lp5.cmSetupCp.line, ch: 0 })
            } catch (e) {
                  console.log(e)
            }
      }
});
Lp5.codeSetup.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey && !ev.altKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Lp5.scale_st -= 0.1;
            }
            if (dir == -1) {
                  Lp5.scale_st += 0.1;
            }
            if (Lp5.scale_st > 0.05) {
                  Lp5.codeSetup.style.fontSize = Lp5.scale_st + "rem";
                  Lp5.codeSetup.style.lineHeight = (Lp5.scale_st * 1.5) + "rem";
                  Lp5.cmSetup.refresh()
            } else {
                  Lp5.scale_st = 0.05;
            }
      }
});

// -----------------------------------------------------
// DRAW EVENTS -----------------------------------------
Lp5.codeDraw.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmDrawCp.line = Lp5.cmDraw.getCursor().line;
      Lp5.cmDrawCp.ch = Lp5.cmDraw.getCursor().ch;
      Lp5.panelIndex = 1

      Lp5.cmFocused = 'draw';
});
Lp5.codeDraw.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmDrawCp.line = Lp5.cmDraw.getCursor().line;
      Lp5.cmDrawCp.ch = Lp5.cmDraw.getCursor().ch;
})
Lp5.codeDraw.addEventListener('keydown', (ev) => {

      // Verifica si hubo cambios
      if (Lp5.validCodeDraw != Lp5.cmDraw.getValue()) {
            Lp5.el('lp5-draw').parentElement.classList.add('change');
            Lp5.historyChangesDraw = 1
      } else {
            Lp5.el('lp5-draw').parentElement.classList.remove('change');
            Lp5.historyChangesDraw = 0
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Lp5.evalDraw()
            Lp5.evalConn('draw')
      }
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  Lp5.cmDraw.setValue(Lp5.beautify_js(Lp5.cmDraw.getValue()))
                  Lp5.cmDraw.setCursor({ line: Lp5.cmDrawCp.line, ch: 0 })
            } catch (e) {
                  console.log(e)
            }
      }
});

Lp5.codeDraw.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey && !ev.altKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Lp5.scale_dr -= 0.1;
            }
            if (dir == -1) {
                  Lp5.scale_dr += 0.1;
            }
            if (Lp5.scale_dr > 0.05) {
                  Lp5.codeDraw.style.fontSize = Lp5.scale_dr + "rem";
                  Lp5.codeDraw.style.lineHeight = (Lp5.scale_dr * 1.4) + "rem";
                  Lp5.cmDraw.refresh()
            } else {
                  Lp5.scale_dr = 0.05;
            }
      }
});
// Paste ------------------------------------------
Lp5.codeSetup.addEventListener("paste", (ev) => {
      //Lp5.cmSetup.setValue(ev.clipboardData.getData('text/plain'))
});

Lp5.codeDraw.addEventListener("paste", (ev) => {
      //Lp5.cmDraw.setValue(ev.clipboardData.getData('text/plain'))
});

Lp5.codeAux.addEventListener("paste", (ev) => {
      //Lp5.cmAux.setValue(ev.clipboardData.getData('text/plain'))
});
// -----------------------------------------------------
// -----------------------------------------------------

// -----------------------------------------------------
// Global keyup event ----------------------------------
document.addEventListener('keyup', (ev) => {

      //console.log(ev.keyCode)
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
      // Mostrar/ocultar paneles
      if (ev.keyCode == 112) {
            if (Lp5.showSetupWin) {
                  Lp5.el('lp5-setup-pannel').style.display = 'none';
                  Lp5.showSetupWin = false;
            } else {
                  Lp5.el('lp5-setup-pannel').style.display = 'inline';
                  Lp5.showSetupWin = true;
            }
      }
      if (ev.keyCode == 113) {
            if (Lp5.showDrawWin) {
                  Lp5.el('lp5-draw-pannel').style.display = 'none';
                  Lp5.showDrawWin = false;
            } else {
                  Lp5.el('lp5-draw-pannel').style.display = 'inline';
                  Lp5.showDrawWin = true;
            }
      }
      if (ev.keyCode == 114) {
            if (Lp5.showAuxWin) {
                  Lp5.el('lp5-aux-pannel').style.display = 'none';
                  Lp5.showAuxWin = false;
            } else {
                  Lp5.el('lp5-aux-pannel').style.display = 'inline';
                  Lp5.showAuxWin = true;
            }
      }
      // Mostrar/ocultar codigo
      if (ev.ctrlKey && ev.keyCode == 72) {
            if (Lp5.showWin) {
                  Lp5.el('win').style.display = 'none';
                  Lp5.showWin = false;
            } else {
                  Lp5.el('win').style.display = 'inline';
                  Lp5.showWin = true;

                  // Vuelve a mostrar todos
                  Lp5.el('lp5-setup-pannel').style.display = 'inline';
                  Lp5.showSetupWin = true;

                  Lp5.el('lp5-draw-pannel').style.display = 'inline';
                  Lp5.showDrawWin = true;

                  Lp5.el('lp5-aux-pannel').style.display = 'inline';
                  Lp5.showAuxWin = true;
            }
      }
      // Exit
      if (ev.keyCode == 27) {
            if (confirm(":( salir de la aplicación??")) {
                  Lp5.main.exit();
            }

      }
      // Focus panels ---------------------------------------------------------------------
      if (ev.ctrlKey && (ev.keyCode == 32)) {
            Lp5.panelIndex++
            ev.preventDefault();
            if (Lp5.panelIndex > 2) Lp5.panelIndex = 0;
            if (Lp5.panelIndex == 0) {
                  Lp5.cmSetup.focus()
                  Lp5.cmFocused = 'setup'
                  Lp5.cmSetup.setCursor({ line: Lp5.cmSetupCp.line, ch: Lp5.cmSetupCp.ch })
            }
            if (Lp5.panelIndex == 1) {
                  Lp5.cmDraw.focus()
                  Lp5.cmFocused = 'draw'
                  Lp5.cmDraw.setCursor({ line: Lp5.cmDrawCp.line, ch: Lp5.cmDrawCp.ch })
            }
            if (Lp5.panelIndex == 2) {
                  Lp5.cmAux.focus()
                  Lp5.cmFocused = 'aux'
                  Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: Lp5.cmAuxCp.ch })
            }
      }
      Lp5.changeBgLineAlpha()

      // Sockets -------------------------------------
      if (Lp5.mode == 'SERVER') {
            Lp5.server.sendClient(frameCount)
            //Lp5.server.setBookmark()
      }
      if (Lp5.mode == 'CLIENT') {
            Lp5.client.sendServer()
            //Lp5.client.setBookmark()
      }
      // Node name
      Lp5.nodeName = Lp5.el('cnf-name').value

});
// Global keydown event -----------------------------------
document.addEventListener('keydown', function (ev) {
      //console.log(ev.keyCode)
      // Format code ----------------------
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  // Setup
                  if (Lp5.cmFocused == 'setup') {
                        Lp5.cmSetup.setValue(Lp5.beautify_js(Lp5.cmSetup.getValue()))
                        Lp5.cmSetup.setCursor({ line: Lp5.cmSetupCp.line, ch: 0 })
                  }
                  // Draw 
                  if (Lp5.cmFocused == 'draw') {
                        Lp5.cmDraw.setValue(Lp5.beautify_js(Lp5.cmDraw.getValue()))
                        Lp5.cmDraw.setCursor({ line: Lp5.cmDrawCp.line, ch: 0 })
                  }
                  // Aux
                  if (Lp5.cmFocused == 'aux') {
                        Lp5.cmAux.setValue(Lp5.beautify_js(Lp5.cmAux.getValue()))
                        Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: 0 })
                  }
            } catch (e) {
                  console.log(e)
            }
      }
      // ----------------------------------
      // Config win -----------------------
      if (ev.ctrlKey && ev.keyCode == 9) {
            ev.preventDefault();
            Lp5.toggleModal('cnf')
      }
      // Salvar codigo --------------------
      if (ev.ctrlKey && ev.keyCode == 83) {
            if (Lp5.validCodeSetup != '') Lp5.main.saveCode('setup', Lp5.validCodeSetup)
            if (Lp5.validCodeDraw != '') Lp5.main.saveCode('draw', Lp5.validCodeDraw)
            if (Lp5.validCodeAux != '') Lp5.main.saveCode('auxcode', Lp5.validCodeAux)
      }
      if (ev.ctrlKey && ev.keyCode == 90) {
            ev.preventDefault();
            return false
      }
      // Focus panels
      if (ev.ctrlKey && (ev.keyCode == 38 || ev.keyCode == 40)) {
            ev.preventDefault()
            if (ev.keyCode == 40) {
                  Lp5.panelIndex++
            } else if (ev.keyCode == 38) {
                  Lp5.panelIndex--
            }
            if (Lp5.panelIndex > 2) Lp5.panelIndex = 0;
            if (Lp5.panelIndex < 0) Lp5.panelIndex = 2;
            if (Lp5.panelIndex == 0) {
                  Lp5.cmSetup.setCursor({ line: Lp5.cmSetupCp.line, ch: Lp5.cmSetupCp.ch })
                  Lp5.cmSetup.focus()
                  Lp5.cmFocused = 'setup'
            }
            if (Lp5.panelIndex == 1) {
                  Lp5.cmDraw.setCursor({ line: Lp5.cmDrawCp.line, ch: Lp5.cmDrawCp.ch })
                  Lp5.cmDraw.focus()
                  Lp5.cmFocused = 'draw'
            }
            if (Lp5.panelIndex == 2) {
                  Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: Lp5.cmAuxCp.ch })
                  Lp5.cmAux.focus()
                  Lp5.cmFocused = 'aux'
            }
      }
      // Refrescar fondo lineas
      Lp5.changeBgLineAlpha()
})
// Global select event -----------------------------------
document.addEventListener("select", (ev) => {
      if (Lp5.cmDraw.hasFocus()) Lp5.cmSelect = new Number(Lp5.cmDraw.getSelection())
      if (Lp5.cmSetup.hasFocus()) Lp5.cmSelect = new Number(Lp5.cmSetup.getSelection())
      if (Lp5.cmAux.hasFocus()) Lp5.cmSelect = new Number(Lp5.cmAux.getSelection())
})
// Global mousewheel event -----------------------------------
document.addEventListener("mousewheel", (ev) => {
      if (ev.altKey && ev.ctrlKey) {
            if (
                  Lp5.cmSetup.somethingSelected() ||
                  Lp5.cmDraw.somethingSelected() ||
                  Lp5.cmAux.somethingSelected()
            ) {
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
                        if (Lp5.cmDraw.hasFocus()) Lp5.cmDraw.replaceSelection(Lp5.cmSelect.toString(), "around")
                        if (Lp5.cmSetup.hasFocus()) Lp5.cmSetup.replaceSelection(Lp5.cmSelect.toString(), "around")
                        if (Lp5.cmAux.hasFocus()) Lp5.cmAux.replaceSelection(Lp5.cmSelect.toString(), "around")
                        // Refresca el fondo ya que el el replace se elimina el atributo
                        Lp5.changeBgLineAlpha()


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
});
// -----------------------------------------------------
// CONFIG ----------------------------------------------
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
