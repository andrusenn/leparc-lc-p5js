// 'use strict';
//const bf = requiere(beautify)
let Dp5 = {
      main: require('electron').remote.require('./main'),
      fullscreen: true,
      devtools: false,
      fps: 0,
      // DOM en index.html
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
      // Funciones
      beautify_js: function (data) {
            let ob = {
                  "indent_size": 1,
                  "indent_char": "\t"
            }
            return js_beautify(data, ob).replace(/\n/g, '<br>').replace(/\t/g, "<span style='white-space:pre'>   </span>");
      },
      // textareaExpand: function (el) {
      //       console.log($(el).scrollLeft())

      //       $(el).css('width', (300 + $(el).scrollLeft()) + 'px')
      //             .css('height', (400 + $(el).scrollTop()) + 'px')
      // },
      prog:
            [
                  'draw',
                  'setup',
                  'preload',
                  'canvas',
                  'createCanvas'
            ]
}


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
      Dp5.setupTxt = loadStrings('save/setup.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.setupTxt.length; i++) {
                  txt += Dp5.setupTxt[i] + '\n';
            }
            try {
                  Dp5.codeSetup.innerHTML = Dp5.beautify_js(txt.trim())
            } catch (e) {
                  console.log(e)
            }
            // Dp5.codeSetup.innerText = txt.trim();
            // Dp5.validCodeSetup = Dp5.codeSetup.innerText;

      })
      Dp5.drawTxt = loadStrings('save/draw.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.drawTxt.length; i++) {
                  txt += Dp5.drawTxt[i] + '\n';
            }
            try {
                  Dp5.codeDraw.innerHTML = Dp5.beautify_js(txt.trim())
            } catch (e) {
                  console.log(e)
            }
            // Dp5.codeDraw.innerText = txt.trim();
      })
      Dp5.globalTxt = loadStrings('save/global.txt', () => {
            let txt = '';
            for (let i = 0; i < Dp5.globalTxt.length; i++) {
                  txt += Dp5.globalTxt[i] + '\n';
            }
            try {
                  Dp5.codeGlobal.innerHTML = Dp5.beautify_js(txt.trim())
            } catch (e) {
                  console.log(e)
            }
            // Dp5.codeGlobal.innerText = txt.trim();
      })
      // setup();
}
function setup() {
      createCanvas(windowWidth, windowHeight);
      // canvas.parent('out');
      // Init
      setFrameRate(60)
      imageMode(CORNER)
      rectMode(CORNER)
      ellipseMode(CENTER)
      colorMode(RGB,255,255,255)
      background(0);
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
                  //$('#console-out').html('');
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
      if (Dp5.validCodeGlobal != Dp5.codeGlobal.innerText) {
            $('#global-change').html('*&nbsp;&nbsp;');
      } else {
            $('#global-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeGlobal = Dp5.codeGlobal.innerText;
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
                        try {
                              Dp5.codeGlobal.innerHTML = Dp5.beautify_js(Dp5.codeGlobal.innerText)
                        } catch (e) {
                              console.log(e)
                        }
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
      // console.log(ev.keyCode)
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);
Dp5.codeGlobal.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == -1) {
                  Dp5.scale_gl -= 0.1;
            }
            if (dir == 1) {
                  Dp5.scale_gl += 0.1;
            }
            if (Dp5.scale_gl > 0.05) {
                  Dp5.codeGlobal.style.fontSize = Dp5.scale_gl + "rem";
                  Dp5.codeGlobal.style.lineHeight = (Dp5.scale_gl * 1.4) + "rem";
            } else {
                  Dp5.scale_gl = 0.05;
            }
      }
}, false);
// SETUP EVENTS ----------------------------------------
Dp5.codeSetup.addEventListener('keyup', (ev) => {
      // Verifica si se escribio algo
      if (Dp5.validCodeSetup != Dp5.codeSetup.innerText) {
            $('#setup-change').html('*&nbsp;&nbsp;');
      } else {
            $('#setup-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeSetup = Dp5.codeSetup.innerText;
            try {
                  Dp5.codeSetup.innerHTML = Dp5.beautify_js(Dp5.codeSetup.innerText)
            } catch (e) {
                  console.log(e)
            }
            Dp5.main.saveCode('setup', Dp5.renderCodeSetup)
            setup();
            // console.log('setup');
      }
}, false);
Dp5.codeSetup.addEventListener('keydown', (ev) => {
      console.log(ev.keyCode)
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);
Dp5.codeSetup.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == -1) {
                  Dp5.scale_st -= 0.1;
            }
            if (dir == 1) {
                  Dp5.scale_st += 0.1;
            }
            if (Dp5.scale_st > 0.05) {
                  Dp5.codeSetup.style.fontSize = Dp5.scale_st + "rem";
                  Dp5.codeSetup.style.lineHeight = (Dp5.scale_st * 1.4) + "rem";
            } else {
                  Dp5.scale_st = 0.05;
            }
      }
}, false);
Dp5.codeSetup.addEventListener("paste", (ev) => {
      setTimeout(function () {
            Dp5.codeSetup.innerText = Dp5.codeSetup.innerText
      }, 20)
}, false);

