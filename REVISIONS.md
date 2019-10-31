# REVISIONES / REVISIONS

## Version 0.2.2

> [es]

- Se implementó servidor OSC para mensajes entrantes
- Nuevo metodo `useOSC(['ip',port])` inicializa OSC
- Nuevo metodo `osc('/mi_address')` o `osc('/mi_address',index)`
- Se actualizó p5js a la v.0.10.2 y sound.js v.0.3.11
- Inclusión de parámetro `num_caras` en `mirrorX([num_caras])` y `mirrorY([num_caras])`

> [en]

- OSC was implamented for incoming messages
- New method `useOSC(['ip',port])` init OSC
- New method `osc('/my_address')` or `osc('/my_address',index)`
- Updated versions p5js v.0.10.2 and sound.js v.0.3.11
- `num_faces` param added in `mirrorX([num_faces])` y `mirrorY([num_faces])`

## Version 0.2.0

> [es]

Cambio en el manejo de los bloques. Todos los bloque están ahora en un solo editor. La evaluación es selectiva dependiendo del contexto.
  
> [en]

Change in the handling of the blocks. All the blocks are now in a single editor. The evaluation is selective depending on the context.

## Version 0.1.2

> [es]

- metodo: size(width,height)
- metodos: metodos basados en tiempo tpulse() y trange()
- opcion interfaz de pestañas (tabs)
  
> [en]

- method: size(width,height)
- methods: time based methods tpulse() and trange
- Tab interface option
  
## Version 0.1.1

> [es]

- eventos: keyPressed / keyReleased
- looping seguro (configurable)
- Traducción de la interfaz
- Actualización de p5js a versión 0.8.0
- Compilar (eval) selección (setup: y aux:)
  
> [en]

- events: keyPressed / keyReleased
- safe looping (config)
- Interface traslation
- Upgrade p5js version 0.8.0
- Eval selection (setup: y aux:)
  
## Version 0.1.0

> [es]

- Carpetas públicas: media, libs, snippets
- Render 2d/3d opcional
- Traducción de la interfaz
  
> [en]

- Public folders: media, libs, snippets
- Render switch 2d/3d
- Interface traslation
  
## Version 0.0.5-alpha (20190401)

> [es]

- Se agrego reset en draw de `blendMode(NORMAL)`
- Se agrego reset en setup de `lp = {}`, `angleMode(RADIANS)`
- se agrego el directorio *media*, que es mas general que *images
- Se agrego `use3d()` y `use2d()`
- Traduccion EN/ES de la interfaz
- Comentar codigo
- Declaraciones globales con el prefijo `$`
- Carga snippets `snip(nombre)`
  
> [en]

- Reset added on draw of `blendMode(NORMAL)`
- Reset added on setup of `lp = {}`, `angleMode(RADIANS)`
- Directory added *media*, it is most general purpose than *images*
- `use3d()` and `use2d()` added
- Interface translations EN/ES
- Comment/Uncomment code
- Global declarations with `$` prefix
- Load snippets `snip(name)`
  
## Version 0.0.4-alpha

> [es]

- Cambio de nombre del objeto Dp5 a Lp5
- Bug: Rutas a las carpetas de leparc_resources
  
> [en]

- Object rename Dp5 to Lp5
- Bug: Paths to leparc_resources folder
  
## Version 0.0.3-alpha

- [es]
- Se incorporó la funcionalidad cliente/servidor para trabajar en grupo
  
- [en]
- client/server features for networking

## Version 0.0.1-alpha

## Version 0.1.0

- Inicio del proyecto
