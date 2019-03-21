// Duchamp Object
let Dp5 = {
      main: require('electron').remote.require('./main'),
      fullscreen: false,
      devtools: false,
      fps: 0,
      // DOM en index.html
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
      codeSetup: document.getElementById('dp5-setup'),
      codeDraw: document.getElementById('dp5-draw'),
      codeAux: document.getElementById('dp5-aux'),
      consoleView: document.getElementById('dp5-console'),
      // Almacena los codigos a evaluar
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
      scale_gl: 1,
      // bg alfa
      bg_code_alpha: 0.4,
      // p5 externas
      setup: null,
      // Mostrar ventanas
      showSetupWin: true,
      showDrawWin: true,
      showAuxWin: true,
      showWin: true,
      // Funciones
      beautify_js: function (data) {
            let ob = {
                  "indent_size": 1,
                  "indent_char": "\t"
            }
            return js_beautify(data, ob);
      },
      caretEnd(el) {
            let len = el.getValue().length;
            el.setCursor(len)
      },
      addSysName: function (name) {
            this.prog.push(name)
      },
      prog:
            [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas'
            ]
}
let img;
// function updateCaretCoords() {
//       Dp5.setCaretCoords()
//       requestAnimationFrame(updateCaretCoords);
// }
// requestAnimationFrame(updateCaretCoords);
// -----------------------------------------------------
// -----------------------------------------------------

$(document).ready(function () {
      //////
      // Cargar ultimo -------------------------
      setInterval(() => {
            $('#dp5-console>#os-ram').text('| free ram:' + Dp5.main.getMemory() + "%")
      }, 2000)
      setInterval(() => {

            $('#dp5-console>#os-fps').text('| fps:' + Dp5.fps)
      }, 500)
});