Dp5.codeDraw.addEventListener("paste", (ev) => {
      setTimeout(function () {
            Dp5.codeDraw.innerText = Dp5.codeDraw.innerText
      }, 20)
}, false);

Dp5.codeGlobal.addEventListener("paste", (ev) => {
      setTimeout(function () {
            Dp5.codeGlobal.innerText = Dp5.codeGlobal.innerText
      }, 20)
}, false);
// -----------------------------------------------------
// DRAW EVENTS -----------------------------------------
Dp5.codeDraw.addEventListener('keyup', (ev) => {

      // Verifica si se escribio algo
      if (Dp5.validCodeDraw != Dp5.codeDraw.innerText) {
            $('#draw-change').html('*&nbsp;&nbsp;');
      } else {
            $('#draw-change').html('');
      }
      if (ev.ctrlKey && ev.keyCode == 13) {
            Dp5.renderCodeDraw = Dp5.codeDraw.innerText;
            try {
                  Dp5.codeDraw.innerHTML = Dp5.beautify_js(Dp5.codeDraw.innerText)
            } catch (e) {
                  console.log(e)
            }
            // Dp5.renderCodeDraw = Dp5.codeDraw.value;
            Dp5.main.saveCode('draw', Dp5.renderCodeDraw)
            $('#dp5-draw').parent().removeClass('error');
      }
      console.log(getCaretPosition(Dp5.codeDraw))
}, false);
Dp5.codeDraw.addEventListener('keydown', (ev) => {
      // console.log(ev.keyCode)
      if (ev.keyCode == 9) {
            ev.preventDefault();
            document.execCommand('insertText', false, '\t');
      }
}, false);

Dp5.codeDraw.addEventListener("mousewheel", (ev) => {
      if (ev.ctrlKey) {
            var dir = Math.sign(ev.deltaY);
            if (dir == -1) {
                  Dp5.scale_dr -= 0.1;
            }
            if (dir == 1) {
                  Dp5.scale_dr += 0.1;
            }
            if (Dp5.scale_dr > 0.05) {
                  Dp5.codeDraw.style.fontSize = Dp5.scale_dr + "rem";
                  Dp5.codeDraw.style.lineHeight = (Dp5.scale_dr * 1.4) + "rem";
            } else {
                  Dp5.scale_dr = 0.05;
            }
      }
}, false);
// ------------------------------------------------
document.addEventListener('keyup', (ev) => {
      // console.log(ev.keyCode)
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
});
// -----------------------------------------------------
// -----------------------------------------------------

// Extra functions -------------------------------------
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
p5.prototype.circle = function () {
      let arg = arguments;
      if (arg.length == 3) {
            ellipse(arg[0], arg[1], arg[2], arg[2])
      }
}
p5.prototype.displace = function () {
      let arg = arguments;
      if (arg.length == 6) {
            let i = get(arg[0], arg[1], arg[2], arg[3])
            imageMode(CORNER);
            image(i, arg[0], arg[1], arg[2] + arg[4], arg[3] + arg[5])
      } else {
            console.log('no entra')
      }
}
p5.prototype.rotBegin = function () {
      let arg = arguments;
      if (arg.length == 1) {
            push();
            translate(width / 2, height / 2);
            rotate(arg[0])
            translate(-width / 2, -height / 2);
      } else {
            console.log('no entra')
      }
}
p5.prototype.rotEnd = function () {
      pop();
}
p5.prototype.zoom = function () {
      this.s = 1;
      let arg = arguments;
      if (arg.length == 1) {
            let i = get()
            push()
            imageMode(CORNER)
            translate(width / 2, height / 2)
            scale(s)
            translate(-width / 2, -height / 2)
            image(i, 0, 0)
            s = this.s
            pop()
            s += arg[0]
      }
}
p5.prototype.mirror = function () {
      let i = get(0, 0, width / 2, height);
      push()
      imageMode(CORNER)
      translate(width, 0)
      scale(-1, 1)
      image(i, 0, 0)
      pop()
}
p5.prototype.caleido = function () {
      let i = get(0, 0, width / 2, height);
      push()
      imageMode(CORNER)
      translate(width, height)
      scale(-1, -1)
      image(i, 0, 0)
      pop()
}
p5.prototype.caleido2 = function () {
      let i1 = get(0, 0, width / 2, height / 2);
      imageMode(CORNER)
      push()
      translate(width, 0)
      scale(-1, 1)
      image(i1, 0, 0)
      pop()
      let i2 = get(0, 0, width, height / 2);
      push()
      translate(0, height)
      scale(1, -1)
      image(i2, 0, 0)
      pop()
}
// Traducidas ---------------------------------------
p5.prototype.fondo = function () {
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
