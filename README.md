# LeParc p5 livecoding

> (Español) - [English](https://github.com/andrusenn/leparc-lc-p5js/blob/master/README.en.md)

Entorno multiplataforma para ejecutar código [p5js](http://p5js.org/) en tiempo real.
El proyecto está compilado [Electronjs](https://electronjs.org/)

![Image](http://andressenn.com/leparc-lc/c1.jpg)
![Image](http://andressenn.com/leparc-lc/c2.jpg)
![Image](http://andressenn.com/leparc-lc/c3.jpg)
![Image](http://andressenn.com/leparc-lc/c4.jpg)

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

- `Ctrl+Enter` Evaluar bloque de código
- `Alt+Enter` Evaluar línea de código (solo en setup() y aux())
- `Ctrl+H` Mostrar/ocultar código
- Mostrar/ocultar paneles `F1` (setup)`F2` (draw)`F3` (aux)
- `F11` Pantalla completa (fullscreen)
- `F10` Muestra/oculta herramientas de desarrollo para debug (dev tools)
- `F5` Recarga pantalla
- `Ctrl+mousewheel` Aumenta/disminuye tamaño del código
- `Alt+mousewheel` Modifica la transparencia del fondo del códivo
- `Ctrl+Alt+mousewheel` Modifica valor seleccionado suma/resta 1
- `Ctrl+Alt+Shift+mousewheel` Modifica valor seleccionado suma/resta 0.1
- `Ctrl+ArrowUP` Cambia el cursor/foco de panel hacia arriba
- `Ctrl+ArrowDOWN` Cambia el cursor/foco de panel hacia abajo
- `Ctrl+F` Formatea el código bloque

### Bloques de código

>Los bloques se evalúan por separado y se agrega el bloque `aux:` que ejecuta código por fuera de los otros dos.
>Se pueden utilizar las funciones/metodos de p5js en cualquier bloque

- `setup:` -> `setup(){ // }`
- `draw:` -> `draw(){ // }`

### Variables y funciones globales

Para acceder a variables desde otros bloques, la declaración no debe llevar `var`,`let` o `const`
Lo mismo para las funciones:

~~~js
x = 'code'

mifunc = function(){
      console.log('Hola LeParc!')
}

~~~

### Funciones extendidas de p5j

- `mirrorX()` Espejo - Refleja la imagen desde la mitad sobre el eje X
- `mirrorY()` Espejo - Refleja la imagen desde la mitad sobre el eje Y
- `imirrorX()` Espejo Invertido - Refleja la imagen desde la mitad sobre el eje X invertida
- `imirrorY()` Espejo Invertido - Refleja la imagen desde la mitad sobre el eje Y invertida
- `kaleido()` Efecto caleidoscopio 4 caras (repite la cara superior derecha)
- `zoom(escala)` Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`
- `displace(velx,vely)` Desplaza la pantalla en la direccion `velx` y `vely` (+ o -)
- `displace(x,y,w,h,velx,vely)` Recorta una porcion de la imagen y la desplaza
- `beginRot(vel_in_radians[,scale])` y `endRot()` rota lo que está contenido entre esas dos funciones
- `freq(mult)` Abreviación de la sentencia `frameCount * mult`
- `osc([freq])` Abreviacion de `sin( frameCount * freq )`
- `cosc([freq])` Abreviación de `{sin: sin( frameCount * freq ), cos: cos( frameCount * freq )}`

#### Media

##### Webcam

- En setup: `useCam([ancho,alto])`
- En draw: `getCam(x,y)`

##### Audio

- En setup: `useAudio([source[,smoothing]])` -> source 0 es el índice por defecto / 1,2,n.. dependiendo el hardware. Smoothing es el suavizado en las respuestas de las frecuencias  (0 rápido hasta 1 lento)
- En draw: `audioEnergy(fracuencia1[,frecuencia2])` -> obtiene la energía (volume) de la frecuencia o rango de frecuencias (0-255)

### Ventana de configuraciones

- `Ctrl+TAB` Abre popup de configuraciones

#### Compilado automatico

> **RENDER DRAW ON FLY** -> Solo es funcional en el bloque de `draw(){}`