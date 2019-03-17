# Duchamp p5 livecoding

Entorno multiplataforma para ejecutar código p5js en tiempo real. Desarrollado en html5 y electron.js
Este proyecto recién se inicia y está en una etapa embrionaria (beta version)

![Image](http://andressenn.com/duchamp-lc/captura2.jpg)
![Image](http://andressenn.com/duchamp-lc/captura.jpg) 

----

## Uso

### Instalación

#### Bajar fuente

>1. clonar repositorio
>2. ```cd src``` (directorio raiz)
>3. ```npm install && npm start```

### Comandos

- ```Ctrl+Enter``` Evaluar código 
- ```Ctrl+H``` Mostrar/ocultar código 
- Mostrar/ocultar paneles ```F1``` (setup)```F2``` (draw)```F3``` (global)
- ```F11``` Pantalla completa (fullscreen)
- ```F10``` Muestra/oculta herramientas de desarrollo para debug (dev tools) 
- ```F5``` Recarga pantalla 
- ```Ctrl+mousewheel``` Aumenta/disminuye tamaño del código 

### Funciones extendidas de p5j


- ```mirrorX()``` Espejo - Invierte la imagen desde la mitad sobre el eje X 
- ```mirrorY()``` Espejo - Invierte la imagen desde la mitad sobre el eje Y
- ```kaleido()``` = ```mirrorX()```+```mirrorY()``` Efecto caleidoscopio 4 caras
- ```zoom(escala)``` Escala la imagen en cada loop sumando el valor del parámetro: ```zoom(0.01)``` o negativo ```zoom(-0.01)```
- ```displace(x,y,w,h,velx,vely)``` Recorta una porcion de la imagen y la desplaza
- ```beginRot(vel_in_radians,scale)``` y ```endRot()``` rota lo que está contenido entre esas dos funciones

#### Media
##### Webcam

- En setup: ```useWebcam(ancho[opcional],alto[opcional])``` 
- En loop: ```getWebcam(x,y)```



