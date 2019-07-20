# LeParc p5js Livecoder

LeParc es una herramienta para codificar/programar en vivo con javascript.
Utiliza la librería [p5js](https://p5js.org/es/) como base y Electronjs para correrlo nativamente en cualquier sistema operativo.

\+ Codemirror
\+ BeautifyJS

# Estructura de carpetas

Una vez instalado, se crean varias carpetas:

~~~

leparc_resources/
      ├── config/
      │      └── config.txt
      ├── extends/
      │     └──lp-extends.js
      ├── libs/
      ├── media/
      ├── save/
      │      ├── auxcode.txt
      └── snippets/
            └── espiro/
                  └── espiro.js
~~~

- **config**: configuraciones varias (server-ip,port,etc)
- **extends**: Este archivo se carga cuando se ejecuta el programa. Puedes extender p5js con funcionalidades extra de uso frecuente.
- **libs**: Carpeta destinada a cargar librerías .js externas. Se pueden cargar en vivo con `loadLib('miLib',[onLoad callback])`
- **media**: Archivos multimedia (audio,video, imagen,etc)
- **save**: con `Ctrl+S` se guarda el código introducido en el editor y se recupera cuando se ejecuta nuevamente.
- **snippets**: Archivos que se cargan dinámicamente con `snip('mi_snippet',[onLoad callback])`

---
# Comandos

Atajo de teclado|Acción
---|---
`Ctrl+Enter`|Evaluar bloque de código
`Ctrl+H`|Mostrar/ocultar código
`F11`|Pantalla completa (fullscreen)
`F10`|Muestra/oculta herramientas de desarrollo para debug (dev tools)
`F5`|Recarga pantalla (se debe volver a evaluar)
`Ctrl+mousewheel`|Aumenta/disminuye tamaño del código
`Alt+mousewheel`|Modifica la transparencia del fondo del códivo
`Ctrl+Alt+mousewheel`|Modifica valor seleccionado suma/resta 1
`Ctrl+Alt+Shift+mousewheel`|Modifica valor seleccionado suma/resta 0.1
`Ctrl+ArrowUP`|Cambia el cursor/foco de panel hacia arriba
`Ctrl+ArrowDOWN`|Cambia el cursor/foco de panel hacia abajo
`Ctrl+F`|Formatea el código bloque
`Ctrl+L`|alterna `loop()`/`noLoop()`
`Ctrl+Shift+C`|Comenta/Descomenta código

---

# Extender LeParc

Para extender *LeParc*, se pueden utilizar dos maneras.

1. En la carpeta `leparc_resources/snippets` se pueden crear fragmentos de código para ser cargados dinámicamente (on the fly) creando una cartpeta `mi_snippet/mi_snippet.js` y llamarla desde el bloque `aux:` con `snip('mi_snipet')`

2. Otra forma es utilizar el archivo `leparc_resources/extends/lp-extends.js`. Este archivo se carga una vez inicializado *LeParc*

---

# Funciones extendidas de p5j

Método|Desc
---|---
`mirrorX()`|Espejo - Refleja la imagen desde la mitad sobre el eje X
`mirrorY()`|Espejo - Refleja la imagen desde la mitad sobre el eje Y
`imirrorX()`|Espejo Invertido - Refleja la imagen desde la mitad sobre el eje X invertida
`imirrorY()`|Espejo Invertido - Refleja la imagen desde la mitad sobre el eje Y invertida
`kaleido()`|Efecto caleidoscopio 4 caras (repite la cara superior izquierda)
`zoom(escala)`|Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`
`displace(velx,vely)`|Desplaza la pantalla en la direccion `velx`  y  `vely` (+ o -)
`displace(x,y,w,h,velx,vely)`|Recorta una porcion de la imagen y la desplaza
`beginRot(vel)` y `endRot()`|rota lo que está contenido entre esas dos funciones
`freq([mult])`|Abreviación de la sentencia `millis()/1000 [* mult]`
`sinOsc([mult])`|Abreviacion de `sin( (millis()/1000) * TWO_PI [* mult] )`
`cosOsc([mult])`|Abreviacion de `cos( (millis()/1000) * TWO_PI [* mult] )`
`pulse(n_fotogramas)`|Bandera (flag) emite verdadero cada n fotogramas `if(frameCount % n_fotogramas == 0 ) return true`
`gate(n_fotogramas, duracion)`|Bandera (flag) emite verdadero cada n fotogramas con una duracion x `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true`

---

- [Comandos](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/comandos.md)
- [Funciones extendidas](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/funciones-extendidas.md)
- [Interfaz](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/interfaz.md)
- [Ejemplos y usos](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/ejemplos.md)