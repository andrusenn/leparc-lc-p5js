// Duchamp Object
let Dp5 = {
      main: require('electron').remote.require('./main'),
      fullscreen: true,
      devtools: false,
      fps: 0,
      // DOM en index.html
      cmSetup: null,
      cmDraw: null,
      cmGlobal: null,
      codeSetup: document.getElementById('dp5-setup'),
      codeDraw: document.getElementById('dp5-draw'),
      codeGlobal: document.getElementById('dp5-global'),
      consoleView: document.getElementById('dp5-console'),
      // Almacena los codigos a evaluar
      validCodeDraw: '',
      renderCodeDraw: '',
      validCodeSetup: '',
      renderCodeSetup: '',
      validCodeGlobal: '',
      renderCodeGlobal: '',
      setupTxt: '',
      drawTxt: '',
      glogalTxt: '',
      // Escala de los campos a
      scale_st: 1,
      scale_dr: 1,
      scale_gl: 1,
      // p5 externas
      setup: null,
      // Mostrar ventanas
      showSetupWin: true,
      showDrawWin: true,
      showGlobalWin: true,
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
      prog:
            [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas'
            ]
}

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
      // Code mirror
      Dp5.cmSetup = CodeMirror(Dp5.codeSetup, {
            mode: "javascript"
      });
      Dp5.cmDraw = CodeMirror(Dp5.codeDraw, {
            mode: "javascript"
      });
      Dp5.cmGlobal = CodeMirror(Dp5.codeGlobal, {
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
                        Dp5.cmSetup.setValue(txt);
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
      Dp5.globalTxt = loadStrings('save/global.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.globalTxt.length; i++) {
                  txt += Dp5.globalTxt[i] + '\n';
            }
            try {
                  // Dp5.codeGlobal.innerHTML = Dp5.beautify_js(txt.trim())
                  if (txt != '') {
                        Dp5.cmGlobal.setValue(txt);
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
      // default fps
      setFrameRate(60)
      imageMode(CORNER)
      rectMode(CORNER)
      ellipseMode(CENTER)
      background(0);
      colorMode(RGB, 255, 255, 255)
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
// GLOBALS EVENTS --------------------------------------
Dp5.codeGlobal.addEventListener('keyup', (ev) => {
      //Verifica si se escribio algo
      if (Dp5.cmGlobal.getValue() == '') {
            Dp5.cmGlobal.setValue('// Code!');
            Dp5.caretEnd(Dp5.cmGlobal);
      }
      if (Dp5.validCodeGlobal != Dp5.cmGlobal.getValue()) {
            $('#global-change').html('*&nbsp;&nbsp;');
      } else {
            $('#global-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeGlobal = Dp5.cmGlobal.getValue();
            // Live --------------------------------
            try {
                  let valid = true;
                  let word = '';
                  for (let i = 0; i < Dp5.prog.length; i++) {
                        if (Dp5.renderCodeGlobal.includes(Dp5.prog[i])) {
                              valid = false;
                              word = Dp5.prog[i];
                              $('#console-out').html('en global:' + word + ' no puede ser reescrita');
                        }
                  }
                  if (valid) {
                        new Function(Dp5.renderCodeGlobal)();
                        Dp5.validCodeGlobal = Dp5.renderCodeGlobal;
                        // try {
                        //       Dp5.codeGlobal.innerHTML = Dp5.beautify_js(Dp5.codeGlobal.innerText)
                        // } catch (e) {
                        //       console.log(e)
                        // }
                        $('#dp5-global').parent().removeClass('error');
                        $('#console-out').html('');
                  }
            } catch (e) {
                  Dp5.renderCodeGlobal = Dp5.validCodeGlobal;
                  console.log('en setup eval ' + e);
                  $('#console-out').html('en global:' + e)
                  $('#dp5-global').parent().addClass('error');
            }
            Dp5.main.saveCode('global', Dp5.renderCodeGlobal)
      }
}, false);
Dp5.codeGlobal.addEventListener('keydown', (ev) => {
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);
Dp5.codeGlobal.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == 1) {
                  Dp5.scale_gl -= 0.1;
            }
            if (dir == -1) {
                  Dp5.scale_gl += 0.1;
            }
            if (Dp5.scale_gl > 0.05) {
                  Dp5.codeGlobal.style.fontSize = Dp5.scale_gl + "rem";
                  Dp5.codeGlobal.style.lineHeight = (Dp5.scale_gl * 1.4) + "rem";
                  Dp5.cmGlobal.refresh()
            } else {
                  Dp5.scale_gl = 0.05;
            }
      }
}, false);
// SETUP EVENTS ----------------------------------------
Dp5.codeSetup.addEventListener('keyup', (ev) => {
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
Dp5.codeDraw.addEventListener('keyup', (ev) => {
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

Dp5.codeGlobal.addEventListener("paste", (ev) => {
      //Dp5.cmGlobal.setValue(ev.clipboardData.getData('text/plain'))
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
            if (Dp5.showGlobalWin) {
                  $('#dp5-global').css('display', 'none');
                  Dp5.showGlobalWin = false;
            } else {
                  $('#dp5-global').css('display', 'inline');
                  Dp5.showGlobalWin = true;
            }
      }
      if (ev.keyCode == 114) {
            if (Dp5.showGlobalWin) {
                  $('#dp5-global').css('display', 'none');
                  Dp5.showGlobalWin = false;
            } else {
                  $('#dp5-global').css('display', 'inline');
                  Dp5.showGlobalWin = true;
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
});
// -----------------------------------------------------
// -----------------------------------------------------

