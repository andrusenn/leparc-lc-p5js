# LeParc p5 livecoder

> (Español) - [English](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.en.md)

Entorno multiplataforma para ejecutar código [p5js](https://p5js.org/es/) en tiempo real.
El proyecto está compilado [Electronjs](https://electronjs.org/)

Este proyecto nace como una herramienta de uso personal, y fue girando a una herramienta performática, incorporando la filosofía del livecoding.

![Image](http://andressenn.com/leparc-lc/lp01.jpg)

----

## Uso

### Instalación

#### Descarga compilado

[descarga](https://github.com/andrusenn/leparc-lc-p5js/releases) linux/win/mac

- En la primer ejecución se creará el directorio "leparc_resources" en el "home" o cuenta de usuario de su sistema operativo
- Usuarios linux: AppImage deberán seleccionar "ejecutar como programa"

#### Bajar fuente

1. clonar repositorio
2. `cd src` (directorio raiz)
3. `npm install && npm start`

#### Compilar

1. clonar repository
2. `cd src` (root dir)
3. `npm install`
4. `npm run dist-linux` |  `npm run dist-win` | `npm run dist-mac`

### Comandos

<table>
  <tr>
    <th>Atajo de teclado</th><th>Acción</th>
  </tr>
  <tr>
    <td><code>Ctrl+Enter</code></td><td>Evaluar bloque de código</td>
  </tr>
  <tr>
    <td><code>Alt+Enter</code></td><td>Evaluar línea de código (solo en setup() y aux())</td>
  </tr>
  <tr>
    <td><code>Ctrl+H</code></td><td>Mostrar/ocultar código</td>
  </tr>
  <tr>
    <td><code>F1 F2 F3</code></td><td>Mostrar/ocultar paneles (setup) (draw) (aux)</td>
  </tr>
  <tr>
    <td><code>F11</code></td><td>Pantalla completa (fullscreen)</td>
  </tr>
  <tr>
    <td><code>F10</code></td><td>Muestra/oculta herramientas de desarrollo para debug (dev tools)</td>
  </tr>
  <tr>
    <td><code>F5</code></td><td>Recarga pantalla (se debe volver a evaluar)</td>
  </tr>
  <tr>
    <td><code>Ctrl+mousewheel</code></td><td>Aumenta/disminuye tamaño del código</td>
  </tr>
  <tr>
    <td><code>Alt+mousewheel</code></td><td>Modifica la transparencia del fondo del códivo</td>
  </tr>
  <tr>
    <td><code>Ctrl+Alt+mousewheel</code></td><td>Modifica valor seleccionado suma/resta 1</td>
  </tr>
  <tr>
    <td><code>Ctrl+Alt+Shift+mousewheel</code></td><td>Modifica valor seleccionado suma/resta 0.1</td>
  </tr>
  <tr>
    <td><code>Ctrl+ArrowUP</code></td><td>Cambia el cursor/foco de panel hacia arriba</td>
  </tr>
  <tr>
    <td><code>Ctrl+ArrowDOWN</code></td><td>Cambia el cursor/foco de panel hacia abajo</td>
  </tr>
  <tr>
    <td><code>Ctrl+F</code></td><td>Formatea el código bloque</td>
  </tr>
  <tr>
    <td><code>Ctrl+L</code></td><td>alterna loop()/noLoop()</td>
  </tr>
  <tr>
    <td><code>Ctrl+Shift+C</code></td><td>Comenta/Descomenta código</td>
  </tr>
</table>

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

<table>
  <tr>
    <th>method</th><th>Desc</th>
  </tr>
  <tr>
    <td>
    <code>mirrorX()</code>
    </td>
    <td>
    Espejo - Refleja la imagen desde la mitad sobre el eje X
    </td>
  </tr>
  <tr>
    <td>
    <code>mirrorY()</code>
    </td>
    <td>
    Espejo - Refleja la imagen desde la mitad sobre el eje Y
    </td>
  </tr>
  <tr>
    <td>
    <code>imirrorX()</code>
    </td>
    <td>
    Espejo Invertido - Refleja la imagen desde la mitad sobre el eje X invertida
    </td>
  </tr>
  <tr>
    <td>
    <code>imirrorY()</code>
    </td>
    <td>
    Espejo Invertido - Refleja la imagen desde la mitad sobre el eje Y invertida
    </td>
  </tr>
  <tr>
    <td>
    <code>kaleido()</code>
    </td>
    <td>
    Efecto caleidoscopio 4 caras (repite la cara superior derecha)
    </td>
  </tr>
  <tr>
    <td>
    <code>zoom(escala)</code>
    </td>
    <td>
   Escala la imagen en cada loop sumando el valor del parámetro: <code>zoom(0.01)</code> o negativo <code>zoom(-0.01)</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>displace(velx,vely)</code>
    </td>
    <td>
   Desplaza la pantalla en la direccion <code>velx</code> y <code>vely</code> (+ o -)
    </td>
  </tr>
  <tr>
    <td>
    <code>displace(x,y,w,h,velx,vely)</code>
    </td>
    <td>
   Recorta una porcion de la imagen y la desplaza
    </td>
  </tr>
  <tr>
    <td>
    <code>beginRot(vel_in_radians[,scale])</code> y <code>endRot()</code>
    </td>
    <td>
   rota lo que está contenido entre esas dos funciones
    </td>
  </tr>
  <tr>
    <td>
    <code>freq(mult)</code>
    </td>
    <td>
   Abreviación de la sentencia <code>frameCount * mult</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>osc([freq])</code>
    </td>
    <td>
   Abreviacion de <code>sin( frameCount * freq )</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>cosc([freq])</code>
    </td>
    <td>
   Abreviacion de <code>{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>pulse(n_fotogramas)</code>
    </td>
    <td>
   Bandera (flag) emite verdadero cada n fotogramas <code>if(frameCount % n_fotogramas == 0 ) return true</code>
    </td>
  </tr>
  <tr>
    <td>
    <code>gate(n_fotogramas, duracion)</code>
    </td>
    <td>
   Bandera (flag) emite verdadero cada n fotogramas con una duracion x <code>if(frameCount % n_fotogramas > n_fotogramas - duracion ) return true</code>
    </td>
  </tr>
</table>

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
  - **MODE (net)**
    - LOCAL -> Por defecto
    - SERVER -> Activa el modo servidor
    - CLIENT -> Activa el modo cliente
  - **SYNC (net)** -> Activa/desactiva la sincro con el cliente (afecta el `frameRate`)
  - **NAME (net)** -> Nombre del nodo cliente (por defecto el id socket)
  - **BLOCK NAMES** -> Nombre de los bloques (ayuda visual)

----

### Ejemplos

> [Ejemplos](https://github.com/andrusenn/leparc-lc-p5js/wiki)