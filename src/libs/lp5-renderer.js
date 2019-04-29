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
      version: '0.1.2',
      p5: {
            version: '0.8.0'
      },
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
      looping: true,
      historyChangesSetup: 0,
      historyChangesDraw: 0,
      historyChangesAux: 0,
      drawOnFly: false,
      // Drag pannels
      dragStart: 0,
      dragEnd: 0,
      mousePressed: false,
      pannelDraggign: false,
      pannelLWidth: '50%',
      pannelLRight: '50%',
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
      panelIndex: 2,
      cmSelect: '',
      // DOM en index.html
      codeSetup: document.getElementById('lp5-setup'),
      codeDraw: document.getElementById('lp5-draw'),
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
                  'createCanvas',
                  'remove',
                  'mouseClicked',
                  'mouseMoved',
                  'mouseDragged',
                  'mousePressed',
                  'mouseReleased',
                  'doubleClicked',
                  'keyReleased',
                  'keyPressed',
                  'mouseWheel',
                  '___audio',
                  '___fft',
                  '___webcam',
                  'ZOOM_SCALE'
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
                  'useAudio',
                  'remove',
                  'mouseClicked',
                  'mouseMoved',
                  'mouseDragged',
                  'mousePressed',
                  'mouseReleased',
                  'keyReleased',
                  'keyPressed',
                  'doubleClicked',
                  'mouseWheel',
                  '___audio',
                  '___fft',
                  '___webcam',
                  'ZOOM_SCALE'
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
                  'useAudio',
                  'remove',
                  '___audio',
                  '___fft',
                  '___webcam',
                  'ZOOM_SCALE'
            ]
      },
      extendsFile: function (file) {
            return this.main.path().join(this.main.resourcesPath(), 'leparc_resources', 'extends', file)
      },
      checkProgWord: function (_word) {
            // verifica que no se redefinan variables o funciones de p5
            return `((?<=[\'\"][\s\n\t ]*)${_word}|[\.\$]${_word}|[\=|\(]{1}[\s\n\t ]*[\{]{1}[\s\n\t ]*[0-9a-zA-Z\:\'\"\,\. \s]*[\s\n\t ]*${_word}[\s\n\t ]*[\:]{1}|[\/]{2}[\s ]*${_word})`
      },
      doGlobals: function (_code) {
            return _code.replace(/\$(?!\{)(?! )/g, 'lp.')
      },
      evalFx(_el) {
            let els = this.el(_el).querySelectorAll('.CodeMirror-line>span')
            for (let i = 0; i < els.length; i++) {
                  els[i].classList.remove('compile');
                  void els[i].offsetWidth
                  els[i].classList.add('compile');
            }
      },
      evalLineFx(_el, ln) {
            let els = this.el(_el).querySelectorAll('.CodeMirror-line>span')
            els[ln].classList.remove('compile');
            void els[ln].offsetWidth
            els[ln].classList.add('compile');
      },
      evalSelectFx(_el, lns) {
            let els = this.el(_el).querySelectorAll('.CodeMirror-line>span')
            for (let i = parseInt(lns.from); i <= parseInt(lns.to); i++) {
                  els[i].classList.remove('compile');
                  void els[i].offsetWidth
                  els[i].classList.add('compile');
            }
      },
      getLinesSelected(cm) {
            return { from: cm.getCursor('from').line, to: cm.getCursor('to').line }
      },
      clearEvts: function () {
            // p5js events prop
            mouseClicked = null
            mouseMoved = null
            mouseDragged = null
            mousePressed = null
            mouseReleased = null
            doubleClicked = null
            keyReleased = null
            keyPressed = null
            mouseWheel = null
      },
      evalDraw: function () {
            this.renderCodeDraw = this.doGlobals("'use strict';" + this.cmDraw.getValue());
            this.evalFx('lp5-draw')
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < this.prog.draw.length; i++) {
                        word = this.prog.draw[i]
                        if (this.renderCodeDraw.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeDraw.match(r)) {
                                    valid = false;
                                    this.el('lp5-console-out').innerHTML = '| draw: ' + word + ' ' + lang_msg.priv_words
                              }
                        }
                  }
                  // Try eval
                  // Verificar que se ejecuta correctamente
                  // Para no detener el loop
                  try {
                        new Function(this.renderCodeDraw)()
                  } catch (e) {
                        valid = false
                        this.el('lp5-console-out').innerHTML = 'draw: ' + e
                        this.el('lp5-draw').parentElement.classList.remove('error');
                  }
                  if (valid) {
                        this.validCodeDraw = this.renderCodeDraw;
                        this.el('lp5-draw').parentElement.classList.remove('error');
                        this.el('lp5-draw').parentElement.classList.remove('change');
                        //this.main.saveCode('draw', this.validCodeDraw)
                  } else {
                        this.el('lp5-draw').parentElement.classList.add('error');
                  }
            } catch (e) {
                  this.el('lp5-draw').parentElement.classList.add('error');
                  this.el('lp5-console-out').innerHTML = '| draw: ' + e
            }
      },
      evalAux: function () {
            if (this.cmAux.somethingSelected()) {
                  this.renderCodeAux = this.doGlobals("'use strict';" + this.cmAux.getSelection());
                  this.evalSelectFx('lp5-aux', this.getLinesSelected(this.cmAux))
            } else {
                  this.renderCodeAux = this.doGlobals("'use strict';" + this.cmAux.getValue());
                  this.evalFx('lp5-aux')
            }
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < this.prog.aux.length; i++) {
                        word = this.prog.aux[i]
                        if (this.renderCodeAux.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeAux.match(r)) {
                                    valid = false;
                                    this.el('lp5-console-out').innerHTML = '| aux: ' + word + ' ' + lang_msg.priv_words
                              }
                        }
                  }
                  if (valid) {
                        this.clearEvts()
                        this.validCodeAux = this.doGlobals("'use strict';" + this.renderCodeAux);
                        new Function(this.validCodeAux)();
                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                        this.el('lp5-console-out').innerHTML = ''
                  } else {
                        this.el('lp5-aux').parentElement.classList.add('error');
                  }
            } catch (e) {
                  console.trace('en aux: ' + e);
                  this.el('lp5-console-out').innerHTML = '| aux: ' + e
                  this.el('lp5-aux').parentElement.classList.add('error');
            }
      },
      evalSetup: function () {
            if (this.cmSetup.somethingSelected()) {
                  this.renderCodeSetup = this.doGlobals("'use strict';" + this.cmSetup.getSelection());
                  this.evalSelectFx('lp5-setup', this.getLinesSelected(this.cmSetup))
            } else {
                  this.renderCodeSetup = this.doGlobals("'use strict';" + this.cmSetup.getValue());
                  this.evalFx('lp5-setup')
            }
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < this.prog.setup.length; i++) {
                        word = this.prog.setup[i];
                        if (this.renderCodeSetup.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeSetup.match(r)) {
                                    valid = false;
                                    this.el('lp5-console-out').innerHTML = '| setup: ' + word + ' ' + lang_msg.priv_words
                              }
                        }
                  }
                  if (valid) {
                        this.validCodeSetup = this.renderCodeSetup;
                        this.el('lp5-setup').parentElement.classList.remove('error');
                        this.el('lp5-setup').parentElement.classList.remove('change');
                        this.el('lp5-console-out').innerHTML = ''
                        //this.main.saveCode('setup', this.validCodeSetup)
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
      // Panels
      showAllPannels: function () {
            this.el('lp5-aux-pannel').style.display = 'inline';
            this.showAuxWin = true;
            this.cmAux.refresh()
            this.el('lp5-setup-pannel').style.display = 'inline';
            this.showSetupWin = true;
            this.cmSetup.refresh()
            this.el('lp5-draw-pannel').style.display = 'inline';
            this.showDrawWin = true;
            this.cmDraw.refresh()
      },
      hideAllPannels: function () {
            this.el('lp5-aux-pannel').style.display = 'none';
            this.showAuxWin = false;
            this.el('lp5-setup-pannel').style.display = 'none';
            this.showSetupWin = false;
            this.el('lp5-draw-pannel').style.display = 'none';
            this.showDrawWin = false;
      },
      showPannel: function (tab) {
            let els = document.querySelectorAll(".tabs>span")
            for (let i = 0; i < els.length; i++) {
                  els[i].classList.remove('tab-selected')
            }
            if (tab == 'aux') {
                  this.hideAllPannels()
                  this.el('lp5-aux-pannel').style.display = 'inline';
                  this.el('lp5-tab-aux').classList.add('tab-selected')
                  this.showAuxWin = true;
                  this.cmAux.refresh()
            }
            if (tab == 'setup') {
                  this.hideAllPannels()
                  this.el('lp5-setup-pannel').style.display = 'inline';
                  this.el('lp5-tab-setup').classList.add('tab-selected')
                  this.showSetupWin = true;
                  this.cmSetup.refresh()
            }
            if (tab == 'draw') {
                  this.hideAllPannels()
                  this.el('lp5-draw-pannel').style.display = 'inline';
                  this.el('lp5-tab-draw').classList.add('tab-selected')
                  this.showDrawWin = true;
                  this.cmDraw.refresh()
            }
      },
      pannelFocus: function (pannel, cur = { line: 0, ch: 0 }) {
            if (pannel == 'aux' && this.cmAux) {
                  this.cmAux.focus()
                  this.cmFocused = 'aux'
                  this.cmAux.setCursor(cur)
            }
            if (pannel == 'setup' && this.cmSetup) {
                  this.cmSetup.focus()
                  this.cmFocused = 'setup'
                  this.cmSetup.setCursor(cur)
            }
            if (pannel == 'draw' && this.cmDraw) {
                  this.cmDraw.focus()
                  this.cmFocused = 'draw'
                  this.cmDraw.setCursor(cur)
            }
      },
      // Modo: CLIENTE-SERVIDOR
      evalConn: function (block) {
            if (this.mode == 'CLIENT') this.client.eval(block)
            if (this.mode == 'SERVER') this.server.eval(block)
      }

}

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

      // Setup y Draw titulos ------------------
      if (localStorage.block_titles == 1) {
            Lp5.el('setup-title').innerHTML = 'function setup(){'
            Lp5.el('setup-title-end').innerHTML = '}'
            Lp5.el('draw-title').innerHTML = 'function draw(){'
            Lp5.el('draw-title-end').innerHTML = '}'
            Lp5.el('cnf-titles').checked = true
      } else {
            Lp5.el('setup-title').innerHTML = 'setup:'
            Lp5.el('setup-title-end').innerHTML = ''
            Lp5.el('draw-title').innerHTML = 'loop:'
            Lp5.el('draw-title-end').innerHTML = ''
            Lp5.el('cnf-titles').checked = false
      }
      if (Lp5.main.globalSettings().renderer == 'webgl') {
            Lp5.el('lp5-os-r').style.display = 'inline'
            Lp5.el('cnf-render').options[1].selected = true
      } else {
            Lp5.el('lp5-os-r').style.display = 'none'
            Lp5.el('cnf-render').options[0].selected = true
      }

      // Code mirror ------------------------------------------------------------------- 
      Lp5.cmAux = CodeMirror(Lp5.codeAux, {
            mode: "javascript"
      });
      Lp5.cmAux.on('change', function (cm, ob) {
            if (Lp5.renderCodeAux != Lp5.doGlobals("'use strict';" + cm.getValue())) {
                  Lp5.historyChangesAux = 1
                  Lp5.el('lp5-aux').parentElement.classList.add('change');
            } else {
                  Lp5.el('lp5-aux').parentElement.classList.remove('change');
            }
      })
      //
      Lp5.cmSetup = CodeMirror(Lp5.codeSetup, {
            mode: "javascript"
      });
      Lp5.cmSetup.on('change', function (cm, ob) {
            if (Lp5.renderCodeSetup != Lp5.doGlobals("'use strict';" + cm.getValue())) {
                  Lp5.historyChangesSetup = 1
                  Lp5.el('lp5-setup').parentElement.classList.add('change');
            } else {
                  Lp5.el('lp5-setup').parentElement.classList.remove('change');
            }
      })
      //
      Lp5.cmDraw = CodeMirror(Lp5.codeDraw, {
            mode: "javascript"
      });
      Lp5.cmDraw.on('change', function (cm, ob) {
            if (Lp5.renderCodeDraw != Lp5.doGlobals("'use strict';" + cm.getValue())) {
                  Lp5.historyChangesDraw = 1
                  Lp5.el('lp5-draw').parentElement.classList.add('change');
            } else {
                  Lp5.el('lp5-draw').parentElement.classList.remove('change');
            }
      })//
      // Pannels ----------------------------------
      Lp5.showAllPannels()
      if (localStorage.pannels == 'vert') {
            Lp5.el('cnf-pannels').options[0].selected = true
            Lp5.el('win').style.display = 'block'

            Lp5.el('codeblock-resizable').style.width = '100%'
            Lp5.el('lp5-tabs').style.display = 'none'
      }
      if (localStorage.pannels == 'horiz') {
            Lp5.el('cnf-pannels').options[1].selected = true
            Lp5.el('win').style.display = 'flex'

            Lp5.el('codeblock-resizable').style.width = Lp5.pannelLWidth
            Lp5.el('codeblock').style.width = Lp5.pannelRWidth
            Lp5.el('lp5-tabs').style.display = 'none'
      }
      if (localStorage.pannels == 'tabs') {
            Lp5.el('cnf-pannels').options[2].selected = true
            Lp5.el('win').style.display = 'block'

            Lp5.el('codeblock-resizable').style.width = '100%'
            Lp5.el('lp5-tabs').style.display = 'inline'
      }
      if (localStorage.pannels == 'tabs') Lp5.showPannel('draw')
      // Init cursor
      Lp5.pannelFocus('draw')
});
// ********************************************************************
// ********************************************************************
// P5js ***************************************************************
// ********************************************************************
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
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'save', 'setup.txt'), (file) => {
            Lp5.setupTxt = file
            let stxt = '';
            for (let i = 0; i < Lp5.setupTxt.length; i++) {
                  stxt += Lp5.setupTxt[i] + '\n';
            }
            try {
                  // Lp5.codeSetup.innerText = Lp5.beautify_js(txt.trim())
                  if (stxt != '') {
                        Lp5.cmSetup.setValue(Lp5.beautify_js(stxt.trim()));
                        Lp5.pannelFocus('setup')
                  } else {
                        Lp5.cmSetup.setValue('//');
                  }
            } catch (e) {
                  console.trace(e)
            }

      })
      loadStrings(Lp5.main.path().join(Lp5.main.resourcesPath(), 'leparc_resources', 'save', 'draw.txt'), (file) => {
            Lp5.drawTxt = file
            let dtxt = '';
            for (let i = 0; i < Lp5.drawTxt.length; i++) {
                  dtxt += Lp5.drawTxt[i] + '\n';
            }
            try {
                  // Lp5.codeDraw.innerHTML = Lp5.beautify_js(txt.trim())
                  if (dtxt != '') {
                        Lp5.cmDraw.setValue(Lp5.beautify_js(dtxt.trim()));
                        Lp5.pannelFocus('draw')
                  } else {
                        Lp5.cmDraw.setValue('//');
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
            Lp5.el('lp5-setup').parentElement.classList.add('error');
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
            Lp5.renderCodeDraw = Lp5.doGlobals("'use strict';" + Lp5.cmDraw.getValue());
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Lp5.prog.draw.length; i++) {
                        word = Lp5.prog.draw[i];
                        if (Lp5.renderCodeDraw.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(word))
                              if (!Lp5.renderCodeDraw.match(r)) {
                                    valid = false;
                                    Lp5.el('lp5-console-out').innerHTML = '| draw: ' + word + ' ' + lang_msg.priv_words
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
            try {
                  new Function(Lp5.validCodeSetup)();
            } catch (e) {
                  console_msg('setup: ' + e.stack)
                  Lp5.el('lp5-setup').parentElement.classList.add('error');
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

Lp5.codeAux.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
      Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
      Lp5.panelIndex = 0
      Lp5.cmFocused = 'aux';
      Lp5.cmAux.focus()
})
Lp5.codeAux.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmAuxCp.line = Lp5.cmAux.getCursor().line;
      Lp5.cmAuxCp.ch = Lp5.cmAux.getCursor().ch;
})
Lp5.codeAux.addEventListener('keydown', (ev) => {
      // Evalua linea ---------------------------------------------------
      if (ev.altKey && ev.keyCode == 13) {
            Lp5.renderCodeAux = Lp5.doGlobals("'use strict';" + Lp5.cmAux.getLine(Lp5.cmAuxCp.line))
            Lp5.evalLineFx('lp5-aux', Lp5.cmAuxCp.line)
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Lp5.prog.aux.length; i++) {
                        word = Lp5.prog.aux[i];
                        if (Lp5.renderCodeAux.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(Lp5.prog.aux[i]))
                              if (!Lp5.renderCodeAux.match(r)) {
                                    valid = false;
                                    Lp5.el('lp5-console-out').innerHTML = '| aux: ' + word + ' ' + lang_msg.priv_words
                              }
                        }
                  }
                  if (valid) {
                        Lp5.clearEvts()
                        Lp5.validCodeAux = Lp5.renderCodeAux;
                        new Function(Lp5.validCodeAux)();
                        Lp5.el('lp5-aux').parentElement.classList.remove("error");
                        Lp5.el('lp5-aux').parentElement.classList.remove('change');
                        Lp5.el('lp5-console-out').innerHTML = '';
                  }
            } catch (e) {
                  console.trace('en aux eval ' + e);
                  Lp5.el('lp5-console-out').innerHTML = '| aux: ' + e
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
                  console.trace(e)
            }
      }
});

