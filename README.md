# Duchamp p5 livecoding

Entorno multiplataforma para ejecutar código p5js en tiempo real.

![Image](http://andressenn.com/duchamp-lc/captura2.jpg)
![Image](http://andressenn.com/duchamp-lc/captura.jpg)

----

## Uso

### Instalación

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

- `Ctrl+Enter` Evaluar código
- `Ctrl+H` Mostrar/ocultar código
- Mostrar/ocultar paneles `F1` (setup)`F2` (draw)`F3` (aux)
- `F11` Pantalla completa (fullscreen)
- `F10` Muestra/oculta herramientas de desarrollo para debug (dev tools) 
- `F5` Recarga pantalla 
- `Ctrl+mousewheel` Aumenta/disminuye tamaño del código 
- `Alt+mousewheel` Modifica la transparencia del fondo del códivo

### Bloques de código

>Los bloques se evalúan por separado y se agrega el bloque `aux:` que ejecuta código por fuera de los otros dos

- `setup:` -> `setup(){ // }`
- `draw:` -> `draw(){ // }`

### Variables y funciones globales

Para acceder a variables desde otros bloques, la declaración no debe llevar `var`,`let` o `const`
Lo mismo para las funciones:
~~~
mifunc = function(){
      console.log('Hola Duchamp!')
}
~~~

### Funciones extendidas de p5j


- `mirrorX()` Espejo - Invierte la imagen desde la mitad sobre el eje X 
- `mirrorY()` Espejo - Invierte la imagen desde la mitad sobre el eje Y
- `kaleido()` = `mirrorX()`+`mirrorY()` Efecto caleidoscopio 4 caras
- `zoom(escala)` Escala la imagen en cada loop sumando el valor del parámetro: `zoom(0.01)` o negativo `zoom(-0.01)`
- `displace(velx,vely)` Desplaza la pantalla en la direccion `velx` y `vely` (+ o -)
- `displace(x,y,w,h,velx,vely)` Recorta una porcion de la imagen y la desplaza
- `beginRot(vel_in_radians[,scale])` y `endRot()` rota lo que está contenido entre esas dos funciones

#### Media

##### Webcam

- En setup: `useCam([ancho,alto])`
- En draw: `getCam(x,y)`