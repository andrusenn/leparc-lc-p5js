function CutNoise() {
      let arg = arguments
      let mx = mouseX
      let my = mouseY
      let r1a = 5
      let r1b = 200
      let r2a = 5
      let r2b = 200
      if (arg.length == 2) {
            mx = arg[0]
            my = arg[1]
      }
      if (arg.length == 6) {
            mx = arg[0]
            my = arg[1]
            r1a = arg[2]
            r1b = arg[3]
            r2a = arg[4]
            r2b = arg[5]
      }
      let r = 2;
      push()
      loadPixels()
      for (let x = 0; x < width; x += r) {
            for (let y = 0; y < height; y += r) {

                  if (dist(mx, my, x, y) < 2) {


                        // Tamaños de los cortes  -------------------------------------------
                        let r1 = random(r1a, r1b);
                        let r2 = random(r2a, r2b);

                        // Nueva posicion de los cortes -------------------------------------
                        let nxi = map(noise(x * 0.02, y * 0.02), 0, 1, -20, 20) * cos(x * 0.1);
                        let nyi = map(noise(x * 0.02, y * 0.02), 0, 1, -20, 20) * sin(x * 0.1);

                        // Cortes -----------------------------------------------------------
                        let i1 = get(x - int(r1 / 2), y - int(r2 / 2), int(r1), int(r2));
                        // ------------------------------------------------------------------ 

                        rectMode(CENTER);
                        imageMode(CENTER);
                        noStroke();

                        //Sombra / Shadow
                        fill(0, 20);
                        rect((x + nxi) + 10, (y + nyi) + 10, i1.width, i1.height);

                        // Image
                        image(i1, int(x + nxi), int(y + nyi));

                        // Marco / Frame
                        strokeWeight(0.4);
                        let col = get(x, y)[0]
                        if (brightness(col) > 50) {
                              stroke(0, 100);
                        } else {
                              stroke(255, 100);
                        }

                        noFill();
                        if (frameCount % 150 == 0) fill(random(255), random(255), random(255))
                        // Marco
                        rect((x + nxi), (y + nyi), i1.width, i1.height);
                  }
            }
      }
      pop()
}
// hacer global / make global
if (!global.hasOwnProperty('CutNoise')) {
      global.CutNoise = CutNoise
}

function RemapPixRect(_x, _y, _w, _h) {
      loadPixels()
      for (let x = _x-_w/2; x <_x+_w/2;  x++) {
            for (let y = _y-_h/2; y < _y+_h/2; y++) {
                  if (x >= _x && y >= _y && x <= _x + _w && y <= _y + _h) {
                        let idx = (x + y * width) * 4
				let n = noise(x * 0.001, y * 0.0025, radians(frameCount));
                        let nx = n * cos(x * 0.1 * n)*20;
                        let ny = n * sin(x * 0.1 * n)*20;
                        let nidx = (int(x + nx) + int(y + ny) * width) * 4
                        let p1 = pixels[nidx]
                        let p2 = pixels[nidx + 1]
                        let p3 = pixels[nidx + 2]
                        let p4 = pixels[nidx + 3]

                        pixels[idx] = p2
                        pixels[idx + 1] = p3
                        pixels[idx + 2] = p1
                        pixels[idx + 3] = p4
                  }

            }
      }
      updatePixels()
}
// hacer global / make global
if (!global.hasOwnProperty('RemapPixRect')) {
      global.RemapPixRect = RemapPixRect
}

function RemapPixCircle(_x, _y, _d) {
      loadPixels()
      for (let x = _x-_d/2; x <_x+_d/2;  x++) {
            for (let y = _y-_d/2; y < _y+_d/2; y++) {
                  let dis = dist(x,y,_x,_y)
                  if (dis < _d/2) {
                        let idx = (x + y * width) * 4
				let n = noise(x * 0.001, y * 0.0025, radians(frameCount));
                        let nx = n * cos(x * 0.1 * n)*20;
                        let ny = n * sin(x * 0.1 * n)*20;
                        let nidx = (int(x + nx) + int(y + ny) * width) * 4
                        let p1 = pixels[nidx]
                        let p2 = pixels[nidx + 1]
                        let p3 = pixels[nidx + 2]
                        let p4 = pixels[nidx + 3]

                        pixels[idx] = p2
                        pixels[idx + 1] = p3
                        pixels[idx + 2] = p1
                        pixels[idx + 3] = p4
                  }

            }
      }
      updatePixels()
}
// hacer global / make global
if (!global.hasOwnProperty('RemapPixCircle')) {
      global.RemapPixCircle = RemapPixCircle
}