// -----------------------------------------------------
// SETUP EVENTS ----------------------------------------
Lp5.codeSetup.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmSetupCp.line = Lp5.cmSetup.getCursor().line;
      Lp5.cmSetupCp.ch = Lp5.cmSetup.getCursor().ch;
      Lp5.panelIndex = 1
      Lp5.cmFocused = 'setup';
      Lp5.cmSetup.focus()
})
Lp5.codeSetup.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmSetupCp.line = Lp5.cmSetup.getCursor().line;
      Lp5.cmSetupCp.ch = Lp5.cmSetup.getCursor().ch;
})
Lp5.codeSetup.addEventListener('keydown', (ev) => {
      // Evalua linea ---------------------------------------------------
      if (ev.altKey && ev.keyCode == 13) {
            Lp5.renderCodeSetup = Lp5.doGlobals("'use strict';" + Lp5.cmSetup.getLine(Lp5.cmSetupCp.line))
            // Lp5.renderCodeSetup = Lp5.cmSetup.getValue();
            Lp5.evalLineFx('lp5-setup', Lp5.cmSetupCp.line)
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Lp5.prog.setup.length; i++) {
                        word = Lp5.prog.setup[i];
                        if (Lp5.renderCodeSetup.includes(word)) {
                              let r = new RegExp(Lp5.checkProgWord(Lp5.prog.setup[i]))
                              if (!Lp5.renderCodeSetup.match(r)) {
                                    valid = false;
                                    Lp5.el('lp5-console-out').innerHTML = '| setup: ' + word + ' ' + lang_msg.priv_words
                              }
                        }
                  }
                  if (valid) {
                        Lp5.validCodeSetup = Lp5.renderCodeSetup;
                        Lp5.el('lp5-setup').parentElement.classList.remove('error');
                        Lp5.el('lp5-setup').parentElement.classList.remove('change');
                        Lp5.el('lp5-console-out').innerHTML = ''
                        new Function(Lp5.validCodeSetup)()
                        //Lp5.main.saveCode('setup', Lp5.validCodeSetup)
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
                  console.trace(e)
            }
      }
});