// -----------------------------------------------------
// P5 --------------------------------------------------
function preload() {
      Dp5.main.loadImgsBank((imgs) => {
            for (let i = 0; i < imgs.length; i++) {
                  let img = loadImage('custom/imgs/' + imgs[i]);
                  ___pics.push(img);
            }
      })
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
      Dp5.setupTxt = loadStrings('save/setup.txt', () => {
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
            } catch (e) {
                  console.log(e)
            }

      })
      Dp5.drawTxt = loadStrings('save/draw.txt', () => {
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
            } catch (e) {
                  console.log(e)
            }
      })
      Dp5.auxTxt = loadStrings('save/aux.txt', () => {
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
            }
      })
}
function setup() {
      createCanvas(windowWidth, windowHeight);
      // Init
      // Webcam/video capture
      ___webcam = null;
      if(___audio != null ){
            ___audio.disconnect();
      }
      // default fps
      setFrameRate(60)
      imageMode(CORNER)
      rectMode(CORNER)
      ellipseMode(CENTER)
      background(0);
      colorMode(RGB, 255)
      new Function(Dp5.validCodeSetup)();
      // Live --------------------------------
      try {
            let valid = true;
            let word = '';
            for (let i = 0; i < Dp5.prog.length; i++) {
                  if (Dp5.renderCodeSetup.includes(Dp5.prog[i])) {
                        valid = false;
                        word = Dp5.prog[i];
                        $('#console-out').html('en setup:' + word + ' no puede ser reescrita');
                  }
            }
            if (valid) {
                  new Function(Dp5.renderCodeSetup)();
                  Dp5.validCodeSetup = Dp5.renderCodeSetup;
                  $('#dp5-setup').parent().removeClass('error');
                  $('#console-out').html('');
            } else {
                  new Function(Dp5.validCodeSetup)();
                  $('#dp5-setup').parent().addClass('error');
            }
      } catch (e) {
            Dp5.renderCodeSetup = Dp5.validCodeSetup;
            $('#console-out').html('setup:' + e)
            $('#dp5-setup').parent().addClass('error');
      }

}
function draw() {
      Dp5.fps = getFrameRate();
      // Live --------------------------------
      try {
            let valid = true;
            let word = '';
            for (let i = 0; i < Dp5.prog.length; i++) {
                  if (Dp5.renderCodeDraw.includes(Dp5.prog[i])) {
                        valid = false;
                        word = Dp5.prog[i];
                        $('#console-out').html('en draw:' + word + ' no puede ser reescrita');
                  }
            }
            if (valid) {
                  new Function(Dp5.renderCodeDraw)();
                  Dp5.validCodeDraw = Dp5.renderCodeDraw;
            } else {
                  new Function(Dp5.validCodeDraw)();
                  $('#dp5-draw').parent().addClass('error');
            }
      } catch (e) {
            $('#dp5-draw').parent().addClass('error');
            Dp5.renderCodeDraw = Dp5.validCodeDraw;
            $('#console-out').html('draw:' + e)
      }
}
function windowResized() {
      try {
            resizeCanvas(windowWidth, windowHeight);
            setup();
      } catch (e) {
            console.log('en resize ' + e);
      }
}
// -----------------------------------------------------
// EVENTS ----------------------------------------------
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
            $('#aux-change').html('*&nbsp;&nbsp;');
      } else {
            $('#aux-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeAux = Dp5.cmAux.getValue();
            // Live --------------------------------
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        if (Dp5.renderCodeAux.includes(Dp5.prog[i])) {
                              valid = false;
                              word = Dp5.prog[i];
                              $('#console-out').html('en aux:' + word + ' no puede ser reescrita');
                        }
                  }
                  if (valid) {
                        new Function(Dp5.renderCodeAux)();
                        Dp5.validCodeAux = Dp5.renderCodeAux;
                        // try {
                        //       Dp5.codeAux.innerHTML = Dp5.beautify_js(Dp5.codeAux.innerText)
                        // } catch (e) {
                        //       console.log(e)
                        // }
                        $('#dp5-aux').parent().removeClass('error');
                        $('#console-out').html('');
                  }
            } catch (e) {
                  Dp5.renderCodeAux = Dp5.validCodeAux;
                  console.log('en setup eval ' + e);
                  $('#console-out').html('en aux:' + e)
                  $('#dp5-aux').parent().addClass('error');
            }
            Dp5.main.saveCode('aux', Dp5.renderCodeAux)
      }
}, false);
Dp5.codeAux.addEventListener('keydown', (ev) => {
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);
Dp5.codeAux.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Dp5.scale_gl -= 0.1;
            }
            if (dir == -1) {
                  Dp5.scale_gl += 0.1;
            }
            if (Dp5.scale_gl > 0.05) {
                  Dp5.codeAux.style.fontSize = Dp5.scale_gl + "rem";
                  Dp5.codeAux.style.lineHeight = (Dp5.scale_gl * 1.4) + "rem";
                  Dp5.cmAux.refresh()
            } else {
                  Dp5.scale_gl = 0.05;
            }
      }
}, false);
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
            $('#setup-change').html('*&nbsp;&nbsp;');
      } else {
            $('#setup-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeSetup = Dp5.cmSetup.getValue();
            // try {
            //       Dp5.cmSetup.setValue(Dp5.beautify_js(Dp5.cmSetup.getValue()))
            // } catch (e) {
            //       console.log(e)
            // }
            Dp5.main.saveCode('setup', Dp5.renderCodeSetup)
            setup();
      }
}, false);
Dp5.codeSetup.addEventListener('keydown', (ev) => {
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);
Dp5.codeSetup.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
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
}, false);
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
      if (Dp5.validCodeDraw != Dp5.cmDraw.getValue()) {
            $('#draw-change').html('*&nbsp;&nbsp;');
      } else {
            $('#draw-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeDraw = Dp5.cmDraw.getValue();
            // try {
            //       Dp5.codeDraw.innerHTML = Dp5.beautify_js(Dp5.codeDraw.innerText)
            // } catch (e) {
            //       console.log(e)
            // }
            Dp5.main.saveCode('draw', Dp5.renderCodeDraw)
            $('#dp5-draw').parent().removeClass('error');
      }
}, false);
Dp5.codeDraw.addEventListener('keydown', (ev) => {
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);

Dp5.codeDraw.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
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
}, false);
// Paste ------------------------------------------
Dp5.codeSetup.addEventListener("paste", (ev) => {
      //Dp5.cmSetup.setValue(ev.clipboardData.getData('text/plain'))
}, false);

