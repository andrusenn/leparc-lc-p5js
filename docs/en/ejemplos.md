# Examples and uses

<a name="ejemplos"></a>

- [Examples and uses](#ejemplos-y-usos)
    - [Use of blocks](#uso-de-bloques)
    - [Variables scope](#%C3%A1mbito-de-las-variables)
    - [Audio](#audio)
    - [Webcam](#webcam)
    - [Snippets](#snippets)
    - [My own snippet](#mi-propio-snippet)
    - [Load media files](#cargar-archivos-multimedia)

<a name="uso-de-bloques"></a>

---

### Use of blocks

The system has three blocks available: (the interface has 3 configurations)

```

aux:
      // Bloque auxiliar que difiere de setup porque no se
      // re-setean funciones y objetos
      // Podemos ocultarlo con F1

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
      // Podemos ocultarlo con F2


loop:
      // Homónimo de function draw(){}
      // Se ejecuta a una velocidad de 60 fps
      // se puede configurar en setup con setFrameRate(n)
      // Podemos ocultarlo con F3

```

- [see list of commands](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/comandos.md)
- [configure the interface and other actions](https://github.com/andrusenn/leparc-lc-p5js/blob/master/docs/es/interfaz.md)

([index](#examples-and-uses))

<a name="ambito-variables"></a>

---

### Variables scope

To access the variables in a different block, use the prefix  `$`

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

`loop:`

```js
      console.log(local) // -> error
      console.log($global) // -> global

      $mi_funcion_global() // -> Se puede ejecutar en cualquier bloque

```

([index](#examples-and-uses))

---

<a name="audio"></a>

### Audio

`setup:`

```js
      useAudio(1)
      // 0 default, mic
      // 1 mixer
      // See hardware specs
```

`loop:`

```js
      background(0)
      let ae = audioEnergy(1000)
      // audioEnergy(freq[,freq]) -> return 0-255 volume
      // of frquency or frequency range
      // (see p5js audio lib)
      // console.log(ae)
      noFill()
      stroke(255)
      rectMode(CENTER)
      rect(width/2,height/2,ae,ae)
```

([index](#examples-and-uses))

---

<a name="webcam"></a>

### Webcam

`setup:`

```js
      useCam()
      // By default is 320x240
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

([index](#examples-and-uses))

---

<a name="snippets"></a>

### Snippets

Snippets are reusable piece of code. You can load with `snip('mi_snipet')`. Can be functions, classes, etc...

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
      // Load snippets from espiro/espiro.js
      snip('espiro',()=>{
            // Once loaded...
            $espiro = new EspiroNoise(width/2,height/2)
      })
```

([index](#examples-and-uses))

---

<a name="snippets"></a>

### My own snippet

Create a folder inside of `leparc_resources/snippets` and file .js with the same name

```
leparc_resources/
      └── snippets/
            └── mi_snippet/
                  └── mi_snippet.js
```

In `mi_snippet.js`

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

`aux:`

```js
      // Load snippet mi_snippet/mi_snippet.js
      snip('mi_snippet',()=>{
            // On load do something
      })
```

`setup:`

```js
      //
      background(0)
```

`loop:`

```js
      // Run
      mi_funcion()
```

([index](#examples-and-uses))

<a name="cargar-archivos"></a>

---

### Load media files

`aux:`

```js
      // Load file mi_video.mp4 from media/ 
      createVideo(mediaPath('mi_video.mp4'),(v)=>{
            $video = v
            $video.play()
      })
      // Load file mi_imagen.png from media/
      loadImage(mediaPath('mi_imagen.png'),(i)=>{
            $img = i
      })
```

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

([index](#examples-and-uses))
