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
      version: '0.2.4',
      p5: {
            version: '0.10.2'
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
      oscData: [],
      oscLib: null,
      oscReady: false,
      oscUDP: null,
      // Env
      clipboard: '',
      selected: false,
      playmode: 'static',
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
      //cmFrag: null,
      //cmVert: null,
      // cmClient:         null,
      cmAuxCp: {
            line: 0,
            ch: 0
      },
      // cmFragCp: {
      //       line: 0,
      //       ch: 0
      // },
      // cmVertCp: {
      //       line: 0,
      //       ch: 0
      // },
      cmSelect: '',
      cmFocused: null,
      // DOM en index.html
      codeAux: document.getElementById('lp5-aux'),
      //codeFrag: document.getElementById('lp5-frag'),
      //codeVert: document.getElementById('lp5-vert'),
      consoleView: document.getElementById('lp5-console'),
      // Almacena los codigos a evaluar
      validCodeDraw: '',
      renderCodeDraw: '',
      validCodeSetup: '',
      renderCodeSetup: '',
      validCodeAux: '',
      renderCodeAux: '',
      // Shader
      //renderCodeFrag: '',
      //renderCodeVert: '',
      //
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
            keyTyped: ''
      },
      customMethods: [],
      // renderExtends: [
      //       'snip',
      //       'loadLib',
      //       'useLib',
      //       'useOSC',
      //       'useAudio',
      //       'useCam',
      //       'loadVideo',
      //       'loadImage',
      //       'loadModel',
      //       'loadStrings',
      //       'loadShader',
      //       'loadJSON',
      //       'loadStrings',
      //       'loadTable',
      //       'loadXML',
      //       'loadFont',
      //       'loadBytes'

      // ],
      auxTxt: '',
      // Escala de los campos a
      scale_st: 1,
      // bg alfa
      bg_code_alpha: 0.8,
      // Mostrar ventanas
      showWin: true,
      // Funciones
      registerMethodToEval(m = null) {
            if (m) {
                  this.customMethods.push(m.toString().trim())
            }
      },
      beautify_js: function (data, o = {}) {
            let ob = {
                  "indent_size": 1,
                  "indent_char": "\t",
                  ...o
            }
            return js_beautify(data, ob);
      },
      // Get DOM element by ID
      el: function (id) {
            return document.getElementById(id)
      },
      // Get DOM element by query
      querySel: function (qs) {
            return document.querySelector(qs)
      },
      // Get DOM elements by query
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
      // Add reserved words
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
      // p5 functions
      p5Words: [
            'mouseClicked',
            'mouseMoved',
            'mouseDragged',
            'mousePressed',
            'mouseReleased',
            'keyReleased',
            'keyPressed',
            'doubleClicked',
            'mouseWheel',
            'windowResized',
            'setup',
            'draw',
            'preload'

      ],
      // Reserved words
      prog: {
            setup: [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'window\.draw',
                  'window\.setup',
                  'global\.draw',
                  'global\.setup',
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
                  'window\.draw',
                  'window\.setup',
                  'global\.draw',
                  'global\.setup',
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
                  'clearDraw',
                  'preload',
                  'canvas',
                  'window\.draw',
                  'window\.setup',
                  'global\.draw',
                  'global\.setup',
                  'createCanvas',
                  'useCam',
                  'useOSC',
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
                  'clearDraw',
                  'window\.draw',
                  'window\.setup',
                  'global\.draw',
                  'global\.setup',
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
                  'useOSC',
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
                  'window\.draw',
                  'window\.setup',
                  'global\.draw',
                  'global\.setup',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'remove',
                  '___audio',
                  '___fft',
                  '___webcam',
                  'ZOOM_SCALE'
            ],
            aux3d: [
                  'draw',
                  'setup ',
                  'preload',
                  'canvas',
                  'createCanvas',
                  'window\.draw',
                  'window\.setup',
                  'global\.draw',
                  'global\.setup',
                  // 'text',
                  // 'textAlign',
                  // 'textLeading',
                  // 'textSize',
                  // 'textStyle',
                  // 'textWidth',
                  // 'textAscent',
                  // 'textDescent',
                  // 'textFont',
                  'remove',
                  '___audio',
                  '___fft',
                  '___webcam',
                  'ZOOM_SCALE'
            ]
      },
      // Load files from extends folder
      extendsFile: function (file) {
            return this.main.path().join(this.main.resourcesPath(), 'leparc_resources', 'extends', file)
      },
      checkProgWord: function (_word) {
            // verifica que no se redefinan variables o funciones de p5
            //return `((?<=[\'\"][\s\n\t ]*)${_word}|[\.\$]${_word}|[\=|\(]{1}[\s\n\t ]*[\{]{1}[\s\n\t ]*[0-9a-zA-Z\:\'\"\,\. \s]*[\s\n\t ]*${_word}[\s\n\t ]*[\:]{1}|[\/]{2}[\s\t\'\"\n ]*${_word})`
            return `((?<=["\'\.a-zA-Z0-9])[\t \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*${_word}|(?<=\/\/[ \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]*)${_word}|${_word}(?=[a-zA-Z0-9]))`;
      },
      doGlobals: function (_code) {
            // Cambia a globales las variables fuera de las funciones
            return _code.replace(/\$(?!\{)(?! )(?!\&)/g, 'lp.')
      },
      evalLivecoding: function (onfly) {
            if (this.blockData.isFunc) {
                  if (this.blockData.func == 'setup') {
                        this.renderCodeSetup = this.doGlobals("'use strict';" + this.blockData.code)
                        this.tryEval('setup')
                  }
                  if (this.blockData.func == 'draw') {
                        this.renderCodeDraw = this.doGlobals("'use strict';" + this.blockData.code)
                        this.evalDraw()

                  }
                  for (var key in this.renderCodeEvent) {
                        if (this.blockData.func == key) {
                              this.renderCodeEvent[key] = this.doGlobals("'use strict';" + this.blockData.code)
                              this.evalEvent(key)
                              break;

                        }
                  }
                  if (this.blockData.func == 'any' || this.blockData.func == 'any_named' || this.blockData.func == 'method') {
                        this.renderCodeAux = this.doGlobals("'use strict';" + this.blockData.code)
                        this.tryEval('aux')
                  }
            } else {
                  this.renderCodeAux = this.doGlobals("'use strict';" + this.blockData.code)
                  this.tryEval('aux')
            }
            if (!onfly) this.evalLineFx('lp5-aux', this.blockData.lf, this.blockData.lt)
            // 
            this.evalConn(Lp5.blockData)
      },
      checkInside(cm, o) {
            let opens2 = 0
            let brackets2 = false
            // check if inside other function
            let o2 = {
                  lf: o.lf
            }
            while (o2.lf > 0) {
                  o2.lf--
                  if (cm.getLine(o2.lf).match(/\)/g)) {
                        brackets2 = true
                        let len = cm.getLine(o2.lf).match(/\)/g).length
                        opens2 += len;
                  }
                  if (cm.getLine(o2.lf).match(/\(/g)) {
                        brackets2 = true
                        let len = cm.getLine(o2.lf).match(/\(/g).length
                        opens2 -= len;
                  }
                  if (brackets2 && opens2 < 0) {
                        if (cm.getLine(o2.lf).match(/[\t ]*[\$\w\= ]+[\t ]*\(/g) && !cm.getLine(o2.lf).match(/^[\t s]*\.[\t ]*[\$\w]+[\t ]*\(/g) && !cm.getLine(o2.lf).match(/(?:^[\t ]*for[\t ]*\(|^[\t ]*if[\t ]*\(|^[\t ]*while[\t ]*\(|^[\t ]*catch[\t ]*\(|^[\t ]*switch[\t ]*\()/g)) {
                              this.checkInside(cm, o2)
                              o.lf = o2.lf
                        }
                  }

            }
      },
      getCodeLines: function (cm, cp) {
            let lfrom = cp.line
            let lto = cp.line
            let out = ''
            let code = ''

            while (lfrom >= 0 && cm.getLine(lfrom) != "") {
                  lfrom--
            }
            while (lto < cm.lineCount() && cm.getLine(lto) != '') {
                  lto++
            }
            code = cm.getRange({ line: lfrom + 1, ch: 0 }, { line: lto, ch: 0 })
            out = { lf: lfrom, lt: lto, code: code.trim(), func: '', isFunc: false }
            return out
      },
      // Get functions or lines from editor by context
      // Obtener funciones o lineas para evaluar segun el contexto
      getCodeBlock: function (cm, cp) {
            let lfrom = cp.line
            let lto = cp.line
            let lfromc = cp.line
            let ltoc = cp.line
            let linepos = cp.line
            let out = ''
            let func = ''
            let code = ''
            // Encuentra la funcion setup o draw / Find draw or setup
            evtsln:
            while (lfrom >= 0) {
                  // Setup
                  lto = lfrom
                  if (cm.getLine(lfrom).match(/^[\t ]*function[\t ]+setup[\t ]*\([\t ]*\)/g)) {
                        func = 'setup'
                        break;
                  }
                  // Draw
                  if (cm.getLine(lfrom).match(/^[\t ]*function[\t ]+draw[\t ]*\([\t ]*\)/g)) {
                        func = 'draw'
                        break;
                  }
                  // Funcion generica named
                  if (cm.getLine(lfrom).match(/^[\t ]*function[\t ]+[\w]+\(/g)) {
                        func = 'any_named'
                        break evtsln;
                  }
                  // Funcion evento
                  for (var key in this.renderCodeEvent) {
                        let reg = new RegExp("^[\\t ]*function[\\t ]+" + key + "[\\t ]*\\([\\t ]*\\)", "g")
                        if (cm.getLine(lfrom).match(reg)) {
                              func = key
                              break evtsln;
                        }
                  }
                  // Method custom
                  for (let i = 0; i < this.customMethods.length; i++) {
                        let key = this.customMethods[i]
                        let reg = new RegExp("^[\\t ]*(?!=\\.)" + key + "[\\t ]*\\(", "g")
                        if (cm.getLine(lfrom).match(reg)) {
                              func = 'method'
                              break evtsln;
                        }
                  }
                  // Funcion generica anonima
                  if (cm.getLine(lfrom).match(/^[\t ]*[\$\w\.]+[\t ]*\=[\t ]*(function[\t ]*\(.*\)|\(.*\)[\t ]*\=\>[\t ]*|[\w]+[\t ]*\=\>[\t ]*)/g)) {
                        func = 'any'
                        break evtsln;
                  }
                  // Metodos
                  if (cm.getLine(lfrom).match(/^[\t ]*[\$\w\.\= ]+[\t ]*\(/g) && !cm.getLine(lfrom).match(/^[\t s]*\.[\t ]*[\$\w]+[\t ]*\(/g) && !cm.getLine(lfrom).match(/(?:^[\t ]*for[\t ]*\(|^[\t ]*if[\t ]*\(|^[\t ]*while[\t ]*\(|^[\t ]*catch[\t ]*\(|^[\t ]*switch[\t ]*\()/g)) {
                        let tmp_lfrom = lfrom
                        let opens = 0
                        let opens2 = 0
                        let brackets = false
                        let brackets2 = false
                        // check if inside other function
                        while (tmp_lfrom > 0) {
                              tmp_lfrom--
                              if (cm.getLine(tmp_lfrom).match(/\}/g)) {
                                    brackets = true
                                    let len = cm.getLine(tmp_lfrom).match(/\}/g).length
                                    opens += len;
                              }
                              if (cm.getLine(tmp_lfrom).match(/\{/g)) {
                                    brackets = true
                                    let len = cm.getLine(tmp_lfrom).match(/\{/g).length
                                    opens -= len;
                              }
                              if (cm.getLine(tmp_lfrom).match(/\)/g)) {
                                    brackets2 = true
                                    let len = cm.getLine(tmp_lfrom).match(/\)/g).length
                                    opens2 += len;
                              }
                              if (cm.getLine(tmp_lfrom).match(/\(/g)) {
                                    brackets2 = true
                                    let len = cm.getLine(tmp_lfrom).match(/\(/g).length
                                    opens2 -= len;
                              }
                              if (brackets2 && opens2 < 0) {
                                    if (cm.getLine(tmp_lfrom).match(/^[\t ]*[\$\w\= ]+[\t ]*\(/g) && !cm.getLine(tmp_lfrom).match(/^[\t s]*\.[\t ]*[\$\w]+[\t ]*\(/g) && !cm.getLine(tmp_lfrom).match(/(?:^[\t ]*for[\t ]*\(|^[\t ]*if[\t ]*\(|^[\t ]*while[\t ]*\(|^[\t ]*catch[\t ]*\(|^[\t ]*switch[\t ]*\()/g)) {
                                          let o = {
                                                lf: tmp_lfrom
                                          }
                                          this.checkInside(cm, o)
                                          func = 'method'
                                          lfrom = o.lf
                                          lto = lfrom
                                          // last found ???
                                          //tmp_lfrom = o.lf
                                          break evtsln;
                                    }
                              }
                              if (brackets && opens < 0) {
                                    if (cm.getLine(tmp_lfrom).match(/^[\t ]*function[\t\s ]+setup[\t\s ]*\([\t\s ]*\)/g)) {
                                          func = 'setup'
                                          lfrom = tmp_lfrom
                                          lto = lfrom
                                          break evtsln;
                                    }
                                    if (cm.getLine(tmp_lfrom).match(/^[\t ]*function[\t\s ]+draw[\t\s ]*\([\t\s ]*\)/g)) {
                                          func = 'draw'
                                          lfrom = tmp_lfrom
                                          lto = lfrom
                                          break evtsln;
                                    }
                                    if (cm.getLine(tmp_lfrom).match(/^[\t ]*function[\t\s ]+[\w]+\(.*\)/g)) {
                                          func = 'any_named'
                                          lfrom = tmp_lfrom
                                          lto = lfrom
                                          break evtsln;
                                    }
                                    if (cm.getLine(tmp_lfrom).match(/^[\t ]*[\w\$]+[\t ]*\=[\t ]*(function[\t\s ]*\(.*\)|\(.*\)[\t ]*\=\>[\t ]*|[\w]+[\t ]*\=\>[\t ]*)/g)) {
                                          func = 'any'
                                          lfrom = tmp_lfrom
                                          lto = lfrom
                                          break evtsln;

                                    }
                              }
                        }
                        func = 'method'
                        break evtsln;
                  }
                  lfrom--
            }
            if (func == 'method') {
                  let opens = 0
                  let brackets = true
                  while (lto < cm.lineCount()) {

                        if (cm.getLine(lto).match(/\)/g)) {
                              brackets = true
                              let len = cm.getLine(lto).match(/\)/g).length
                              opens += len;
                        }
                        if (cm.getLine(lto).match(/\(/g)) {
                              brackets = true
                              let len = cm.getLine(lto).match(/\(/g).length
                              opens -= len;
                        }
                        if (brackets && opens == 0 && cm.getLine(lto).match(/\)/g)) {
                              break
                        }
                        lto++
                  }
                  if (opens == 0) {
                        code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 }).trim()
                  } else {
                        lto = 0
                        lfrom = 0
                        code = ''
                  }
            }
            if (func == 'setup' || func == 'draw') {
                  let opens = 0
                  let brackets = false
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
                  if (opens == 0) {
                        code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 }).trim().replace(new RegExp('^function[\\t ]+' + func + '[\\t ]*\\([\\t ]*\\)[\\t\\n\\s ]*\\{', 'g'), '').replace(new RegExp('\\}$', 'g'), '')
                  } else {
                        lto = 0
                        lfrom = 0
                        code = ''
                  }
            }
            if (func == 'any' || func == 'any_named') {
                  let opens = 0
                  let brackets = false
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
                  if (opens == 0) {
                        //Funcion completa
                        code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 })
                        // Try convert nammed function to global
                        if (func == 'any_named') {
                              // Algunos errores no pueden ser atrapados. Se incluye try en el contenido
                              code = code.replace(/(function[\s\t ]+[\w]+\(.*\)[\s\t ]*\{[\s\t ]*)(.*\n\r)(\})/igm, "$1try{\n$2\n}catch(e){\nLp5.el('lp5-console-out').innerHTML = e;\nLp5.el('lp5-aux').parentElement.classList.add('error');}\n$3")
                              code = code.replace(/function[\s\t ]/gi, "window.").replace(/(window\.[\w]+)+/gi, "$1 = function")
                        }
                  } else {
                        lto = 0
                        lfrom = 0
                        code = ''
                  }
            }
            for (var key in this.renderCodeEvent) {
                  if (func == key) {
                        let opens = 0
                        let brackets = false
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

                        if (opens == 0) {
                              code = cm.getRange({ line: lfrom, ch: 0 }, { line: lto + 1, ch: 0 }).trim().replace(new RegExp('^function[\\t ]+' + func + '[\\t ]*\\([\\t ]*\\)[\\t\\n\\s ]*\\{', 'g'), '').replace(new RegExp('\\}$', 'g'), '')
                        } else {
                              lto = 0
                              lfrom = 0
                              code = ''
                        }
                        break;
                  }
            }
            // Verifica que el cursor este entre llaves
            // Check if cursor/caret is between brackets
            if (func != '' && linepos >= lfrom && linepos <= lto) {
                  out = { lf: lfrom - 1, lt: lto + 1, code: code.trim(), func: func, isFunc: true }
            } else {
                  while (lfromc >= 0 && cm.getLine(lfromc) != "") {
                        if (cm.getLine(lfromc).match(/^[\t ]*\}/g)) break;
                        lfromc--
                  }
                  while (ltoc < cm.lineCount() && cm.getLine(ltoc) != "") {
                        if (cm.getLine(ltoc).match(/^[\t ]*(function[\t ]*[\w\$]*[\t ]*\(.*\)|\(.*\)[\t ]*\=\>[\t ]*|[\w]+[\t ]*\=\>[\t ]*)/g)) break;
                        ltoc++
                  }
                  code = cm.getRange({ line: lfromc + 1, ch: 0 }, { line: ltoc, ch: 0 })
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
      // En modo STATIC, las funciones se resetean en cada evaluacion
      // Using STATIC mode set null every evaluation
      clearEvts: function () {
            // p5js events prop
            mouseClicked = null
            windowResized = null
            mouseMoved = null
            mouseDragged = null
            mousePressed = null
            mouseReleased = null
            doubleClicked = null
            keyReleased = null
            keyPressed = null
            mouseWheel = null
            draw = null
            setup = null
            preload = null
      },
      startDraw: function () {
            // FPS
            this.fps = getFrameRate();
            // // Revisar
            if ((this.historyChangesSetup + this.historyChangesDraw + this.historyChangesAux) > 0) {
                  this.el('lp5-os-status').classList.add('unsave')
            } else {
                  this.el('lp5-os-status').classList.remove('unsave')
            }
            // Clear -------------------------------
            //if (Lp5.cmDraw.getValue().trim() == '') clear()
            CENTERW = width / 2
            CENTERH = height / 2
            // reset -------------------------------
            strokeWeight(1)
            blendMode(BLEND)
            stroke(0)

            // funciones en WEBGL ----
            try {
                  if (___webgl) {
                        // en use3d -> default
                        directionalLight(100, 100, 100, 1, 1, 0)
                        ambientLight(50)
                        colorMode(RGB, 255, 255, 255)
                        ambientMaterial(color(167, 167, 167))
                  } else {
                        noTint()

                  }
                  textLeading(15)
                  textSize(15)
                  textAlign(LEFT, TOP)
                  textStyle(NORMAL)
            } catch (e) {
                  //
            }
      },
      evalDraw: function (onfly = false) {
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
                  if (valid) {
                        try {
                              // Verrifica errores / check errors
                              new Function(this.renderCodeDraw)()
                        } catch (e) {
                              if (onfly) new Function(Lp5.validCodeDraw)()
                              valid = false
                              this.el('lp5-console-out').innerHTML = 'draw: ' + e
                              this.el('lp5-aux').parentElement.classList.remove('error');
                        }
                  }
                  if (valid) {
                        this.validCodeDraw = this.renderCodeDraw;
                        if (onfly) new Function(Lp5.validCodeDraw)()
                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                  } else {
                        this.el('lp5-aux').parentElement.classList.add('error');
                        if (onfly) new Function(Lp5.validCodeDraw)()
                  }
            } catch (e) {
                  this.el('lp5-aux').parentElement.classList.add('error');
                  this.el('lp5-console-out').innerHTML = '| draw: ' + e
                  if (onfly) new Function(Lp5.validCodeDraw)()
            }
      },
      evalAll: function () {
            try {
                  new Function(this.renderCodeAux)()
                  this.el('lp5-aux').parentElement.classList.remove('error');
                  this.el('lp5-aux').parentElement.classList.remove('change');

            } catch (e) {
                  //new Function(this.renderCodeAux)()
                  this.el('lp5-aux').parentElement.classList.add('error');
                  this.el('lp5-console-out').innerHTML = e
                  console.log(e)
            }
      },
      tryEval: function (_block) {
            try {
                  let valid = true;
                  let word = '';
                  let render = this.main.globalSettings().renderer
                  let wordList, renderCode
                  if (_block == 'aux') {
                        renderCode = this.renderCodeAux
                        wordList = (render == 'webgl') ? this.prog.aux3d : this.prog.aux
                  } else {
                        renderCode = this.renderCodeSetup
                        wordList = (render == 'webgl') ? this.prog.setup3d : this.prog.setup
                  }

                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i]
                        if (renderCode.includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!renderCode.match(r)) {
                                    valid = false;
                                    if (render == 'webgl') {
                                          this.el('lp5-console-out').innerHTML = '| ' + _block + ': ' + word + ' ' + lang_msg.priv_words_render
                                    } else {
                                          this.el('lp5-console-out').innerHTML = '| ' + _block + ': ' + word + ' ' + lang_msg.priv_words
                                    }
                              }
                        }
                  }
                  if (valid) {
                        if (_block == 'aux') {
                              this.validCodeAux = renderCode;
                              new Function(this.validCodeAux)();
                        }
                        if (_block == 'setup') this.validCodeSetup = renderCode;

                        this.el('lp5-aux').parentElement.classList.remove('error');
                        this.el('lp5-aux').parentElement.classList.remove('change');
                        this.el('lp5-console-out').innerHTML = ''
                        if (_block == 'setup') setup();
                  } else {
                        this.el('lp5-aux').parentElement.classList.add('error');
                  }
            } catch (e) {
                  console.trace('en ' + _block + ': ' + e);
                  this.el('lp5-console-out').innerHTML = '| ' + _block + ': ' + e
                  this.el('lp5-aux').parentElement.classList.add('error');
            }
      },
      tryEvalEvent: function (_evt) {
            try {
                  let valid = true;
                  let word = '';
                  let render = this.main.globalSettings().renderer
                  let wordList = (render == 'webgl') ? this.prog.aux3d : this.prog.aux
                  for (let i = 0; i < wordList.length; i++) {
                        word = wordList[i];
                        if (this.renderCodeEvent[_evt].includes(word)) {
                              let r = new RegExp(this.checkProgWord(word))
                              if (!this.renderCodeEvent[_evt].match(r)) {
                                    valid = false;
                                    if (render == 'webgl') {
                                          this.el('lp5-console-out').innerHTML = '| ' + _evt + ': ' + word + ' ' + lang_msg.priv_words_render
                                    } else {
                                          this.el('lp5-console-out').innerHTML = '| ' + _evt + ': ' + word + ' ' + lang_msg.priv_words
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
            if (Lp5.playmode == 'livecoding') {
                  if (this.mode == 'CLIENT') this.client.eval(obj)
                  if (this.mode == 'SERVER') this.server.eval(obj)
            }
      }

}