# Funciones extendidas de p5j

|Método|Desc|
|---|---|
|`mirrorX()`|Espejo - Refleja la imagen desde la mitad sobre el eje X|
|`mirrorY()`|Espejo - Refleja la imagen desde la mitad sobre el eje Y|
|`imirrorX()`|Espejo Invertido - Refleja la imagen desde la mitad sobre el eje X invertida|
|`imirrorY()`|Espejo Invertido - Refleja la imagen desde la mitad sobre el eje Y invertida|
|`kaleido()`|Efecto caleidoscopio 4 caras (repite la cara superior derecha)|
|`zoom(escala)`|Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`|
|`displace(velx,vely)`|Desplaza la pantalla en la direccion `velx`  y  `vely` (+ o -)|
|`displace(x,y,w,h,velx,vely)`|Recorta una porcion de la imagen y la desplaza|
|`beginRot(vel_in_radians[,scale])` y `endRot()`|rota lo que está contenido entre esas dos funciones|
|`freq(mult)`|Abreviación de la sentencia `frameCount * mult`|
|`osc([freq])`|Abreviacion de `sin( frameCount * freq )`|
|`cosc([freq])`|Abreviacion de `{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}`|
|`pulse(n_fotogramas)`|Bandera (flag) emite verdadero cada n fotogramas `if(frameCount % n_fotogramas == 0 ) return true`|
|`gate(n_fotogramas, duracion)`|Bandera (flag) emite verdadero cada n fotogramas con una duracion x `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true`|