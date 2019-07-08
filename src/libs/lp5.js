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
      version: '0.2.0',
      p5: {
            version: '0.9.0'
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
      blockData: '',
      cmAux: null,
      // cmClient:         null,
      cmAuxCp: {
            line: 0,
            ch: 0
      },
      cmSelect: '',
      // DOM en index.html
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
      renderCodeEvent: {
            mouseMoved: '',
            mouseReleased: '',
            mousePressed: '',
            mouseClicked: '',
            doubleClicked: '',
            mouseDragged: '',
            mouseWheel: '',
            keyPressed: '',
            keyReleased: '',
            keyReleased: '',
            keyTyped: ''
      },
      validCodeEvent: {
            mouseMoved: '',
            mouseReleased: '',
            mousePressed: '',
            mouseClicked: '',
            doubleClicked: '',
            mouseDragged: '',
            mouseWheel: '',
            keyPressed: '',
            keyReleased: '',
            keyReleased: '',
            keyTyped: ''
      },
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
                  // 'text',
                  // 'textAlign',
                  // 'textLeading',
                  // 'textSize',
                  // 'textStyle',
                  // 'textWidth',
                  // 'textAscent',
                  // 'textDescent',
                  // 'textFont',
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
                  //'text',
                  //'textAlign',
                  //'textLeading',
                  //'textSize',
                  //'textStyle',
                  //'textWidth',
                  //'textAscent',
                  //'textDescent',
                  //'textFont',
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
            ],
            aux3d: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'use2d',
                  'use3d',
                  // 'text',
                  // 'textAlign',
                  // 'textLeading',
                  // 'textSize',
                  // 'textStyle',
                  // 'textWidth',
                  // 'textAscent',
                  // 'textDescent',
                  // 'textFont',
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
            // Cambia a globales las variables fuera de las funciones
            return _code.replace(/\$(?!\{)(?! )/g, 'lp.')
      },
      getCodeBlock: function (cm, cp) {
            let lfrom = cp.line
            let lto = cp.line
            let lfromc = cp.line
            let ltoc = cp.line
            let opens = 0
            let linepos = cp.line
            let out = ''
            let func = ''
            let code = ''
            let brackets = false
            // Encuentra la funcion setup o draw
            evtsln:
            while (lfrom >= 0) {
                  // Setup
                  lto = lfrom
                  if (cm.getLine(lfrom).match(/function[\t ]+setup[\t ]*\([\t ]*\)/g)) {
                        func = 'setup'
                        break;
                  }
                  // Draw
                  if (cm.getLine(lfrom).match(/function[\t ]+draw[\t ]*\([\t ]*\)/g)) {
                        func = 'draw'
                        break;
                  }
                  // Funcion evento
                  for (var key in this.renderCodeEvent) {
                        let reg = new RegExp("function[\\t ]+" + key + "[\\t ]*\\([\\t ]*\\)", "g")
                        if (cm.getLine(lfrom).match(reg)) {
                              func = key
                              break evtsln;
                        }
                  }
                  // Funcion generica
                  if (cm.getLine(lfrom).match(/\$[a-zA-Z]+[0-9_]*[\t ]+\=[\t ]*function[\t ]*\([\t ]*\)/g)) {
                        func = 'any'
                        break;
                  }
                  lfrom--
            }
            if (func == 'setup' || func == 'draw') {
                  while (lto < cm.lineCount()) {
                        if (cm.getLine(lto).match(/\{/g)) {
                              brackets = true
                              opens++;
                        }
                        if (cm.getLine(lto).match(/\}/g) && opens > 0) {
                              opens--;
                        }
                        if (brackets && opens == 0) {
                              break;
                        }
                        lto++
                  }
                  code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 }).trim().replace(new RegExp('^function[\\t ]+' + func + '[\\t ]*\\([\\t ]*\\)[\\t\\n\\s ]*\\{', 'g'), '').replace(new RegExp('\\}$', 'g'), '')
            }
            if (func == 'any') {
                  console.log(lfrom,lto)
                  while (lto < cm.lineCount()) {
                        if (cm.getLine(lto).match(/\{/g)) {
                              brackets = true
                              opens++;
                        }
                        if (opens > 0 && cm.getLine(lto).match(/\}/g)) {
                              opens--;
                        }
                        if (brackets && opens == 0) {
                              break;
                        }
                        lto++
                  }
                  //Funcion completa
                  code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 })
            }
            for (var key in this.renderCodeEvent) {
                  if (func == key) {
                        while (lto < cm.lineCount()) {
                              if (cm.getLine(lto).match(/\{/g)) {
                                    brackets = true
                                    opens++;
                              }
                              if (cm.getLine(lto).match(/\}/g) && opens > 0) {
                                    opens--;
                              }
                              if (brackets && opens == 0) {
                                    break;
                              }
                              lto++
                        }
                        code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 }).trim().replace(new RegExp('^function[\\t ]+' + func + '[\\t ]*\\([\\t ]*\\)[\\t\\n\\s ]*\\{', 'g'), '').replace(new RegExp('\\}$', 'g'), '')
                        console.log(code)
                        break;
                  }
            }
            // Verifica que el cursor este entre llaves
            if (func != '' && linepos >= lfrom && linepos <= lto) {
                  out = { lf: lfrom - 1, lt: lto + 1, code: code.trim(), func: func, isFunc: true }
            } else {
                  while (lfromc >= 0 && cm.getLine(lfromc) != "") {
                        if (cm.getLine(lfromc).match(/\}/g)) break;
                        lfromc--
                  }
                  while (ltoc < cm.lineCount() && cm.getLine(ltoc) != "") {
                        if (cm.getLine(ltoc).match(/function/g)) break;
                        ltoc++
                  }
                  code = cm.getRange({ line: lfromc+1, ch: 0 }, { line: ltoc, ch: 0 })
                  out = { lf: lfromc, lt: ltoc, code: code.trim(), func: '', isFunc: false }
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
                        this.el('lp5-aux').parentElement.classList.remove('error');
                  }
                  if (valid) {
                        this.validCodeDraw = this.renderCodeDraw;
                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                        //this.main.saveCode('draw', this.validCodeDraw)
                  } else {
                        this.el('lp5-aux').parentElement.classList.add('error');
                  }
            } catch (e) {
                  this.el('lp5-aux').parentElement.classList.add('error');
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
                        this.validCodeAux = "" + this.renderCodeAux;
                        new Function(this.validCodeAux)(global);
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
            // if (this.cmAux.somethingSelected()) {
            //       this.renderCodeAux = this.doGlobals("'use strict';" + this.cmAux.getSelection());
            //       //this.evalSelectFx('lp5-aux', this.getLinesSelected(this.cmAux))
            // } else {
            //this.renderCodeAux = this.doGlobals("'use strict';" + this.cmAux.getValue());
            //this.evalFx('lp5-aux')
            // }
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
                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                        this.el('lp5-console-out').innerHTML = ''
                        //this.main.saveCode('setup', this.validCodeSetup)
                        setup();
                  } else {
                        this.el('lp5-aux').parentElement.classList.add('error');
                  }
            } catch (e) {
                  this.el('lp5-console-out').innerHTML = 'setup: ' + e
                  this.el('lp5-aux').parentElement.classList.add('error');
            }
      },
      evalSetup: function () {
            // if (this.cmAux.somethingSelected()) {
            //       this.renderCodeSetup = "'use strict';" + this.cmAux.getSelection();
            //       //this.evalSelectFx('lp5-aux', this.getLinesSelected(this.cmSetup))
            // } else {
            //this.renderCodeSetup = "'use strict';" + this.cmAux.getValue();
            //this.evalFx('lp5-aux')
            //}
            this.tryEvalSetup()
      },

      tryEvalEvent: function (_evt) {
            try {
                  let valid = true;
                  let word = '';
                  let render = this.main.globalSettings().renderer
                  let wordList = (render == 'webgl') ? this.prog.setup3d : this.prog.setup
                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i];
                        if (_code.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this._code.match(r)) {
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
                        this.validCodeEvent[_evt] = this.renderCodeEvent[_evt];
                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                        this.el('lp5-console-out').innerHTML = ''
                  } else {
                        this.el('lp5-aux').parentElement.classList.add('error');
                  }
            } catch (e) {
                  this.el('lp5-console-out').innerHTML = 'setup: ' + e
                  this.el('lp5-aux').parentElement.classList.add('error');
            }
      },
      evalEvent: function (_evt) {
            // if (this.cmAux.somethingSelected()) {
            //       this.renderCodeSetup = "'use strict';" + this.cmAux.getSelection();
            //       //this.evalSelectFx('lp5-aux', this.getLinesSelected(this.cmSetup))
            // } else {
            //this.renderCodeSetup = "'use strict';" + this.cmAux.getValue();
            //this.evalFx('lp5-aux')
            //}
            this.tryEvalEvent(_evt)
      },
      // Config
      toggleModal: function (el) {
            if (this.el(el).style.display == 'none') {
                  this.el(el).style.display = 'block'
            } else {
                  this.el(el).style.display = 'none'
            }
      },      
      pannelFocus: function (pannel, cur = { line: 0, ch: 0 }) {
            if (pannel == 'aux' && this.cmAux) {
                  this.cmAux.focus()
                  this.cmAux.setCursor(cur)
            }
      },
      // Modo: CLIENTE-SERVIDOR
      evalConn: function (obj) {
            if (this.mode == 'CLIENT') this.client.eval(obj)
            if (this.mode == 'SERVER') this.server.eval(obj)
      }

}