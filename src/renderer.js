// -----------------------------------------------------
// Duchamp Object --------------------------------------
// -----------------------------------------------------
let Dp5 = {
      // Canvas
      canvas:null,
      // mian.js
      main: require('electron').remote.require('./main'),
      fullscreen: false,
      devtools: false,
      fps: 0,
      historyChanges:0,
      // Codemirror
      cmSetup: null,
      cmDraw: null,
      cmAux: null,
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
      codeSetup: document.getElementById('dp5-setup'),
      codeDraw: document.getElementById('dp5-draw'),
      codeAux: document.getElementById('dp5-aux'),
      consoleView: document.getElementById('dp5-console'),
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
      glogalTxt: '',
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
      caretEnd(el) {
            let len = el.getValue().length;
            el.setCursor(len)
      },
      addSysName: function (name) {
            this.prog.push(name)
      },
      changeBgLineAlpha: function(){
            let els = document.querySelectorAll(".CodeMirror-line>span")
            for(let i = 0; i < els.length;i++){
                  els[i].style.backgroundColor =  "rgba(0,0,0," + this.bg_code_alpha + ")";
            }
      },
      // Palabras reservadas
      prog:
            [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas',
            ]
}
// Init
window.addEventListener('load', function () {
      setInterval(() => {
            // Memoria
            Dp5.el('dp5-os-ram').innerText = '| free ram:' + Dp5.main.getMemory() + "%";
      }, 2000)
      setInterval(() => {
            // FPS
            Dp5.el('dp5-os-fps').innerText = '| fps:' + Math.round(Dp5.fps);
      }, 500)
});

