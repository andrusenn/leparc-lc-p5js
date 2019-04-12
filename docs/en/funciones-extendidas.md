# Extended functions of p5j

Method | Desc
--- | ---
`mirrorX()` | Mirror - Reflects the image from the middle on the X axis
`mirrorY()` | Mirror - Reflects the image from the middle on the Y axis
`imirrorX()` | Inverted Mirror - Reflects the image from the middle on the inverted X axis
`imirrorY()` | Inverted Mirror - Reflects the image from the middle on the inverted Y axis
`kaleido()` | Efecto caleidoscopio 4 caras (repite la cara superior derecha)
`zoom(escala)` | Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`
`displace(velx,vely)` | Desplaza la pantalla en la direccion `velx`  y  `vely` (+ o -)
`displace(x,y,w,h,velx,vely)` | Recorta una porcion de la imagen y la desplaza
`beginRot(vel_in_radians[,scale])` y `endRot()` | rotate what is contained between those two functions
`freq(mult)` | Abreviación de la sentencia `frameCount * mult`
`osc([freq])` | Abreviacion de `sin( frameCount * freq )`
`cosc([freq])` | Abreviacion de `{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}`
`pulse(n_fotogramas)` | Bandera (flag) emite verdadero cada n fotogramas `if(frameCount % n_fotogramas == 0 ) return true`
`gate(n_fotogramas, duracion)` | Bandera (flag) emite verdadero cada n fotogramas con una duracion x `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true`
