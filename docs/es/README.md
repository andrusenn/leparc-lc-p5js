# LeParc p5js Livecoder

LeParc es una herramienta para codificar/programar en vivo con javascript.
Utiliza la librería [p5js](https://p5js.org/es/) como base y Electronjs para correrlo nativamente en cualquier sistema operativo.

\+ Codemirror
\+ BeautifyJS

- [LeParc p5js Livecoder](#LeParc-p5js-Livecoder)
  - [Estructura de carpetas](#Estructura-de-carpetas)
  - [Comandos](#Comandos)
  - [Funciones extendidas de p5j](#Funciones-extendidas-de-p5j)
  - [Extender LeParc](#Extender-LeParc)
  - [Uso de bloques](#Uso-de-bloques)
    - [LIVECODING](#LIVECODING)
    - [STATIC](#STATIC)
  - [Ámbito de las variables](#%C3%81mbito-de-las-variables)
  - [Audio](#Audio)
  - [Webcam](#Webcam)
  - [Snippets](#Snippets)
  - [Mi propio snippet](#Mi-propio-snippet)
  - [Cargar archivos multimedia](#Cargar-archivos-multimedia)

## Estructura de carpetas

La primera vez que se ejecuta, se crean varias carpetas en el directorio del usuario dependiendo del sistema operativo:

~~~txt

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

## Comandos

| Atajo de teclado            | Acción                                                           |
| --------------------------- | ---------------------------------------------------------------- |
| `Ctrl+Enter`                | Evaluar bloque de código                                         |
| `Ctrl+H`                    | Mostrar/ocultar código                                           |
| `F11`                       | Pantalla completa (fullscreen)                                   |
| `F10`                       | Muestra/oculta herramientas de desarrollo para debug (dev tools) |
| `F5`                        | Recarga pantalla (se debe volver a evaluar)                      |
| `Ctrl+mousewheel`           | Aumenta/disminuye tamaño del código                              |
| `Alt+mousewheel`            | Modifica la transparencia del fondo del códivo                   |
| `Ctrl+Alt+mousewheel`       | Modifica valor seleccionado suma/resta 1                         |
| `Ctrl+Alt+Shift+mousewheel` | Modifica valor seleccionado suma/resta 0.1                       |
| `Ctrl+F`                    | Formatea el código bloque                                        |
| `Ctrl+L`                    | alterna `loop()`/`noLoop()`                                      |
| `Ctrl+Shift+C`              | Comenta/Descomenta código                                        |
([indice](#LeParc-p5js-Livecoder))

---

## Funciones extendidas de p5j

| Método                                                                | Desc                                                                                                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `fade(alpha)`<br>`fade(r,g,b,alpha)`<br>`fade(r,g,b,alpha,colorMode)` | Genera un fade out constante param: 0-255 o (r,g,b,a) o (r,g,b,a,colorMode)                                                                |
| `mirrorX()`                                                           | Espejo - Refleja la imagen desde la mitad sobre el eje X                                                                                   |
| `mirrorY()`                                                           | Espejo - Refleja la imagen desde la mitad sobre el eje Y                                                                                   |
| `imirrorX()`                                                          | Espejo Invertido - Refleja la imagen desde la mitad sobre el eje X invertida                                                               |
| `imirrorY()`                                                          | Espejo Invertido - Refleja la imagen desde la mitad sobre el eje Y invertida                                                               |
| `kaleido()`                                                           | Efecto caleidoscopio 4 caras (repite la cara superior izquierda)                                                                           |
| `zoom(escala)`                                                        | Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`                                        |
| `displace(velx,vely)`                                                 | Desplaza la pantalla en la direccion `velx`  y  `vely` (+ o -)                                                                             |
| `displace(x,y,w,h,velx,vely)`                                         | Recorta una porcion de la imagen y la desplaza                                                                                             |
| `beginRot(vel)` y `endRot()`                                          | rota lo que está contenido entre esas dos funciones                                                                                        |
| `freq([mult])`                                                        | Abreviación de la sentencia `millis()/1000 [* mult]`                                                                                       |
| `sinOsc([mult])`                                                      | Abreviacion de `sin( (millis()/1000) * TWO_PI [* mult] )`                                                                                  |
| `cosOsc([mult])`                                                      | Abreviacion de `cos( (millis()/1000) * TWO_PI [* mult] )`                                                                                  |
| `pulse(n_fotogramas)`                                                 | Bandera (flag) emite verdadero cada n fotogramas `if(frameCount % n_fotogramas == 0 ) return true`                                         |
| `gate(n_fotogramas, duracion)`                                        | Bandera (flag) emite verdadero cada n fotogramas con una duracion x `if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true` |

([indice](#LeParc-p5js-Livecoder))

---

## Extender LeParc

Para extender *LeParc*, se pueden utilizar dos maneras.

1. En la carpeta `leparc_resources/snippets` se pueden crear fragmentos de código para ser cargados dinámicamente (on the fly) creando una cartpeta `mi_snippet/mi_snippet.js` y llamarla desde el bloque `aux:` con `snip('mi_snipet')`
2. Otra forma es utilizar el archivo `leparc_resources/extends/lp-extends.js`. Este archivo se carga una vez inicializado *LeParc*

([indice](#LeParc-p5js-Livecoder))

---

## Uso de bloques

Desde la versión 0.2, LeParc tiene dos modos. Abrir config (`Ctrl+Tab`)

- LIVECODING
- STATIC

### LIVECODING

En este modo se evalua el código por su contexto. Por ejemplo si posicionamos el cursor dentro de la funcion `setup()`, solo se evalua ese bloque. Lo mismo para `draw()` u otras funciones.

Las variables declaradas fuera de los bloques (funciones), deben estar precedidas con `$`, esto las convierte en globales para ser accedidas desde cualquier bloque.

Además, en este modo hay un especial cuidado en el control de errores para que no se detenga el loop (`draw()`)

### STATIC

En este modo se utiliza como un archivo de js común, y a diferencia del modo LIVECODING, se evalua todo el codigo, por eso no es necesario declarar variables globales.

En este modo podemos experimentar con p5js como si estubiéramos trabajando en el archivo sketch.js

([indice](#LeParc-p5js-Livecoder))

---

## Ámbito de las variables

Para el modo LIVECODING las variables declaradas fuera de los bloques, deben utilizar el prefijo `$`

~~~js
      // Solo en modo LIVECODING
      // En este modo la evaluación del código se hace por contexto

      // Variables
      let local = 'local'
      $global = 'global'

      // Funciones
      let mi_funcion_local = function(){
            console.log('Solo se puede ejecutar en este bloque')
      }

      $mi_funcion_global = function(){
            console.log('Se puede ejecutar en cualquier bloque')
      }

      function setup(){
            console.log(local) // -> error
            console.log($global) // -> global

            $mi_funcion_global() // -> Se puede ejecutar en cualquier bloque
      }

~~~

([indice](#LeParc-p5js-Livecoder))

---

## Audio

~~~js
      // Solo en modo LIVECODING
      // En modo STATIC -> let audioIn = new p5.AudioIn()

      function setup(){
            useAudio(1)
            // 0 por defecto, es el micrófono
            // 1 es la entrada del mixer
            // Ver configuración de hardware
      }

      function draw(){
            background(0)
            let ae = audioEnergy(1000)
            // audioEnergy(freq[,freq]) -> retorna 0-255 volume
            // de la frecuencia o rango de frcuencias especificadas
            // (ver p5js audio lib)
            // console.log(ae)
            noFill()
            stroke(255)
            rectMode(CENTER)
            rect(width/2,height/2,ae,ae)
      }
~~~

([indice](#LeParc-p5js-Livecoder))

---

## Webcam

~~~js
      // Solo en modo LIVECODING
      // En modo STATIC -> let cam = vreateCapture(VIDEO)

      function setup(){
            useCam()
            // Por defecto 320x240
            // useCam(640,480)
      }

      function draw(){
            background(0)

            getCam(0,0)
            // Imprime la imagen

            // O se puede obtener la imagen
            let img = imgCam()
            image(img,0,0)
      }
~~~

([indice](#LeParc-p5js-Livecoder))

---

## Snippets

El verdadero potencial de LeParc está en que podemos armar nuestros propios códigos/algoritmos para utilizar en vivo.

Los snippets son porciones de código reutilizables y se cargan dinámicamente con el método `snip('mi_snipet')`. Pueden contener funciones, clases, sentencias, variables, parámetros etc...

~~~js
      // Snippet incluido clase EspiroNoise
      // leparc_resources/espiro/espiro.js

      // Siempre evaluar cada bloque (Ctrl+Enter)

      snip('espiro', function(){
            // una vez cargado
            $espiro = new EspiroNoise(width/2,height/2)
      }) // Carga la funcion/clase etc

      function draw(){
            fade(10)
            if($espiro){
                  $espiro.draw((x, y) => {
                              stroke(255, 120)
                              strokeWeight(0.1)
                              point(x, y)
                        }).points(2000)
                        .toggle(280, 800)
                        .friction(0.99)
            }
      }
~~~

([indice](#LeParc-p5js-Livecoder))

---

## Mi propio snippet

Crear carpeta dentro de `leparc_resources/snippets` y el archivo .js con el mismo nombre

~~~txt

leparc_resources/
      └── snippets/
            └── mi_snippet/
                  └── mi_snippet.js
~~~

En `leparc_resources/snippets/mi_snippet/mi_snippet.js`

~~~js

let mi_funcion = function(){
      console.log('mi primer snipet')
}

// hacer global
if (!global.hasOwnProperty('mi_funcion')) {
      global.mi_funcion = mi_funcion
}
// o también de esta forma hacer global
// if (!lp.hasOwnProperty('espiro')) {
//       lp.mi_funcion = mi_funcion // -> utilizamos $mi_funcion
// }

~~~

En editor:

~~~js
      // Carga desde snippets el archivo creado mi_snippet/mi_snippet.js
      snip('mi_snippet',()=>{
            // Cuando se carga, hacemos alguna cosa
      })

      function setup(){
            // utilizar
            mi_funcion()
      }
~~~

([indice](#LeParc-p5js-Livecoder))

---

## Cargar archivos multimedia


~~~js
      // Carga desde media/ el archivo mi_video.mp4
      createVideo(mediaPath('mi_video.mp4'),(v)=>{
            $video = v
            $video.play()
      })
      // Carga desde media/ el archivo mi_video.mp4
      loadImage(mediaPath('mi_imagen.png'),(i)=>{
            $img = i
      })

      function draw(){
            // Mostrar video
            image($video,0,0)
            // Mostrar imagen
            image($img,0,0)
      }

~~~

([indice](#LeParc-p5js-Livecoder))
