# Extender LaParc

Para extender *LeParc*, se pueden utilizar dos maneras.

1. En la carpeta `leparc_resources/snippets` se pueden crear fragmentos de código para ser cargados dinámicamente (on the fly) creando una cartpeta `mi_snippet/mi_snippet.js` y llamarla desde el bloque `aux:` con `snip('mi_snipet')`

2. Otra forma es utilizar el archivo `leparc_resources/extends/lp-extends.js`. Este archivo se carga una vez inicializado *LeParc*