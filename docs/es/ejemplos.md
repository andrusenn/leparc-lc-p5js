# Ejemplos

<a name="ejemplos"></a>
- [Ejemplos](#ejemplos)
    - [Uso de bloques](#uso-de-bloques)
    - [Ámbito de las variables](#%C3%A1mbito-de-las-variables)
    - [Audio](#audio)
    - [Webcam](#webcam)
    - [Snippets](#snippets)
    - [Cargar archivos multimedia](#cargar-archivos-multimedia)

<a name="uso-de-bloques"></a>

---

### Uso de bloques

El sistema tiene tres bloques disponibles:

~~~

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

~~~

([indice](#ejemplos))

<a name="ambito-variables"></a>

---

### Ámbito de las variables

Para acceder a variables declaradas en otros bloques, se debe utilizar el prefijo `$`

`setup:`

~~~js
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

~~~

`draw:`

~~~js
      console.log(local) // -> error
      console.log($global) // -> global

      $mi_funcion_global() // -> Se puede ejecutar en cualquier bloque

~~~

([indice](#ejemplos))

---

<a name="audio"></a>

### Audio

`setup:`

~~~js
      useAudio(1)
      // 0 por defecto, es el micrófono
      // 1 es la entrada del mixer
      // Ver configuración de hardware
~~~

`loop:`

~~~js
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
~~~

([indice](#ejemplos))

---

<a name="webcam"></a>

### Webcam

`setup:`

~~~js
      useCam()
      // Por defecto 320x240
      // useCam(640,480)
~~~

`loop:`

~~~js
      background(0)


      getCam(0,0)
      // Imprime la imagen

      // O se puede obtener la imagen
      let img = imgCam()
      image(img,0,0)
~~~

([indice](#ejemplos))

---

<a name="snippets"></a>

### Snippets

`setup:`

~~~js
      //
      background(0)
~~~

`loop:`

~~~js
      beginShape(POINTS)
      // Instancia de EspiroNoise
      $espiro.draw((x,y)=>{
            stroke(255,80)
            vertex(x,y)
      })
      endShape()

~~~

`aux:`

~~~js
      // Carga desde snippets el archivo espiro/espiro.js
      snip('espiro',()=>{
            // Una vez cargada se puede instanciar
            $espiro = new EspiroNoise(width/2,height/2)
      })
~~~

([indice](#ejemplos))

<a name="cargar-archivos"></a>

---

### Cargar archivos multimedia

`setup:`

~~~js
      //
      background(0)
~~~

`loop:`

~~~js
      // Mostrar video
      image($video,0,0)
      // Mostrar imagen
      image($img,0,0)

~~~

`aux:`

~~~js
      // Carga desde media/ el archivo mi_video.mp4
      createVideo(mediaPath('mi_video.mp4'),(v)=>{
            $video = v
            $video.play()
      })
      // Carga desde media/ el archivo mi_video.mp4
      loadImage(mediaPath('mi_imagen.png'),(i)=>{
            $img = i
      })
~~~

([indice](#ejemplos))