// -----------------------------------------------------
// DRAW EVENTS -----------------------------------------
Lp5.codeDraw.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmDrawCp.line = Lp5.cmDraw.getCursor().line;
      Lp5.cmDrawCp.ch = Lp5.cmDraw.getCursor().ch;
      Lp5.panelIndex = 2
      Lp5.cmFocused = 'draw';
      Lp5.cmDraw.focus()
});
Lp5.codeDraw.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Lp5.cmDrawCp.line = Lp5.cmDraw.getCursor().line;
      Lp5.cmDrawCp.ch = Lp5.cmDraw.getCursor().ch;
})
Lp5.codeDraw.addEventListener('keydown', (ev) => {

      if (ev.ctrlKey && ev.keyCode == 13) {
            Lp5.evalDraw()
            // Redraw si no esta loopeando
            if (!Lp5.looping) redraw()
            Lp5.evalConn('draw')
      }
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  Lp5.cmDraw.setValue(Lp5.beautify_js(Lp5.cmDraw.getValue()))
                  Lp5.cmDraw.setCursor({ line: Lp5.cmDrawCp.line, ch: 0 })
            } catch (e) {
                  console.trace(e)
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
Lp5.el('lp5-tab-aux').addEventListener('click', function () {
      Lp5.showPannel('aux')
      Lp5.pannelFocus('aux', { line: Lp5.cmAuxCp.line, ch: Lp5.cmAuxCp.ch })
})
Lp5.el('lp5-tab-setup').addEventListener('click', function () {
      Lp5.showPannel('setup')
      Lp5.pannelFocus('setup', { line: Lp5.cmSetupCp.line, ch: Lp5.cmSetupCp.ch })
})
Lp5.el('lp5-tab-draw').addEventListener('click', function () {
      Lp5.showPannel('draw')
      Lp5.pannelFocus('draw', { line: Lp5.cmDrawCp.line, ch: Lp5.cmDrawCp.ch })
})
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
            if (localStorage.pannels == 'tabs') {
                  Lp5.showPannel('aux')
                  Lp5.pannelFocus('aux', { line: Lp5.cmAuxCp.line, ch: Lp5.cmAuxCp.ch })
            } else {
                  if (Lp5.showAuxWin) {
                        Lp5.el('lp5-aux-pannel').style.display = 'none';
                        Lp5.showAuxWin = false;
                  } else {
                        Lp5.el('lp5-aux-pannel').style.display = 'inline';
                        Lp5.showAuxWin = true;
                  }
            }
      }
      if (ev.keyCode == 113) {
            if (localStorage.pannels == 'tabs') {
                  Lp5.showPannel('setup')
                  Lp5.pannelFocus('setup', { line: Lp5.cmSetupCp.line, ch: Lp5.cmSetupCp.ch })
            } else {
                  if (Lp5.showSetupWin) {
                        Lp5.el('lp5-setup-pannel').style.display = 'none';
                        Lp5.showSetupWin = false;
                  } else {
                        Lp5.el('lp5-setup-pannel').style.display = 'inline';
                        Lp5.showSetupWin = true;
                  }
            }
      }
      if (ev.keyCode == 114) {
            if (localStorage.pannels == 'tabs') {
                  Lp5.showPannel('draw')
                  Lp5.pannelFocus('draw', { line: Lp5.cmDrawCp.line, ch: Lp5.cmDrawCp.ch })
            } else {
                  if (Lp5.showDrawWin) {
                        Lp5.el('lp5-draw-pannel').style.display = 'none';
                        Lp5.showDrawWin = false;
                  } else {
                        Lp5.el('lp5-draw-pannel').style.display = 'inline';
                        Lp5.showDrawWin = true;
                  }
            }
      }
      // Mostrar/ocultar codigo
      if (ev.ctrlKey && ev.keyCode == 72) {
            if (Lp5.showWin) {
                  Lp5.el('win').style.display = 'none';
                  Lp5.showWin = false;
            } else {
                  if (localStorage.pannels == 'vert') {
                        Lp5.el('win').style.display = 'block';
                        Lp5.el('codeblock-resizable').style.width = '100%'
                        // Vuelve a mostrar todos
                        Lp5.showAllPannels()
                  }
                  if (localStorage.pannels == 'horiz') {
                        Lp5.el('win').style.display = 'flex';
                        Lp5.el('codeblock-resizable').style.width = Lp5.pannelLWidth
                        Lp5.el('codeblock').style.width = Lp5.pannelRWidth
                        // Vuelve a mostrar todos
                        Lp5.showAllPannels()
                  }
                  if (localStorage.pannels == 'tabs') {
                        Lp5.el('win').style.display = 'block';
                        Lp5.el('codeblock-resizable').style.width = '100%'
                        // oculta
                        // Lp5.hideAllPannels()
                        // Lp5.el('lp5-draw-pannel').style.display = 'inline';
                        // Lp5.showDrawWin = true;
                  }
                  Lp5.showWin = true;
            }
      }
      // Exit
      if (ev.keyCode == 27) {
            if (confirm(lang_msg.exit_app)) {
                  Lp5.main.exit();
            }

      }
      // Focus panels ---------------------------------------------------------------------
      if (ev.ctrlKey && (ev.keyCode == 32)) {
            Lp5.panelIndex++
            ev.preventDefault();
            if (Lp5.panelIndex > 2) Lp5.panelIndex = 0;
            if (Lp5.panelIndex == 0) {
                  if (localStorage.pannels == 'tabs') {
                        Lp5.showPannel('aux')
                  }
                  Lp5.pannelFocus('aux', { line: Lp5.cmAuxCp.line, ch: Lp5.cmAuxCp.ch })
            }
            if (Lp5.panelIndex == 1) {
                  if (localStorage.pannels == 'tabs') {
                        Lp5.showPannel('setup')
                  }
                  Lp5.pannelFocus('setup', { line: Lp5.cmSetupCp.line, ch: Lp5.cmSetupCp.ch })
            }
            if (Lp5.panelIndex == 2) {
                  if (localStorage.pannels == 'tabs') {
                        Lp5.showPannel('draw')
                  }
                  Lp5.pannelFocus('draw', { line: Lp5.cmDrawCp.line, ch: Lp5.cmDrawCp.ch })
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
      // Comment ----------------------
      if (ev.shiftKey && !ev.altKey && ev.ctrlKey && ev.keyCode == 67) {
            ev.preventDefault();
            if (Lp5.cmFocused == 'aux') {
                  Lp5.cmAux.toggleComment({
                        lineComment: '//'
                  })
            }
            if (Lp5.cmFocused == 'setup') {
                  Lp5.cmSetup.toggleComment({
                        lineComment: '//'
                  })
            }
            if (Lp5.cmFocused == 'draw') {
                  Lp5.cmDraw.toggleComment({
                        lineComment: '//'
                  })
            }
      }
      // Format code ----------------------
      if (ev.ctrlKey && ev.keyCode == 70) {
            ev.preventDefault();
            // Si hay cambios -> formatea
            try {
                  // Aux
                  if (Lp5.cmFocused == 'aux') {
                        Lp5.cmAux.setValue(Lp5.beautify_js(Lp5.cmAux.getValue()))
                        Lp5.cmAux.setCursor({ line: Lp5.cmAuxCp.line, ch: 0 })
                  }
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
            // if (Lp5.validCodeSetup != '') 
            Lp5.main.saveCode('setup', Lp5.cmSetup.getValue())
            // if (Lp5.validCodeDraw != '') 
            Lp5.main.saveCode('draw', Lp5.cmDraw.getValue())
            // if (Lp5.validCodeAux != '') 
            Lp5.main.saveCode('auxcode', Lp5.cmAux.getValue())

            Lp5.historyChangesAux = 0
            Lp5.historyChangesDraw = 0
            Lp5.historyChangesSetup = 0

            console_msg(lang_msg.saved)
      }
      if (ev.ctrlKey && ev.keyCode == 90) {
            ev.preventDefault();
            return false
      }
      // Focus panels & show / hide
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
                  if (localStorage.pannels == 'tabs') {
                        Lp5.showPannel('aux')
                  }
                  Lp5.pannelFocus('aux', { line: Lp5.cmAuxCp.line, ch: Lp5.cmAuxCp.ch })
            }
            if (Lp5.panelIndex == 1) {
                  if (localStorage.pannels == 'tabs') {
                        Lp5.showPannel('setup')
                  }
                  Lp5.pannelFocus('setup', { line: Lp5.cmSetupCp.line, ch: Lp5.cmSetupCp.ch })
            }
            if (Lp5.panelIndex == 2) {
                  if (localStorage.pannels == 'tabs') {
                        Lp5.showPannel('draw')
                  }
                  Lp5.pannelFocus('draw', { line: Lp5.cmDrawCp.line, ch: Lp5.cmDrawCp.ch })
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
                  Lp5.codeSetup.style.fontSize = Lp5.scale_st + "rem";
                  Lp5.codeSetup.style.lineHeight = (Lp5.scale_st * 1.5) + "rem";
                  Lp5.el('setup-title').style.fontSize = Lp5.scale_st + "rem";
                  Lp5.el('setup-title').style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.el('setup-title-end').style.fontSize = Lp5.scale_st + "rem";
                  Lp5.el('setup-title-end').style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.cmSetup.refresh()

                  Lp5.codeDraw.style.fontSize = Lp5.scale_st + "rem";
                  Lp5.codeDraw.style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.el('draw-title').style.fontSize = Lp5.scale_st + "rem";
                  Lp5.el('draw-title').style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.el('draw-title-end').style.fontSize = Lp5.scale_st + "rem";
                  Lp5.el('draw-title-end').style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.cmDraw.refresh()

                  Lp5.codeAux.style.fontSize = Lp5.scale_st + "rem";
                  Lp5.codeAux.style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.el('aux-title').style.fontSize = Lp5.scale_st + "rem";
                  Lp5.el('aux-title').style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  // Lp5.el('aux-title-end').style.fontSize = Lp5.scale_st + "rem";
                  // Lp5.el('aux-title-end').style.lineHeight = (Lp5.scale_st * 1.4) + "rem";
                  Lp5.cmAux.refresh()


            } else {
                  Lp5.scale_st = 0.05;
            }
      }
});
document.addEventListener('mousedown', (ev) => {

      // Panel resize
      Lp5.mousePressed = true
})
document.addEventListener('mouseup', (ev) => {

      // Panel resize
      Lp5.el('win').style.cursor = 'unset'
      Lp5.mousePressed = false
      Lp5.pannelDraggign = false
})
document.addEventListener('mousemove', (ev) => {

      // Panel resize
      if (Lp5.mousePressed && Lp5.pannelDraggign && localStorage.pannels == 'horiz') {
            Lp5.el('win').style.cursor = 'ew-resize'
            let dragDif = ev.pageX - Lp5.dragStart
            let winw = window.innerWidth
            let pannelLeft = (Lp5.dragStart + dragDif) / winw * 100
            Lp5.el('codeblock-resizable').style.width = pannelLeft + '%'
            let pannelRight = 100 - pannelLeft
            if (pannelRight < 2) pannelRight = 2
            Lp5.el('codeblock').style.width = pannelRight + '%'
            Lp5.pannelLWidth = pannelLeft + '%'
            Lp5.pannelRWidth = pannelRight + '%'
      }
})
// Pannels Resize --------------------------------------
Lp5.el('draw-title').addEventListener('mousedown', function pannelResize(ev) {
      Lp5.el('draw-title').removeEventListener('click', pannelResize);
      Lp5.dragStart = Lp5.el('codeblock-resizable').clientWidth
      Lp5.pannelDraggign = true

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

Lp5.el('cnf-lang').addEventListener('change', () => {
      localStorage.lang = Lp5.el('cnf-lang').value
      Lp5.main.reload()
});
Lp5.el('cnf-pannels').addEventListener('change', () => {
      localStorage.pannels = Lp5.el('cnf-pannels').value
      if (localStorage.pannels == 'vert') {
            Lp5.el('win').style.display = 'block'
            Lp5.el('codeblock-resizable').style.width = '100%'
            Lp5.el('lp5-tabs').style.display = 'none'
            // mostrar todos
            Lp5.showAllPannels()
      }
      if (localStorage.pannels == 'horiz') {
            Lp5.el('win').style.display = 'flex'
            Lp5.el('codeblock-resizable').style.width = Lp5.pannelLWidth
            Lp5.el('codeblock').style.width = Lp5.pannelRWidth
            Lp5.el('lp5-tabs').style.display = 'none'
            // mostrar todos
            Lp5.showAllPannels()
      }
      if (localStorage.pannels == 'tabs') {
            Lp5.el('win').style.display = 'block'
            Lp5.el('codeblock-resizable').style.width = '100%'
            Lp5.el('lp5-tabs').style.display = 'inline'

            // muestra solo el loop
            Lp5.showPannel('draw')
            // Init cursor
            Lp5.pannelFocus('draw')
      }
});
Lp5.el('cnf-render').addEventListener('change', () => {
      Lp5.main.reload(Lp5.el('cnf-render').value)
});
Lp5.el('cnf-titles').addEventListener('click', () => {
      if (Lp5.el('cnf-titles').checked) {
            localStorage.block_titles = 1
            Lp5.el('setup-title').innerHTML = 'function setup(){'
            Lp5.el('setup-title-end').innerHTML = '}'
            Lp5.el('draw-title').innerHTML = 'function draw(){'
            Lp5.el('draw-title-end').innerHTML = '}'
      } else {
            localStorage.block_titles = 0
            Lp5.el('setup-title').innerHTML = 'setup:'
            Lp5.el('setup-title-end').innerHTML = ''
            Lp5.el('draw-title').innerHTML = 'loop:'
            Lp5.el('draw-title-end').innerHTML = ''
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