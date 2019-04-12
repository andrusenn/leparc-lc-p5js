# Extended functions of p5j

Method | Description
--- | ---
`mirrorX()` | Mirror - Reflects the image from the middle on the X axis
`mirrorY()` | Mirror - Reflects the image from the middle on the Y axis
`imirrorX()` | Inverted Mirror - Reflects the image from the middle on the inverted X axis
`imirrorY()` | Inverted Mirror - Reflects the image from the middle on the inverted Y axis
`kaleido()` | Kaleidoscope effect 4 faces (repeat the upper left face)
`zoom(escala)` | Scales output image in each loop: `zoom(0.01)` or negative `zoom(-0.01)`
`displace(velx,vely)` | Displace output image `velx`  y  `vely` (+ o -)
`displace(x,y,w,h,velx,vely)` | Cut out a portion of the image and displace it
`beginRot(vel_in_radians[,scale])` and `endRot()` | rotate what is contained between those two functions
`freq(mult)` | Shorthand of sentence `frameCount * mult`
`osc([freq])` | Shorthand of sentence  `sin( frameCount * freq )`
`cosc([freq])` | Shorthand of sentence  `{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}`
`pulse(n_frames)` | Flag. Return true each n frame `if(frameCount % n_frames == 0 ) return true`
`gate(n_frames, duration)` | Flag. Return true each n_frames with an x duration `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true`
