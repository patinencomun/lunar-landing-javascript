# Lunar lander con html, css y javascript
 
 ## Versión 0.6

Previsualización: https://rawgit.com/MariaAdrover/lunar-landing-javascript/v0.6/index.html

* Cuenta atrás: para que la nave no empiece a moverse enseguida al elegir el nivel de dificultad se activa una cuenta atrás.
El único botón operativo hasta que no termina la cuenta atrás es el de cambiar de nave.
* Botón About
  * Diseño del botón
  * Falta redireccionar, y elaborar página de redireccionamiento y ventana de advertencia
* Botón de sonido (he añadido sonido al juego)
  * Diseño del botón
  * Activa y desactiva el sonido
  * En la versión móvil el sonido no se empieza a reproducir hasta que no se pulsa el botón
  * He hecho que no tenga funcionalidad cuando el juego termina (para que la canción cambie según el final)


## Versión 0.5

Previsualización: https://rawgit.com/MariaAdrover/lunar-landing-javascript/v0.5/index.html

* CSS versión escritorio y versión móvil revisados
* He rediseñado el botón de aceleración 
* Agregado panel inicial para empezar el juego:
  * Breves instrucciones
  * Selección de dificultad
* Botones de dificultad: aparecen al cargarse la página. Hay dos niveles, fácil y difícil; he diseñado un botón para cada uno.
En ambos niveles hay que aterrizar a 4 m/s o menos para no eatrellarse.
  * Nivel difícil: la velocidad inicial es mayor y tenemos la mitad de combustible. La barra de combustible se pone a la mitad.
* Eliminado el botón de selección de dificultad del menú desplegable. Creo que es mejor que elijamos la dificultad al principio.
Finalmente en el menú habrá tres botones:
  * Reiniciar: para volver a empezar el juego.
  * Instrucciones: enlazará a otra página con las instrucciones més detalladas.
  * Volver al juego: continuar el juego donde lo hemos dejado. También podemos volver al juego pulsando otra vez el botón del menú.
* Final del juego:
  * Implementados dos posibles finales
  * Diseño de las imágenes del final
  * Diseño e implementación de botón para volver a jugar
* ARREGLAR:
  * Botón y enlace ABOUT
  * Enlace a página de instrucciones
  * Alerta de que se va a salir de la página

## Versión 0.4

Previsualización: https://rawgit.com/MariaAdrover/lunar-landing-javascript/v0.4/index.html

* He vuelto a escribir el código JavaScript ya que las definiciones de eventos y las funciones estaban mezcladas.
* Los botones, marcadores, etc. quedan finalmente así:
  * Marcadores:
    * Barra de combustible: de color verde. Se vacía a medida que se gasta el combustible al tener el motor encendido. Si el 
    motor está apagado la barra no se mueve y si hemos aterrizado, aunque el motor estuviera en marcha, el indicador ya no cambia, porque se supone que, o bien hemos apagado el motor, o bien nos hemos estrellado. Si el juego está en pausa no se gasta combustible.
    * Indicadores de altura y velocidad: número con un decimal. Al empezar la altura marca 70 y la velocidad 0. Se van actualizando según el movimiento de la nave. Al estar en pausa no se modifican. Al aterrizar la velocidad se pone a 0 ya que la nave se para. La velocidad de aterrizaje se guarda para saber si hemos aterrizado con éxito o nos hemos estrellado.
  * Botón para cambiar de nave: es el único botón que está activo antes de empezar el juego y durante la pausa, ya que creo que así se puede cambiar de nave con tranquilidad. Al aterrizar ya no está operativo. Cambia la nave mostrando una imagen con o sin fuego, según si el motor está encendido o apagado.
  * Botón de pausa/menú: he pensado que lo mejor es que sólo funcione cuando el juego ha empezado (al terminar aparecerá un mensaje con el resultado y se dará la opción de volver a jugar). 
  * Botón de aceleración: activa y desactiva el motor de la nave (también se puede utilizar la tecla ESPACIO). He diseñado dos botones similares al original. La imagen de la nave cambia cuando el motor se enciende o se apaga. Aunque pulsemos el botón, el motor no se encendará en la siguientes circunstancias:
    * No queda combustible.
    * No ha empezado el juego.
    * El juego está en pausa.
    * El juego ha terminado.
    

## Versión 0.3

Previsualización: ~~https://rawgit.com/MariaAdrover/lunar-landing-javascript/v0.3/index.html~~