// ********************************************************************
// P5js ***************************************************************
// ********************************************************************
function preload() {
      // try {
      //       console.log(Dp5.main.loadImgsBank())
      // } catch (e) {
      //       console.log(e)
      // }

      // Code mirror
      Dp5.cmSetup = CodeMirror(Dp5.codeSetup, {
            mode: "javascript"
      });
      // Init cursor
      Dp5.cmSetup.focus()
      Dp5.cmSetup.setCursor({ line: 0, ch: 0 })

      Dp5.cmDraw = CodeMirror(Dp5.codeDraw, {
            mode: "javascript"
      });
      Dp5.cmAux = CodeMirror(Dp5.codeAux, {
            mode: "javascript"
      });
      Dp5.setupTxt = loadStrings(Dp5.main.savePath() + '/duchamplc-resources/save/setup.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.setupTxt.length; i++) {
                  txt += Dp5.setupTxt[i] + '\n';
            }
            try {
                  // Dp5.codeSetup.innerText = Dp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Dp5.cmSetup.setValue(txt.trim());
                  } else {
                        Dp5.cmSetup.setValue('// Hola Duchamp!!');
                  }
                  // Carga en setup
                  // Dp5.renderCodeSetup = txt.trim()
                  // Llama a setup
                  // setup()
            } catch (e) {
                  console.log(e)
                  //Dp5.main.saveCode('setup', '// Hola Duchamp!!')
            }

      })
      Dp5.drawTxt = loadStrings(Dp5.main.savePath() + '/duchamplc-resources/save/draw.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.drawTxt.length; i++) {
                  txt += Dp5.drawTxt[i] + '\n';
            }
            try {
                  // Dp5.codeDraw.innerHTML = Dp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Dp5.cmDraw.setValue(txt.trim());
                  } else {
                        Dp5.cmSetup.setValue('// Hola Duchamp!!');
                  }
                  // Dp5.renderCodeDraw = txt.trim()
            } catch (e) {
                  console.log(e)
                  //Dp5.main.saveCode('draw', '// Hola Duchamp!!')
            }
      })
      Dp5.auxTxt = loadStrings(Dp5.main.savePath() + '/duchamplc-resources/save/aux.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.auxTxt.length; i++) {
                  txt += Dp5.auxTxt[i] + '\n';
            }
            try {
                  // Dp5.codeAux.innerHTML = Dp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Dp5.cmAux.setValue(txt.trim());
                  } else {
                        Dp5.cmSetup.setValue('// Hola Duchamp!!');
                  }
            } catch (e) {
                  console.log(e)
                  //Dp5.main.saveCode('aux', '// Hola Duchamp!!')
            }
      })
}
function setup() {
      // Init setup --------------------------
      let cnv = createCanvas(windowWidth, windowHeight);
      Dp5.canvas = cnv.elt
      // Webcam/video capture
      ___webcam = null;
      // Audio
      if (___audio != null) {
            ___audio.disconnect()
            ___audio = null
            ___fft = null
      }
      // default fps
      setFrameRate(60)
      imageMode(CORNER)
      rectMode(CORNER)
      ellipseMode(CENTER)
      background(0);
      colorMode(RGB, 255)
      // Live --------------------------------
      new Function(Dp5.validCodeSetup)();


}
function draw() {
      // FPS
      Dp5.fps = getFrameRate();
      // Live --------------------------------
      new Function(Dp5.validCodeDraw)();
}
function windowResized() {
      try {
            resizeCanvas(windowWidth, windowHeight);
            //setup();
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

Dp5.codeAux.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Dp5.cmAuxCp.line = Dp5.cmAux.getCursor().line;
      Dp5.cmAuxCp.ch = Dp5.cmAux.getCursor().ch;
      Dp5.panelIndex = 2
})
Dp5.codeAux.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Dp5.cmAuxCp.line = Dp5.cmAux.getCursor().line;
      Dp5.cmAuxCp.ch = Dp5.cmAux.getCursor().ch;

      if (Dp5.cmAux.getValue() == '') {
            Dp5.cmAux.setValue('// Code!');
            Dp5.caretEnd(Dp5.cmAux);
      }
      //Verifica si se escribio algo
      if (Dp5.validCodeAux != Dp5.cmAux.getValue()) {
            Dp5.el('aux-change').innerHTML = '*&nbsp;&nbsp;';
      } else {
            Dp5.el('aux-change').innerHTML = '';
      }
      // Evalua linea ---------------------------------------------------
      if (ev.altKey && ev.keyCode == 13) {
            Dp5.renderCodeAux = Dp5.cmAux.getLine(Dp5.cmAuxCp.line)
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        if (Dp5.renderCodeAux.match(`(\n| ){1,}${Dp5.prog[i]}`)) {
                              let r = new RegExp(`('|") {0,}${Dp5.prog[i]} {0,}('|")`)
                              if (!Dp5.renderCodeAux.match(r)) {
                                    valid = false;
                                    word = Dp5.prog[i];
                                    Dp5.el('dp5-console-out').innerHTML = 'en aux: ' + word + ' no puede ser reescrita';
                              }
                        }
                  }
                  if (valid) {
                        Dp5.validCodeAux = Dp5.renderCodeAux;
                        new Function(Dp5.validCodeAux)();
                        Dp5.el('dp5-aux').classList.remove("error");
                        Dp5.el('dp5-console-out').innerHTML = '';
                  }
            } catch (e) {
                  console.log('en aux eval ' + e);
                  Dp5.el('dp5-console-out').innerHTML = 'en aux: ' + e
                  Dp5.el('dp5-aux').parentElement.classList.add('error');
            }
      }
      // Evalua bloque ---------------------------------------------------
      // function checkValidWord(code, word) {
      //       if (code.match(`(\n| ){1,}${word}`)) {
      //             let r = new RegExp(`('|") {0,}${word} {0,}('|")`)
      //             if (!code.match(r)) {
      //                   //word = word;
      //                   Dp5.el('dp5-draw').innerHTML ='en draw:' + word + ' no puede ser reescrita'
      //                   return false;
      //             } else {
      //                   return true;
      //             }
      //       }
      // }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeAux = Dp5.cmAux.getValue();
            // Live --------------------------------
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        //valid = checkValidWord(Dp5.renderCodeAux, Dp5.prog[i]);
                        if (Dp5.renderCodeAux.match(`(\n| ){1,}${Dp5.prog[i]}`)) {
                              let r = new RegExp(`('|") {0,}${Dp5.prog[i]} {0,}('|")`)
                              if (!Dp5.renderCodeAux.match(r)) {
                                    valid = false;
                                    word = Dp5.prog[i];
                                    Dp5.el('dp5-console-out').innerHTML = 'en aux: ' + word + ' no puede ser reescrita'
                              }
                        }
                  }
                  if (valid) {
                        Dp5.validCodeAux = Dp5.renderCodeAux;
                        new Function(Dp5.validCodeAux)();
                        // try {
                        //       Dp5.codeAux.innerHTML = Dp5.beautify_js(Dp5.codeAux.innerText)
                        // } catch (e) {
                        //       console.log(e)
                        // }
                        Dp5.el('dp5-aux').parentElement.classList.remove('error');
                        Dp5.el('dp5-console-out').innerHTML = ''
                        Dp5.main.saveCode('aux', Dp5.renderCodeAux)
                        Dp5.historyChanges++
                  }
            } catch (e) {
                  console.log('en aux: ' + e);
                  Dp5.el('dp5-console-out').innerHTML = 'en aux:' + e
                  Dp5.el('dp5-aux').parentElement.classList.add('error');
            }
      }
});
Dp5.codeAux.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey && !ev.altKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Dp5.scale_ax -= 0.1;
            }
            if (dir == -1) {
                  Dp5.scale_ax += 0.1;
            }
            if (Dp5.scale_ax > 0.05) {
                  Dp5.codeAux.style.fontSize = Dp5.scale_ax + "rem";
                  Dp5.codeAux.style.lineHeight = (Dp5.scale_ax * 1.4) + "rem";
                  Dp5.cmAux.refresh()
            } else {
                  Dp5.scale_ax = 0.05;
            }
      }
});
// -----------------------------------------------------
// SETUP EVENTS ----------------------------------------
Dp5.codeSetup.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Dp5.cmSetupCp.line = Dp5.cmSetup.getCursor().line;
      Dp5.cmSetupCp.ch = Dp5.cmSetup.getCursor().ch;
      Dp5.panelIndex = 0
})
Dp5.codeSetup.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Dp5.cmSetupCp.line = Dp5.cmSetup.getCursor().line;
      Dp5.cmSetupCp.ch = Dp5.cmSetup.getCursor().ch;

      if (Dp5.cmSetup.getValue() == '') {
            Dp5.cmSetup.setValue('// Hola Duchamp!');
            Dp5.caretEnd(Dp5.cmSetup);
      }
      // Verifica si se escribio algo
      if (Dp5.validCodeSetup != Dp5.cmSetup.getValue()) {
            Dp5.el('setup-change').innerHTML = '*&nbsp;&nbsp;';
      } else {
            Dp5.el('setup-change').innerHTML = '';
      }
      // Evalua linea ---------------------------------------------------
      if (ev.altKey && ev.keyCode == 13) {
            Dp5.renderCodeSetup = Dp5.cmSetup.getLine(Dp5.cmSetupCp.line)
            // Dp5.renderCodeSetup = Dp5.cmSetup.getValue();
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        if (Dp5.renderCodeSetup.match(`(\n| ){1,}${Dp5.prog[i]}`)) {
                              let r = new RegExp(`('|") {0,}${Dp5.prog[i]} {0,}('|")`)
                              if (!Dp5.renderCodeSetup.match(r)) {
                                    valid = false;
                                    word = Dp5.prog[i];
                                    Dp5.el('dp5-console-out').innerHTML = 'en setup: ' + word + ' no puede ser reescrita'
                              }
                        }
                  }
                  if (valid) {
                        Dp5.validCodeSetup = Dp5.renderCodeSetup;
                        Dp5.el('dp5-setup').parentElement.classList.remove('error');
                        Dp5.el('dp5-console-out').innerHTML = ''
                        new Function(Dp5.validCodeSetup)()
                        Dp5.main.saveCode('setup', Dp5.validCodeSetup)
                        Dp5.historyChanges++
                  } else {
                        Dp5.el('dp5-setup').parentElement.classList.add('error');
                  }
            } catch (e) {
                  Dp5.el('dp5-console-out').innerHTML = 'setup: ' + e
                  Dp5.el('dp5-setup').parentElement.classList.add('error');
            }
      }
      // Evalua bloque ----------------------------------------------------------
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeSetup = Dp5.cmSetup.getValue();
            // try {
            //       Dp5.cmSetup.setValue(Dp5.beautify_js(Dp5.cmSetup.getValue()))
            // } catch (e) {
            //       console.log(e)
            // }
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        if (Dp5.renderCodeSetup.match(`(\n| ){1,}${Dp5.prog[i]}`)) {
                              let r = new RegExp(`('|") {0,}${Dp5.prog[i]} {0,}('|")`)
                              if (!Dp5.renderCodeSetup.match(r)) {
                                    valid = false;
                                    word = Dp5.prog[i];
                                    Dp5.el('dp5-console-out').innerHTML = 'en setup: ' + word + ' no puede ser reescrita'
                              }
                        }
                  }
                  if (valid) {
                        Dp5.validCodeSetup = Dp5.renderCodeSetup;
                        Dp5.el('dp5-setup').parentElement.classList.remove('error');
                        Dp5.el('dp5-console-out').innerHTML = ''
                        Dp5.main.saveCode('setup', Dp5.validCodeSetup)
                        Dp5.historyChanges++
                        setup();
                  } else {
                        Dp5.el('dp5-setup').parentElement.classList.add('error');
                  }
            } catch (e) {
                  Dp5.el('dp5-console-out').innerHTML = 'setup: ' + e
                  Dp5.el('dp5-setup').parentElement.classList.add('error');
            }
      }
});
Dp5.codeSetup.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey && !ev.altKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Dp5.scale_st -= 0.1;
            }
            if (dir == -1) {
                  Dp5.scale_st += 0.1;
            }
            if (Dp5.scale_st > 0.05) {
                  Dp5.codeSetup.style.fontSize = Dp5.scale_st + "rem";
                  Dp5.codeSetup.style.lineHeight = (Dp5.scale_st * 1.5) + "rem";
                  Dp5.cmSetup.refresh()
            } else {
                  Dp5.scale_st = 0.05;
            }
      }
});

