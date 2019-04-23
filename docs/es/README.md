# LeParc p5js Livecoder

LeParc es una herramienta para codificar/programar en vivo con javascript.
Utiliza la librería [p5js](https://p5js.org/es/) como base y Electronjs para correrlo nativamente en cualquier sistema operativo.

### Estructura de carpetas

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
      │      ├── draw.txt
      │      └── setup.txt
      └── snippets/
            └── espiro/
                  └── espiro.js
~~~

- **config**: configuraciones varias (server-ip,port,etc)
- **extends**: Este archivo se carga cuando se ejecuta el programa.
- **libs**: Carpeta destinada a cargar librerías .js externas.
- **media**: Archivos multimedia (audio,video, imagen)
- **save**: se guarda el código introducido en los bloques y se recupera cuando se ejecuta nuevamente. (`Ctrl+S`)
- **snippets**: Archivos que se cargan dinámicamente en bloque `aux:` con `snip('mi_snippet',[callback])`

---

- [Comandos](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/comandos.md)
- [Funciones extendidas](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/funciones-extendidas.md)
- [Interfaz](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/interfaz.md)
- [Ejemplos y usos](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/ejemplos.md)