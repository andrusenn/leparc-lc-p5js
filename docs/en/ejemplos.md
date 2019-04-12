# Examples and uses

<a name="ejemplos"></a>

- [Examples and uses](#ejemplos-y-usos)
    - [Use of blocks](#uso-de-bloques)
    - [Ámbito de las variables](#%C3%A1mbito-de-las-variables)
    - [Audio](#audio)
    - [Webcam](#webcam)
    - [Snippets](#snippets)
    - [My own snippet](#mi-propio-snippet)
    - [Cargar archivos multimedia](#cargar-archivos-multimedia)

<a name="uso-de-bloques"></a>

---

### Use of blocks

The system has three blocks available:

```

setup:
      // Homónimo de function setup(){}
      // Por debajo, cuando se ejecuta este bloque, se
      // definen y re-setean varias funciones y objetos
      // como por ejemplo:
      // - setFrameRate(60)
      // - imageMode(CORNER)
      // - rectMode(CORNER)
      // - etc... (ver lp5-renderer.js)
      // Se puede evaluar todo el bloque con Ctrl+ENTER o
      // una sola línea con Alt+ENTER
      // Podemos ocultarlo con F1


loop:
      // Homónimo de function draw(){}
      // Se ejecuta a una velocidad de 60 fps
      // se puede configurar en setup con setFrameRate(n)
      // Podemos ocultarlo con F2

aux:
      // Bloque auxiliar que difiere de setup porque no se
      // re-setean funciones y objetos
      // Podemos ocultarlo con F3

```

- [see list of commands](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/comandos.md)
- [configure the interface and other actions](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/interfaz.md)

([indice](#ejemplos))

<a name="ambito-variables"></a>

---

### Ámbito de las variables

Para acceder a variables declaradas en otros bloques, se debe utilizar el prefijo `$`

`setup:`

```js
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

```

`draw:`

```js
      console.log(local) // -> error
      console.log($global) // -> global

      $mi_funcion_global() // -> Se puede ejecutar en cualquier bloque

```

([indice](#ejemplos))

---

<a name="audio"></a>

### Audio

`setup:`

```js
      useAudio(1)
      // 0 por defecto, es el micrófono
      // 1 es la entrada del mixer
      // Ver configuración de hardware
```

`loop:`

```js
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
```

([indice](#ejemplos))

---

<a name="webcam"></a>

### Webcam

`setup:`

```js
      useCam()
      // Por defecto 320x240
      // useCam(640,480)
```

`loop:`

```js
      background(0)


      getCam(0,0)
      // Imprime la imagen

      // O se puede obtener la imagen
      let img = imgCam()
      image(img,0,0)
```

([indice](#ejemplos))

---

<a name="snippets"></a>

### Snippets

Los snippets son porciones de código reutilizables y se cargan dinámicamente con el método `snip('mi_snipet')`. Pueden contener funciones, clases, sentencias, etc...

`setup:`

```js
      //
      background(0)
```

`loop:`

```js
      beginShape(POINTS)
      // Instancia de EspiroNoise
      $espiro.draw((x,y)=>{
            stroke(255,80)
            vertex(x,y)
      })
      endShape()

```

`aux:`

```js
      // Carga desde snippets el archivo espiro/espiro.js
      snip('espiro',()=>{
            // Una vez cargada se puede instanciar
            $espiro = new EspiroNoise(width/2,height/2)
      })
```

([indice](#ejemplos))

---

<a name="snippets"></a>

### Mi propio snippet

Crear carpeta dentro de `leparc_resources/snippets` y el archivo .js con el mismo nombre

```
leparc_resources/
      └── snippets/
            └── mi_snippet/
                  └── mi_snippet.js
```

En `mi_snippet.js`

```js

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

```

`setup:`

```js
      //
      background(0)
```

`loop:`

```js
      // Ejecutamos la funcion
      mi_funcion()
```

`aux:`

```js
      // Carga desde snippets el archivo creado mi_snippet/mi_snippet.js
      snip('mi_snippet',()=>{
            // Cuando se carga, hacemos alguna cosa
      })
```

([indice](#ejemplos))

<a name="cargar-archivos"></a>

---

### Cargar archivos multimedia

`setup:`

```js
      //
      background(0)
```

`loop:`

```js
      // Mostrar video
      image($video,0,0)
      // Mostrar imagen
      image($img,0,0)

```

`aux:`

```js
      // Carga desde media/ el archivo mi_video.mp4
      createVideo(mediaPath('mi_video.mp4'),(v)=>{
            $video = v
            $video.play()
      })
      // Carga desde media/ el archivo mi_video.mp4
      loadImage(mediaPath('mi_imagen.png'),(i)=>{
            $img = i
      })
```

([indice](#ejemplos))