// -----------------------------------------------------
// DRAW EVENTS -----------------------------------------
Dp5.codeDraw.addEventListener('click', (ev) => {
      // Obtiene la ultima posicion del cursor
      Dp5.cmDrawCp.line = Dp5.cmDraw.getCursor().line;
      Dp5.cmDrawCp.ch = Dp5.cmDraw.getCursor().ch;
      Dp5.panelIndex = 1
});
Dp5.codeDraw.addEventListener('keyup', (ev) => {
      // Obtiene la ultima posicion del cursor
      Dp5.cmDrawCp.line = Dp5.cmDraw.getCursor().line;
      Dp5.cmDrawCp.ch = Dp5.cmDraw.getCursor().ch;

      if (Dp5.cmDraw.getValue() == '') {
            Dp5.cmDraw.setValue('// Hora de livecoding!');
            Dp5.caretEnd(Dp5.cmDraw);
      }
      // Verifica si se escribio algo
      // if (Dp5.validCodeDraw != Dp5.cmDraw.getValue()) {
      //       $('#draw-change').html('*&nbsp;&nbsp;');
      // } else {
      //       $('#draw-change').html('');
      // }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeDraw = Dp5.cmDraw.getValue();
            // try {
            //       Dp5.codeDraw.innerHTML = Dp5.beautify_js(Dp5.codeDraw.innerText)
            // } catch (e) {
            //       console.log(e)
            // }
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        if (Dp5.renderCodeDraw.match(`(\n| ){1,}${Dp5.prog[i]}`)) {
                              let r = new RegExp(`('|") {0,}${Dp5.prog[i]} {0,}('|")`)
                              if (!Dp5.renderCodeDraw.match(r)) {
                                    valid = false;
                                    word = Dp5.prog[i];
                                    Dp5.el('dp5-console-out').innerHTML = 'en draw: ' + word + ' no puede ser reescrita'
                              }
                        }
                  }
                  // Try eval
                  // Verificar que se ejecuta correctamente
                  try {
                        new Function(Dp5.renderCodeDraw)()
                  } catch (e) {
                        valid = false
                        Dp5.el('dp5-console-out').innerHTML = 'draw:' + e
                  }
                  if (valid) {
                        Dp5.validCodeDraw = Dp5.renderCodeDraw;
                        Dp5.el('dp5-draw').parentElement.classList.remove('error');
                        Dp5.main.saveCode('draw', Dp5.validCodeDraw)
                        Dp5.historyChanges++
                  } else {
                        Dp5.el('dp5-draw').parentElement.classList.add('error');
                  }
            } catch (e) {
                  Dp5.el('dp5-draw').parentElement.classList.add('error');
                  Dp5.el('dp5-console-out').innerHTML = 'draw: ' + e
            }
      }
});