Dp5.codeDraw.addEventListener("paste", (ev) => {
      //Dp5.cmDraw.setValue(ev.clipboardData.getData('text/plain'))
}, false);

Dp5.codeAux.addEventListener("paste", (ev) => {
      //Dp5.cmAux.setValue(ev.clipboardData.getData('text/plain'))
}, false);
// ------------------------------------------------
document.addEventListener('keyup', (ev) => {
      console.log(ev.keyCode)

      if (ev.keyCode == 122) {
            if (!Dp5.fullscreen) {
                  Dp5.main.setFull();
                  Dp5.fullscreen = true;
            } else {
                  Dp5.main.setUnFull();
                  Dp5.fullscreen = false;
            }
      }
      if (ev.keyCode == 121) {
            if (!Dp5.devtools) {
                  Dp5.main.devTools(true);
                  Dp5.devtools = true;
            } else {
                  Dp5.main.devTools(false);
                  Dp5.devtools = false;
            }
      }
      if (ev.keyCode == 116) {
            Dp5.main.reload();
      }
      if (ev.keyCode == 112) {
            if (Dp5.showSetupWin) {
                  $('#dp5-setup').css('display', 'none');
                  Dp5.showSetupWin = false;
            } else {
                  $('#dp5-setup').css('display', 'inline');
                  Dp5.showSetupWin = true;
            }
      }
      if (ev.keyCode == 113) {
            if (Dp5.showDrawWin) {
                  $('#dp5-draw').css('display', 'none');
                  Dp5.showDrawWin = false;
            } else {
                  $('#dp5-draw').css('display', 'inline');
                  Dp5.showDrawWin = true;
            }
      }
      if (ev.keyCode == 114) {
            if (Dp5.showAuxWin) {
                  $('#dp5-aux').css('display', 'none');
                  Dp5.showAuxWin = false;
            } else {
                  $('#dp5-aux').css('display', 'inline');
                  Dp5.showAuxWin = true;
            }
      }
      if (ev.ctrlKey && ev.keyCode == 72) {
            if (Dp5.showWin) {
                  $('#win').css('display', 'none');
                  Dp5.showWin = false;
            } else {
                  $('#win').css('display', 'inline');
                  Dp5.showWin = true;
            }
      }
      if (ev.keyCode == 27) {
            if (confirm(":( salir de la aplicación??")) {
                  Dp5.main.exit();
            }

      }
      // Focus panels
      if (ev.ctrlKey && (ev.keyCode == 32)) {
            Dp5.panelIndex++
            ev.preventDefault();
            if (Dp5.panelIndex > 2) Dp5.panelIndex = 0;
            //console.log(Dp5.panelIndex)
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

});
document.addEventListener('keydown', function (ev) {

      // Focus panels
      if (ev.ctrlKey && (ev.keyCode == 38 || ev.keyCode == 40)) {
            ev.preventDefault()
            if (ev.keyCode == 40) {
                  Dp5.panelIndex++
            } else if(ev.keyCode == 38){
                  Dp5.panelIndex--
            }
            if (Dp5.panelIndex > 2) Dp5.panelIndex = 0;
            if (Dp5.panelIndex < 0) Dp5.panelIndex = 2;
            //console.log(Dp5.panelIndex)
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
})
document.addEventListener("mousewheel", (ev) => {
      if (ev.altKey) {
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
            $(".CodeMirror-line").find('>span').css("background", "rgba(0,0,0," + Dp5.bg_code_alpha + ")");

      }
}, false);
// -----------------------------------------------------
// -----------------------------------------------------

