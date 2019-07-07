/**
 * lp5.js
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
      querySel: function (qs) {
            return document.querySelector(qs)
      },
      querySelAll: function (qs, fn = null) {
            let all = document.querySelectorAll(qs)
            if (typeof fn == 'function') {
                  for (let i = 0; i < all.length; i++) {
                        fn(all[i])
                  }
            }
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
            let elsln = document.querySelectorAll(".CodeMirror-gutters")
            for (let i = 0; i < elsln.length; i++) {
                  elsln[i].style.backgroundColor = "rgba(0,0,0," + this.bg_code_alpha + ")";
            }
      },
      // Palabras reservadas / reserved words
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
            setup3d: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'remove',
                  'text',
                  'textAlign',
                  'textLeading',
                  'textSize',
                  'textStyle',
                  'textWidth',
                  'textAscent',
                  'textDescent',
                  'textFont',
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
                  'size',
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
            draw3d: [
                  'draw',
                  'size',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'use2d',
                  'use3d',
                  'text',
                  'textAlign',
                  'textLeading',
                  'textSize',
                  'textStyle',
                  'textWidth',
                  'textAscent',
                  'textDescent',
                  'textFont',
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
                  // 'draw',
                  // 'setup',
                  // 'preload',
                  // 'canvas',
                  // 'createCanvas',
                  // 'use2d',
                  // 'use3d',
                  // 'useCam',
                  // 'useAudio',
                  // 'remove',
                  // '___audio',
                  // '___fft',
                  // '___webcam',
                  // 'ZOOM_SCALE'
            ],
            aux3d: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'use2d',
                  'use3d',
                  'text',
                  'textAlign',
                  'textLeading',
                  'textSize',
                  'textStyle',
                  'textWidth',
                  'textAscent',
                  'textDescent',
                  'textFont',
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
      getBlockRange: function (cm, cp) {
            let lfrom = cp.line
            let lto = cp.line
            let code = ''
            let out = ''
            while (lfrom >= 0 && cm.getLine(lfrom) != "") { lfrom-- }
            while (lto < cm.lineCount() && cm.getLine(lto) != "") { lto++ }
            code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto, ch: 0 })
            out = { lf: lfrom, lt: lto, code: code }
            return out
      },
      getFunctionRange: function (cm, cp) {
            let lfrom = cp.line
            let lto = cp.line
            let opens = 0
            let linepos = cp.line
            let out = ''
            let func = ''
            let code = ''
            // Encuentra la funcion setup o draw
            while (lfrom >= 0) {
                  // Setup
                  if (cm.getLine(lfrom).match(/function[\t ]+_setup[\t ]*\([\t ]*\)/g)) {
                        func = '_setup'
                        break;
                  }
                  // Draw
                  if (cm.getLine(lfrom).match(/function[\t ]+_draw[\t ]*\([\t ]*\)/g)) {
                        func = '_draw'
                        break;
                  }
                  // Funcion generica
                  if (cm.getLine(lfrom).match(/function[\t ]+(.+)[\t ]*\([\t ]*\)/g)) {
                        func = 'any'
                        break;
                  }
                  lfrom--
                  lto = lfrom
            }
            if (func == '_setup' || func == '_draw') {
                  while (lto < cm.lineCount()) {
                        if (cm.getLine(lto).match(/\{/g)) {
                              opens++;
                        }
                        if (opens > 0 && cm.getLine(lto).match(/\}/g)) {
                              opens--;
                        }
                        if (opens == 0) {
                              break;
                        }
                        lto++
                  }
                  code = cm.getRange({ line: lfrom - 1, ch: 0 }, { line: lto + 1, ch: 0 }).trim().replace(new RegExp('^function[\\t ]+' + func + '[\\t ]*\\([\\t ]*\\)[\\t ]*\\{', 'g'), '').replace(new RegExp('\\}$', 'g'), '')
            }
            if (func == 'any') {
                  while (lto < cm.lineCount()) {
                        if (cm.getLine(lto).match(/\{/g)) {
                              opens++;
                        }
                        if (opens > 0 && cm.getLine(lto).match(/\}/g)) {
                              opens--;
                        }
                        if (opens == 0) {
                              break;
                        }
                        lto++
                  }
                  //Funcion completa
                  code = cm.getRange({ line: lfrom - 1, ch: 0 }, { line: lto + 1, ch: 0 })
            }
            // Verifica que el cursor este entre llaves
            if (linepos >= lfrom && linepos <= lto) {
                  out = { lf: lfrom - 1, lt: lto + 1, code: code.trim() }
                  console.log(code)
            }
            return out;
      },
      evalFx(_el) {
            let els = this.el(_el).querySelectorAll('.CodeMirror-line>span')
            for (let i = 0; i < els.length; i++) {
                  els[i].classList.remove('compile');
                  void els[i].offsetWidth
                  els[i].classList.add('compile');
            }
      },
      evalLineFx(_el, lfrom, lto = lfrom) {
            let els = this.el(_el).querySelectorAll('.CodeMirror-line>span')
            for (let i = lfrom + 1; i < lto; i++) {
                  if (els[i]) {
                        els[i].classList.remove('compile');
                        void els[i].offsetWidth
                        els[i].classList.add('compile');
                  }
            }
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
                  let render = this.main.globalSettings().renderer
                  let wordList = (render == 'webgl') ? this.prog.draw3d : this.prog.draw
                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i]
                        if (this.renderCodeDraw.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeDraw.match(r)) {
                                    valid = false;
                                    if (render == 'webgl') {
                                          this.el('lp5-console-out').innerHTML = '| draw: ' + word + ' ' + lang_msg.priv_words_render
                                    } else {
                                          this.el('lp5-console-out').innerHTML = '| draw: ' + word + ' ' + lang_msg.priv_words
                                    }
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
      tryEvalAux: function () {
            try {
                  let valid = true;
                  let word = '';
                  let render = this.main.globalSettings().renderer
                  let wordList = (render == 'webgl') ? this.prog.aux3d : this.prog.aux
                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i]
                        if (this.renderCodeAux.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeAux.match(r)) {
                                    valid = false;
                                    if (render == 'webgl') {
                                          this.el('lp5-console-out').innerHTML = '| aux: ' + word + ' ' + lang_msg.priv_words_render
                                    } else {
                                          this.el('lp5-console-out').innerHTML = '| aux: ' + word + ' ' + lang_msg.priv_words
                                    }
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
      evalAux: function () {
            if (this.cmAux.somethingSelected()) {
                  this.renderCodeAux = this.doGlobals("'use strict';" + this.cmAux.getSelection());
                  this.evalSelectFx('lp5-aux', this.getLinesSelected(this.cmAux))
            } else {
                  this.renderCodeAux = this.doGlobals("'use strict';" + this.cmAux.getValue());
                  this.evalFx('lp5-aux')
            }
            this.tryEvalAux()
      },
      tryEvalSetup: function () {
            try {
                  let valid = true;
                  let word = '';
                  let render = this.main.globalSettings().renderer
                  let wordList = (render == 'webgl') ? this.prog.setup3d : this.prog.setup
                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i];
                        if (this.renderCodeSetup.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeSetup.match(r)) {
                                    valid = false;
                                    if (render == 'webgl') {
                                          this.el('lp5-console-out').innerHTML = '| setup: ' + word + ' ' + lang_msg.priv_words_render
                                    } else {
                                          this.el('lp5-console-out').innerHTML = '| setup: ' + word + ' ' + lang_msg.priv_words
                                    }
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
      evalSetup: function () {
            if (this.cmSetup.somethingSelected()) {
                  this.renderCodeSetup = this.doGlobals("'use strict';" + this.cmSetup.getSelection());
                  this.evalSelectFx('lp5-setup', this.getLinesSelected(this.cmSetup))
            } else {
                  this.renderCodeSetup = this.doGlobals("'use strict';" + this.cmSetup.getValue());
                  this.evalFx('lp5-setup')
            }
            this.tryEvalSetup()
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