# LeParc p5js livecoder

> ATENCIÓN -> Se está trabajando en una rama que cambia los tres bloques de código que están separados por un solo. La evaluación de cada bloque (setup,draw) será dependiendo del contexto [ver rama](https://github.com/andrusenn/leparc-lc-p5js/tree/bloque1)

> (Español) - [English](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.md)

Entorno multiplataforma para ejecutar código [p5js](https://p5js.org/es/) en tiempo real.
El proyecto está compilado [Electronjs](https://electronjs.org/)

Este proyecto nace como una herramienta de uso personal, y fue girando a una herramienta performática, incorporando la filosofía del livecoding.

El objetivo es que sea un entorno extensible (hackeable) en donde se puedan programar recursos o snippets para utilizar y compartir. Además, cargar las librerías js compatibles con p5js.

El corazón de *LeParc* es Javascript y librerías p5js, Codemirror (editor), jsbeautify (formateador). Y con Electronjs (node.js, chromium, v8) para crear aplicaciones nativas.

Puedes reportar si encuentras algún error o bug. Te intivo también a forkear el proyecto.

> [Aquí puedes encontrar más ayuda](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es)

![Image](http://andressenn.com/leparc-lc/lp01.jpg)

----

## Uso

### Instalación

#### Descarga compilado

[descarga](https://github.com/andrusenn/leparc-lc-p5js/releases) linux/win/mac

En la primer ejecución se creará el directorio "leparc_resources" en el "home" o cuenta de usuario de su sistema operativo:

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
      │      ├── draw.txt
      │      └── setup.txt
      └── snippets/
            └── espiro/
                  └── espiro.js

~~~

- Usuarios linux: AppImage deberán seleccionar "ejecutar como programa"

#### Bajar fuente

> [Nodejs](https://nodejs.org/en/) y Npm deben estar instalados en su sitema

1. clonar repositorio
2. `cd src` (directorio raiz)
3. `npm install && npm start`

#### Compilar

4. `npm run dist-linux` |  `npm run dist-win` | `npm run dist-mac`

### Comandos

Atajo de teclado | Acción
--- | ---
`Ctrl+Enter` | Evaluar bloque de código
`Alt+Enter` | Evaluar línea de código (solo en setup() y aux())
`Ctrl+H` | Mostrar/ocultar código
`F1 F2 F3` | Mostrar/ocultar paneles  (aux) (setup) (draw)
`F11` | Pantalla completa (fullscreen)
`F10` | Muestra/oculta herramientas de desarrollo para debug (dev tools)
`F5` | Recarga pantalla (se debe volver a evaluar)
`Ctrl+mousewheel` | Aumenta/disminuye tamaño del código
`Alt+mousewheel` | Modifica la transparencia del fondo del códivo
`Ctrl+Alt+mousewheel` | Modifica valor seleccionado suma/resta 1
`Ctrl+Alt+Shift+mousewheel` | Modifica valor seleccionado suma/resta 0.1
`Ctrl+ArrowUP` | Cambia el cursor/foco de panel hacia arriba
`Ctrl+ArrowDOWN` | Cambia el cursor/foco de panel hacia abajo
`Ctrl+F` | Formatea el código bloque
`Ctrl+L` | alterna loop()/noLoop()
`Ctrl+Shift+C` | Comenta/Descomenta código

### Bloques de código

> `function setup(){}` y `function draw(){}` son solo ayudas visuales. No se pueden modificar. Hay tareas que se ejecutan en esos bloques. Ver código fuente (lp5-renderer.js)
> Los bloques se evalúan por separado y se agrega el bloque `aux:` que ejecuta código por fuera de los otros dos.
> Se pueden utilizar las funciones/metodos de p5js en cualquier bloque

- `setup:` -> `function setup(){ // }`
- `loop:` -> `function draw(){ // }`
  
#### Diferencia entre setup(){} y aux(){}

El bloque `setup` reinicializa varios objetos y funciones de p5, mientras que `aux` no.

### Variables y funciones globales

Para acceder a variables desde otros bloques, se provee un objeto global para utilizar: `lp`, y de forma simplificada toda variable con prefijo `$` se transformará en global

> En aux

~~~js

x = 1 // error -> se está utilizando strict mode

lp.x = 'code!'
// o abreviada
$x = 'code!'

lp.miFuncion = function(){
      console.log('Hola LeParc!')
}
// o abreviada
$miFuncion = function(){
      console.log('Hola LeParc!')
}

~~~

> En draw

~~~js

lp.miFuncion() // salida -> Hola LeParc!
console.log(lp.x) // salida -> code!
// o abreviada
$miFuncion() // salida -> Hola LeParc!
console.log($x) // salida -> code!

~~~

### Eventos

Se pueden declarar los eventos en el bloque `aux`

~~~js

mouseClicked = function(){
  console.log('evt click')
}

mouseMoved = function(){
  console.log('evt mousemove')
}

// Etc
~~~

### Funciones extendidas de p5j

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
|`pulse(n_fotogramas)`|Bandera (flag basado en frameCount) emite verdadero cada n fotogramas `if(frameCount % n_fotogramas == 0 ) return true`|
|`gate(n_fotogramas, duracion)`|Bandera (flag basado en frameCount) emite verdadero cada n fotogramas con una duracion x `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true`|
| `tpulse(millis [,millis_duration, millis_offset])` | Bandera (flag basado en milisegundos). Return `true` cada n millis con una duracion de `millis_ duration` y offset de `millis_offset` |
| `trange(number [,millis_duration])` | Bandera (flag basado en milisegundos). Return  `0` a `number` en una duración de `millis_duration` |

#### Media

##### Webcam

- En setup: `useCam([ancho,alto])`
- En draw: `getCam(x,y)`

##### Audio

- En setup: `useAudio([source[,smoothing]])` -> source 0 es el índice por defecto / 1,2,n.. dependiendo el hardware. Smoothing es el suavizado en las respuestas de las frecuencias  (0 rápido hasta 1 lento)
- En draw: `audioEnergy(fracuencia1[,frecuencia2])` -> obtiene la energía (volume) de la frecuencia o rango de frecuencias. Retorna de 0 a 255

##### Carga archivos externos

Para la carga de archivos (imágenes, videos, sonidos), se utiliza el directorio *media*.
El método `mediaPath()` devuelve la ruta absoluta a ese directorio.

~~~js

// ~home/leparc_resources/media/
loadImage( mediaPath() + '/miImagen.jpg',(i)=>{
  lp.im = i
})

~~~

### Modo cliente/servidor

Para la configuración de la IP a la cual se conectan los nodos en modo CLIENTE, modificar la variable **server-ip** y **port** en *leparc_resources/config/config.txt*

### Ventana de configuraciones

- `Ctrl+TAB` Abre popup de configuraciones
  - **AUTO RENDER** -> Solo es funcional en el bloque de `draw(){}`
  - **RENDER** -> 2D o 3D
  - **BLOCK NAMES** -> Nombre de los bloques (ayuda visual)
  - **MODE (net)**
    - LOCAL -> Por defecto
    - SERVER -> Activa el modo servidor
    - CLIENT -> Activa el modo cliente
  - **SYNC (net)** -> Activa/desactiva la sincro con el cliente (afecta el `frameRate`)
  - **NAME (net)** -> Nombre del nodo cliente (por defecto el id socket)
  - **LANG** -> EN/ES Idioma de la interfaz

----

### Ejemplos y usos

> [ver docs](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/ejemplos.md)
