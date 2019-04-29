# Interfaz

## Configuraciones

`Ctrl+TAB` Abre y cierra la ventana de configuraciones

* **AUTO RENDER**: Activado, hace que el bloque loop: se evaúe automáticamente
* **RENDER**: Cambio 2D/3D
* **NOMBRE DE BLOQUES**: Cambia la etiqueta de `setup:` y `loop:` a `function setup(){}` y `function draw(){}`
* **MODO**: Existen tres modos para interconectarse entre computadoras:
   1. *LOCAL*: Por defecto. No se conecta a la red.
   2. *SERVIDOR*: Una vez seleccionado se convierte en servidor y está listo para codificar colaborativamente. Solo puede haber uno.
   3. *CLIENTE*: Seleccionado, busca conectarse al servidor (configurar ip y puerto en *leparc_resources/config/config.txt*)
* **SYNC**: Sincroniza los nodos al servidor a través de `frameCount`
* **NOMBRE**: Una vez conectado como *CLIENTE* este nombre aparecerá en la ventana del servidor.
* **IDIOMA**: Cambio de idioma de la interfaz.
* **PANELES**: Existen tres modos para mostrar interfaz:
   1. *VERTICAL*: Por defecto. muestra los bloques uno arriba del otro.
   2. *HORIZONTAL*: Divide la pantalla en 2. Iquierda aux y setup, a la derecha loop/draw.
   3. *TABS*: (pestañas) Muestra arriba a la derrecha las paestañas para seleccionar un bloque específico y ocultar los otros.