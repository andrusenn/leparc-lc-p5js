
// Extends p5js -------------------------------------
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
      } else {
            console.log('no entra')
      }
}
p5.prototype.beginRot = function () {
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
      push()
      imageMode(CORNER)
      translate(width, 0)
      scale(-1, 1)
      image(i1, 0, 0)
      pop()
      let i2 = get(0, 0, width, height / 2);
      push()
      imageMode(CORNER)
      translate(0, height)
      scale(1, -1)
      image(i2, 0, 0)
      pop()
}
p5.prototype.kaleido = function () {
      mirrorX();
      mirrorY();
}
p5.prototype.___webcam = null;
p5.prototype.useWebcam = function () {
      let args = arguments;
      if (args.length == 0) {
            ___webcam = createCapture(VIDEO);
            ___webcam.size(320,240);
            ___webcam.hide()
      }
      if (args.length == 2) {
            ___webcam = createCapture(VIDEO);
            ___webcam.size(args[0], args[0]);
      }
}
p5.prototype.getWebcam = function () {
      let args = arguments;
      if(___webcam == null){
            $('#console-out').html('useWebcam no esta definido');
      }
      if (args.length == 2 && ___webcam != null) {
            push()
            translate(args[0],args[1])
            image(___webcam,0,0)
            pop()
      }
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