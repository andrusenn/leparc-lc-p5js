# LeParc p5js livecoder

Esta referencia es para versiones 0.2 o mayores.

> (Español) - [English](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.md)

Entorno multiplataforma para ejecutar código [p5js](https://p5js.org/es/) en tiempo real.
El proyecto está compilado [Electronjs](https://electronjs.org/)

Este proyecto nace como una herramienta de uso personal, y fue girando a una herramienta performática, incorporando la filosofía del livecoding.

El objetivo es que sea un entorno extensible (hackeable) en donde se puedan programar recursos o snippets para utilizar y compartir. Además, cargar las librerías js compatibles con p5js.

El corazón de *LeParc* es Javascript y librerías p5js, Codemirror (editor), jsbeautify (formateador). Y con Electronjs (node.js, chromium, v8) para crear aplicaciones nativas.

Puedes reportar si encuentras algún error o bug. Te intivo también a forkear el proyecto.

![Image](http://andressenn.com/leparc-lc/lp02.jpg)

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

## Referencia rápida

IMPORTANTE! Hay dos modos disponibles en la configuración (`Ctrl+Tab`) para utilizar: 

* `STATIC` Todo el código escrito es evaluado. En este modo se puede enseñar/aprender o experimentar. NO HAY GESTOR DE ERRORES (Si hay algún error el loop se detiene).
* `LIVECODING` Cada bloque es evaluado por separado. Esto permite ejecutar código en vivo, y hay diferencias con el modo estático en la declaración de variables globales.
  
### Comandos

Atajo de teclado | Acción
--- | ---
`Ctrl+Enter` | Evaluar bloque de código
`Ctrl+H` | Mostrar/ocultar código
`F11` | Pantalla completa (fullscreen)
`F10` | Muestra/oculta herramientas de desarrollo para debug (dev tools)
`F5` | Recarga pantalla (se debe volver a evaluar)
`Ctrl+mousewheel` | Aumenta/disminuye tamaño del código
`Alt+mousewheel` | Modifica la transparencia del fondo del códivo
`Ctrl+Alt+mousewheel` | Modifica valor seleccionado suma/resta 1
`Ctrl+Alt+Shift+mousewheel` | Modifica valor seleccionado suma/resta 0.1
`Ctrl+F` | Formatea el código bloque
`Ctrl+L` | alterna loop()/noLoop()
`Ctrl+Shift+C` | Comenta/Descomenta código

### Bloques de código

`function setup(){}` y `function draw(){}` son los bloques principales. El códigi se evalúa (`Ctrl+Enter`) selectivamente dependiendo del contexto.

Se pueden utilizar las funciones/metodos de p5js.
  
## Variables y funciones globales  (`Livecoding mode`)

Para acceder a variables globales se provee un objeto para utilizar: `lp`, y de forma simplificada toda variable con prefijo `$` se transformará en global

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

lp.miFuncion() // salida -> Hola LeParc!
console.log(lp.x) // salida -> code!
// o abreviada
$miFuncion() // salida -> Hola LeParc!
console.log($x) // salida -> code!

~~~

### Eventos

~~~js

function mouseClicked(){
  console.log('evt click')
}

// Etc
~~~

### Funciones extendidas de p5j

Método|Desc
---|---
`mirrorX()`|Espejo - Refleja la imagen desde la mitad sobre el eje X
`mirrorY()`|Espejo - Refleja la imagen desde la mitad sobre el eje Y
`imirrorX()`|Espejo Invertido - Refleja la imagen desde la mitad sobre el eje X invertida
`imirrorY()`|Espejo Invertido - Refleja la imagen desde la mitad sobre el eje Y invertida
`kaleido()`|Efecto caleidoscopio 4 caras (repite la cara superior derecha)
`zoom(escala)`|Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`
`displace(velx,vely)`|Desplaza la pantalla en la direccion `velx`  y  `vely` (+ o -)
`displace(x,y,w,h,velx,vely)`|Recorta una porcion de la imagen y la desplaza
`beginRot(vel_in_radians[,scale])` y `endRot()`|rota lo que está contenido entre esas dos funciones
`freq([mult])`|Abreviación de la sentencia `millis()/1000 [* mult]`
`sinOsc([mult])`|Abreviacion de `sin( (millis()/1000) * TWO_PI [* mult] )`
`cosOsc([mult])`|Abreviacion de `cos( (millis()/1000) * TWO_PI [* mult] )`
`pulse(n_fotogramas)`|Bandera (flag basado en frameCount) emite verdadero cada n fotogramas `if(frameCount % n_fotogramas == 0 ) return true`
`gate(n_fotogramas, duracion)`|Bandera (flag basado en frameCount) emite verdadero cada n fotogramas con una duracion x `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true`
 `tpulse(millis [,millis_duration, millis_offset])` | Bandera (flag basado en milisegundos). Return `true` cada n millis con una duracion de `millis_ duration` y offset de `millis_offset`
 `trange(number [,millis_duration])` | Bandera (flag basado en milisegundos). Return  `0` a `number` en una duración de `millis_duration`

#### Media (`Livecoding mode`)

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
loadImage( mediaPath('miImagen.jpg'),(i)=>{
  $im = i
})

~~~

### Modo cliente/servidor

Para la configuración de la IP a la cual se conectan los nodos en modo CLIENTE, modificar la variable **server-ip** y **port** en *leparc_resources/config/config.txt*

### Ventana de configuraciones

- `Ctrl+TAB` Abre popup de configuraciones
  - **AUTO RENDER** -> Solo es funcional en el bloque de `draw(){}`
  - **RENDER** -> 2D o 3D
  - **NÚMEROS DE LÍNEA** Muestra/oculta los numeros de línea
  - **MODE (net)**
    - LOCAL -> Por defecto
    - SERVER -> Activa el modo servidor
    - CLIENT -> Activa el modo cliente
  - **SYNC (net)** -> Activa/desactiva la sincro con el cliente (afecta el `frameRate`)
  - **NAME (net)** -> Nombre del nodo cliente (por defecto el id socket)
  - **LANG** -> EN/ES Idioma de la interfaz
