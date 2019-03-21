// Extends p5js -------------------------------------
p5.prototype.winSize = function (w, h) {
      Dp5.main.resizeWin(w, h)
}
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
            image(i, arg[0] + arg[4], arg[1] + arg[5])
      } else
            if (arg.length == 2) {
                  let i = get()
                  imageMode(CORNER);
                  image(i, arg[0], arg[1])
            } else {
                  console.log('no entra')
            }
      return this;
}
p5.prototype.beginRot = function () {
      let arg = arguments;
      if (arg.length == 1) {
            push();
            translate(width / 2, height / 2);
            rotate(arg[0])
            translate(-width / 2, -height / 2);
      }
      if (arg.length == 3) {
            push();
            translate(arg[1], arg[2]);
            rotate(arg[0])
            translate(-arg[1], -arg[2]);
      }
}
p5.prototype.endRot = function () {
      pop();
}
p5.prototype.ZOOM_SCALE = 1;
p5.prototype.zoom = function () {
      this.s = 1;
      let arg = arguments;
      if (arg[1] != null) {
            this.s = arg[1];
      }
      if (arg.length > 0) {
            let i = get()
            push()
            imageMode(CORNER)
            translate(width / 2, height / 2)
            scale(ZOOM_SCALE)
            translate(-width / 2, -height / 2)
            image(i, 0, 0)
            ZOOM_SCALE = this.s
            pop()
            ZOOM_SCALE += arg[0]
      }
}
p5.prototype.mirrorY = function () {
      let i = get(0, 0, width / 2, height);
      push()
      imageMode(CORNER)
      translate(width, 0)
      scale(-1, 1)
      image(i, 0, 0)
      pop()
}
p5.prototype.mirrorX = function () {
      let i = get(0, 0, width, height / 2);
      push()
      imageMode(CORNER)
      translate(0, height)
      scale(1, -1)
      image(i, 0, 0)
      pop()
}
p5.prototype.kaleido = function () {
      mirrorX();
      mirrorY();
}
p5.prototype.osc = function(){
      let args = arguments
      let freq = 1
      let amp = 1
      if(args.length == 1){
            freq = frameCount * 0.01
            amp = args[0]
      }
      if(args.length == 2){
            freq = frameCount * args[1]
            amp = args[0]
      }
      return sin(freq) * amp;
}
p5.prototype.freq = function(){
      let args = arguments
      let freq
      if(args.length == 1){
            freq = args[0]
            return frameCount * args[0]
      }
      return 1;
}
p5.prototype.uselib = function (name) {
      let path = 'custom/libs/' + name + '.js'
      loadStrings(path, (data) => {
            let code = '';
            for (let i = 0; i < data.length; i++) {
                  code += data[i] + '\n';
            }
            try {
                  new Function(code)();
            } catch (e) {
                  $('#console-out').html('uselib(name) -> problemas para cargar:' + name);
            }
      })
}
p5.prototype.___pics = [];
p5.prototype.pic = function () {
      let args = arguments;
      if (args.length == 3) {
            image(___pics[args[0]], args[1] - ___pics[args[0]].width / 2, args[2] - ___pics[args[0]].height / 2)
      } else {
            $('#console-out').html('Se requieren 3 argumentos -> pic(index,x,y)');
      }
}
// Media ------------------------------------------
// Cam --------------------------------------------
p5.prototype.___webcam = null;
p5.prototype.useCam = function () {
      let args = arguments;
      if (args.length == 0) {
            ___webcam = createCapture(VIDEO);
            ___webcam.size(320, 240);
            ___webcam.hide()
      }
      if (args.length == 2) {
            ___webcam = createCapture(VIDEO);
            ___webcam.size(args[0], args[0]);
      }
}
p5.prototype.getCam = function () {
      let args = arguments;
      if (___webcam == null) {
            $('#console-out').html('useCam() no esta declarado');
      }
      if (args.length == 2 && ___webcam != null) {
            push()
            translate(args[0], args[1])
            image(___webcam, 0, 0)
            pop()
      }
}
// Audio --------------------------------------------
p5.prototype.___audio = null
p5.prototype.___fft = null
p5.prototype.linein = function (s) {
      ___audio = new p5.AudioIn()
      ___fft = new p5.FFT();
      ___audio.start()
      ___audio.getSources(function (deviceList) {
            ___audio.setSource(s);
            ___fft.setInput(___audio)
      });
}
p5.prototype.getVolume = function () {
      return ___audio.getLevel()
}
p5.prototype.beat = function(threshold){
      let spectrum = ___fft.analyze(16);
      let sum = 0
      if(threshold > spectrum.length) threshold = spectrum.length
      // for(let i = 0; i < threshold;i++){
      //       sum += spectrum[i]
      // } 
      sum = sum / threshold
      return spectrum[threshold];
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