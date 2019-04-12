# LeParc Livecoder

LeParc is a tool for live code.
Based on [p5js](https://p5js.org/es/) library.

### Directory structure

Once installed, several folders are created:

```

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
```

- **config**: Configurations like (server-ip,port,etc)
- **extends**: This file is loaded when start program
- **libs**: Folder to load external libraries
- **media**: Media assets (audio,video, images)
- **save**: This files keep sesion save blocks. (`Ctrl+S`)
- **snippets**: Snippets files to load dinamically `aux:` con `snip('mi_snippet',[callback])`

---

- [Commands](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/comandos.md)
- [Extended functions](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/funciones-extendidas.md)
- [Interface](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/interfaz.md)
- [Examples and uses](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/ejemplos.md)