Dp5.codeDraw.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey && !ev.altKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Dp5.scale_dr -= 0.1;
            }
            if (dir == -1) {
                  Dp5.scale_dr += 0.1;
            }
            if (Dp5.scale_dr > 0.05) {
                  Dp5.codeDraw.style.fontSize = Dp5.scale_dr + "rem";
                  Dp5.codeDraw.style.lineHeight = (Dp5.scale_dr * 1.4) + "rem";
                  Dp5.cmDraw.refresh()
            } else {
                  Dp5.scale_dr = 0.05;
            }
      }
});
// Paste ------------------------------------------
Dp5.codeSetup.addEventListener("paste", (ev) => {
      //Dp5.cmSetup.setValue(ev.clipboardData.getData('text/plain'))
});

Dp5.codeDraw.addEventListener("paste", (ev) => {
      //Dp5.cmDraw.setValue(ev.clipboardData.getData('text/plain'))
});

Dp5.codeAux.addEventListener("paste", (ev) => {
      //Dp5.cmAux.setValue(ev.clipboardData.getData('text/plain'))
});
// -----------------------------------------------------
// -----------------------------------------------------

// -----------------------------------------------------
// Global keyup event ----------------------------------
document.addEventListener('keyup', (ev) => {
      //console.log(ev.keyCode)
      if(ev.ctrlKey && ev.keyCode == 90){
            ev.preventDefault();
            return false
      }

      // Fullscreen ----------------------------
      if (ev.keyCode == 122) {
            if (!Dp5.fullscreen) {
                  Dp5.main.setFull();
                  Dp5.fullscreen = true;
            } else {
                  Dp5.main.setUnFull();
                  Dp5.fullscreen = false;
            }
      }
      // Chrome Devtools ----------------------------
      if (ev.keyCode == 121) {
            if (!Dp5.devtools) {
                  Dp5.main.devTools(true);
                  Dp5.devtools = true;
            } else {
                  Dp5.main.devTools(false);
                  Dp5.devtools = false;
            }
      }
      // Recargar
      if (ev.keyCode == 116) {
            Dp5.main.reload();
      }
      // Mostrar/ocultar paneles
      if (ev.keyCode == 112) {
            if (Dp5.showSetupWin) {
                  Dp5.el('dp5-setup').style.display = 'none';
                  Dp5.showSetupWin = false;
            } else {
                  Dp5.el('dp5-setup').style.display = 'inline';
                  Dp5.showSetupWin = true;
            }
      }
      if (ev.keyCode == 113) {
            if (Dp5.showDrawWin) {
                  Dp5.el('dp5-draw').style.display = 'none';
                  Dp5.showDrawWin = false;
            } else {
                  Dp5.el('dp5-draw').style.display = 'inline';
                  Dp5.showDrawWin = true;
            }
      }
      if (ev.keyCode == 114) {
            if (Dp5.showAuxWin) {
                  Dp5.el('dp5-aux').style.display = 'none';
                  Dp5.showAuxWin = false;
            } else {
                  Dp5.el('dp5-aux').style.display = 'inline';
                  Dp5.showAuxWin = true;
            }
      }
      // Mostrar/ocultar codigo
      if (ev.ctrlKey && ev.keyCode == 72) {
            if (Dp5.showWin) {
                  Dp5.el('win').style.display = 'none';
                  Dp5.showWin = false;
            } else {
                  Dp5.el('win').style.display = 'inline';
                  Dp5.showWin = true;
            }
      }
      // Exit
      if (ev.keyCode == 27) {
            if (confirm(":( salir de la aplicación??")) {
                  Dp5.main.exit();
            }

      }
      // Focus panels ---------------------------------------------------------------------
      if (ev.ctrlKey && (ev.keyCode == 32)) {
            Dp5.panelIndex++
            ev.preventDefault();
            if (Dp5.panelIndex > 2) Dp5.panelIndex = 0;
            if (Dp5.panelIndex == 0) {
                  Dp5.cmSetup.focus()
                  Dp5.cmSetup.setCursor({ line: Dp5.cmSetupCp.line, ch: Dp5.cmSetupCp.ch })
            }
            if (Dp5.panelIndex == 1) {
                  Dp5.cmDraw.focus()
                  Dp5.cmDraw.setCursor({ line: Dp5.cmDrawCp.line, ch: Dp5.cmDrawCp.ch })
            }
            if (Dp5.panelIndex == 2) {
                  Dp5.cmAux.focus()
                  Dp5.cmAux.setCursor({ line: Dp5.cmAuxCp.line, ch: Dp5.cmAuxCp.ch })
            }
      }
      Dp5.changeBgLineAlpha()

});
// Global keydown event -----------------------------------
document.addEventListener('keydown', function (ev) {
      //console.log(ev.keyCode)
      // Salvar codigo --------------------
      if(ev.ctrlKey && ev.keyCode == 83){
            if(Dp5.validCodeSetup != '')   Dp5.main.saveCode('setup', Dp5.validCodeSetup)
            if(Dp5.validCodeDraw  != '')   Dp5.main.saveCode('draw' , Dp5.validCodeDraw)
            if(Dp5.validCodeAux   != '')   Dp5.main.saveCode('aux'  , Dp5.validCodeAux)
      }
      if(ev.ctrlKey && ev.keyCode == 90){
            ev.preventDefault();
            return false
      }
      // Focus panels
      if (ev.ctrlKey && (ev.keyCode == 38 || ev.keyCode == 40)) {
            ev.preventDefault()
            if (ev.keyCode == 40) {
                  Dp5.panelIndex++
            } else if (ev.keyCode == 38) {
                  Dp5.panelIndex--
            }
            if (Dp5.panelIndex > 2) Dp5.panelIndex = 0;
            if (Dp5.panelIndex < 0) Dp5.panelIndex = 2;
            if (Dp5.panelIndex == 0) {
                  Dp5.cmSetup.focus()
                  Dp5.cmSetup.setCursor({ line: Dp5.cmSetupCp.line, ch: Dp5.cmSetupCp.ch })
            }
            if (Dp5.panelIndex == 1) {
                  Dp5.cmDraw.focus()
                  Dp5.cmDraw.setCursor({ line: Dp5.cmDrawCp.line, ch: Dp5.cmDrawCp.ch })
            }
            if (Dp5.panelIndex == 2) {
                  Dp5.cmAux.focus()
                  Dp5.cmAux.setCursor({ line: Dp5.cmAuxCp.line, ch: Dp5.cmAuxCp.ch })
            }
      }
      // Refrescar fondo lineas
      Dp5.changeBgLineAlpha()
})
// Global select event -----------------------------------
document.addEventListener("select", (ev) => {
      if (Dp5.cmDraw.hasFocus()) Dp5.cmSelect = new Number(Dp5.cmDraw.getSelection())
      if (Dp5.cmSetup.hasFocus()) Dp5.cmSelect = new Number(Dp5.cmSetup.getSelection())
      if (Dp5.cmAux.hasFocus()) Dp5.cmSelect = new Number(Dp5.cmAux.getSelection())
})
// Global mousewheel event -----------------------------------
document.addEventListener("mousewheel", (ev) => {
      if (ev.altKey && ev.ctrlKey) {
            if (
                  Dp5.cmSetup.somethingSelected() ||
                  Dp5.cmDraw.somethingSelected() ||
                  Dp5.cmAux.somethingSelected()
            ) {
                  ev.preventDefault()
                  var dir = Math.sign(ev.deltaY);
                  if (!isNaN(Dp5.cmSelect)) {
                        if (dir == 1) {
                              if (ev.shiftKey) {
                                    Dp5.cmSelect -= 0.1
                                    Dp5.cmSelect = parseFloat(Dp5.cmSelect.toFixed(3))
                              } else {
                                    Dp5.cmSelect--
                              }
                        }
                        if (dir == -1) {
                              if (ev.shiftKey) {
                                    Dp5.cmSelect += 0.1
                                    Dp5.cmSelect = parseFloat(Dp5.cmSelect.toFixed(3))
                              } else {
                                    Dp5.cmSelect++
                              }
                        }
                        if (Dp5.cmDraw.hasFocus()) Dp5.cmDraw.replaceSelection(Dp5.cmSelect.toString(), "around")
                        if (Dp5.cmSetup.hasFocus()) Dp5.cmSetup.replaceSelection(Dp5.cmSelect.toString(), "around")
                        if (Dp5.cmAux.hasFocus()) Dp5.cmAux.replaceSelection(Dp5.cmSelect.toString(), "around")
                        // Refresca el fondo ya que el el replace se elimina el atributo
                        Dp5.changeBgLineAlpha()
                  }
            }
      }
      if (ev.altKey && !ev.ctrlKey &&  !ev.shiftKey) {
            ev.preventDefault()
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Dp5.bg_code_alpha -= 0.03;
            }
            if (dir == -1) {
                  Dp5.bg_code_alpha += 0.03;
            }
            if (Dp5.bg_code_alpha < 0.0) {
                  Dp5.bg_code_alpha = 0.0;
            }
            if (Dp5.bg_code_alpha > 1.0) {
                  Dp5.bg_code_alpha = 1.0;
            }
            Dp5.changeBgLineAlpha()
      }
});
// -----------------------------------------------------