* Añadidos los botones de la derecha:
  * Botón para cambiar de nave
  * Botón de menú
* Al pulsar el botón de cambiar de nave, se visualiza una nave diferente. De momento sólo hay dos modelos de nave, por lo 
que si se vuelve a pulsar volvemos a jugar con la nave del principio.
* El botón de menú pausa el juego y despliega un menú de opciones. He diseñado y añadido al menú de opciones un botón para volver al juego
* Al acelerar sale fuego de la nave (con ambos modelos). He retocado un poco las imágenes para que al pasar de la imagen con fuego
a la imagen sin fuego, el cuerpo de la nave no se desplace. 
* Sólo se puede acelerar con el teclado.
* código html y css validados
* ARREGLAR:
  * Versión móvil
  * Visualización del menú
  * Botón y página de instrucciones 
  * Añadir botón About
  * Qué ocurre al aterrizar: mostrar mensaje, diseñar y mostrar imagen (aterrizado o explosión)
  * Implementar botón de dificultad y de reiniciar

## Versión 0.2

Previsualización: https://rawgit.com/MariaAdrover/lunar-landing-javascript/v0.2/index.html

* Indicadores de velocidad y altura :combinación de una imagen con un indicador de tipo numérico
* Limitación a dos decimales de los indicadores de altura y velocidad (método **.toFixed(2)** aplicado a ambos indicadores)
* Reorganización de la estructura de elementos html: cambio los indicadores guardados como una lista por divs contenedores
* Al aterrizar: los indicadores de velocidad y altura se ponen a cero y ya no cambia la imagde la nave aunque nos quede combustible 
y aceleremos.
ARREGLAR:
* Que la nave no se salga de la pantalla
* Que durante el vuelo, si se ha terminado el combustible no se pueda acelerar


## Version 0.1

Previsualización: ~~https://rawgit.com/MariaAdrover/lunar-landing-javascript/v0.1/index.html~~

* Subo la carpeta img con las imágenes del proyecto
* Actualización del enlace al juego a través de rawgit
* Cambio el orden de los indicadores:
velocidad - fuel - altura  pasan a fuel - altura - velocidad
* La imagen de la nave cambia cuando aceleramos (sin sprites)
* Pongo la imagen de fondo del juego
* Pongo la imagen de la luna, modificando un poco el tamaño del div y el z-index de la luna y de la nave, 
para que cuando el cohete aterrice, su imagen tape una porción de la luna 
* Implemento el indicador de fuel, una barra indicadora en lugar de un número

## Versión esqueleto del juego Lunar Landing que incluye:

* Html con los elementos básicos del juego
* Css: d.css y m.css dos versiones que cargan mediante media query dependiendo del tamaño de pantalla.
* Js: programación realista básica necesaria para dejar caer la nave y parar cuando llega a un límite. Actualiza la velocidad y la altura en %/s y % (1% de pantalla = 1 metro).
* No dispone de imágenes.

Previsualización: ~~https://rawgit.com/urbinapro/lunar-landing-javascript/master/index.html~

Tareas a desarrollar:
* Ponerlo bonito según vuestro diseño anterior. No te olvides de optimizar las imágenes. Recuerda que se pueden cargar diferentes tamaños y formas de fondos en función del dispositivo usando css.
* Poner los menús (móvil y escritorio) según vuestro diseño anterior.
* Al pulsar una tecla, hacer click en el botón de power o bien hacer click en la pantalla la nave debe cambiar de aspecto a *nave con motor encendido* y debe cambiar la aceleración de g a -g (ejecutar motorOn).
* Opcionalmente se pueden disponer de menores o mayores tanques de combustible para aumentar o disminuir la dificultad del juego.
* Al tocar fondo debe mirarse si la velocidad de impacto es inferior a un valor umbral, en caso afirmativo mostrar mensaje de felicitación, en caso negativo explotar la nave. En ambos casos el juego finaliza y puede reiniciarse con la opción del menú *reiniciar*
* Debes poder elegir diferentes valores umbrales: 1m/s en modo difícil, 5m/s en modo muy fácil.
* Debe haber una página de *How to play* y una página de *About* accesibles desde el menú (vas a otras páginas saliendo del juego con un avisador o mensaje de comfirmación de que sales de la partida).

Cualquier otra funcionalidad o cambio debe quedar debidamente documentado.

**Este repositorio es susceptible de sufrir modificaciones sin previo aviso**
