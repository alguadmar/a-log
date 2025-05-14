---
title: Funciónes poéticas
description: Experimentación del lenguaje poético y el lenguaje de programación
date: 2025-05-12
tags:
  - escritura
  - poesía
authors:
  - alguadmar
image: ./sea-bg.jpg
---
## Introducción
¿Qué permanece, cambia o se crea al usar el código con pretensiones “contemplativas” y no generativas? ¿Qué ocurre si quitamos al código su función instrumental? ¿Qué ocurre cuando traducimos la experiencia corporal y natural al lenguaje digital?.

Esta es una traducción y no lo que se llamaría un trabajo “original”. Tenemos en cuenta que lo original es problemático en cuanto que la pretensión es separarse del “orígen”. ¿Esta separación es siquiera posible?, ¿Cuál es el orígen?. Lo que sabemos es que estamos arrojados al medio, y el medio nos atraviesa, nos condiciona, nos posibilita. Decir que el medio es el orígen es quizá ser impulsivos; decir que creamos el orígen definitivamente lo es. La cuestión es que el cuerpo es lo que tenemos. El cuerpo y su medio, su contenedor, lo que lo afecta, lo atraviesa, lo crea y lo destruye. 

Uno de los trabajos del cuerpo es el de la traducción. Traducción del medio a “vivencia” o “fenómeno”. El cuerpo, ciertamente, no es el orígen ni se desprende de él. Forma parte de él y activamente, lo transforma en otra cosa, lo interpreta. Al ser el cuerpo el único ente afectado por el ser, él se convierte en archivo biológico de los cambios del medio. Archivo siempre guardado en traducción. Es cierto que algo del origen permanece en su traducción, de aquí la pretensión ontológica de “llegar al ser a través de los entes”. Esta pretensión es como una traducción inversa, una búsqueda del orígen que siempre fracasa. 

Un segundo nivel de traducción es cuando el cuerpo, el dasein, traduce su experiencia en lenguaje. Al hacer esto, modifica el ser. Cambia la vibración del aire, talla la silueta en la piedra, impregna la tinta en el papiro o guarda el binario en el disco magnético de un disco duro en un centro de datos (Justo lo que estoy haciendo con cada tecla que presiono).

Este proyecto explora una nueva tensión a través de la traducción de haikus—particularmente de Taneda Santōka — al lenguaje de programación Elixir. Encuentro apropiado este lenguaje funcional ya que el dinamismo de las funciones son más análogas a un acontecimiento, contrapuesto a esencias inmutables que me parecen análogas a una programación orientada a objetos. Cada traducción busca encontrar nuevas formas de fijación de la experiencia, así como explorar lo que permanece, lo que cambia y lo que se crea.

## Caminar como pensamiento
En Santōka, el caminar no es solo desplazamiento, sino una forma de atención. Caminar es permitir que el mundo se acerque, es llevar el cuerpo al ritmo de lo que le rodea. En cada paso hay escucha, y cada tropezón es también una interrupción productiva. Esta función registra esa cadencia del andar sin rumbo.

```elixir
defmodule Santoka.Camino do
  def iniciar_ruta do
    camino(%{rumbo: :indefinido, pasos: 0})
  end

  defp camino(estado) do
    nueva_posicion = avanzar(estado.rumbo)
    nuevo_estado = %{estado | pasos: estado.pasos + 1}

    caso = rem(nuevo_estado.pasos, 17)

    cond do
      caso == 0 -> {:pausa, "me detengo sin razón frente a un arbusto"}
      caso == 5 -> {:interrupción, "una piedra me hace tambalear"}
      caso == 11 -> {:asombro, "una mariposa pasa rozando mi frente"}
      true -> camino(nuevo_estado)
    end
  end

  defp avanzar(:indefinido), do: :más_allá
end

# Caminar sin destino no es perderse
# Es dejar que el mundo piense por mí
# Cada paso es una pregunta al suelo

```

## La lluvia
En los haikus de Santōka, la lluvia no es fondo sino suceso. No cae sobre el mundo: lo transforma. El sonido, la humedad, el olor; todo cambia con la lluvia. La función que sigue intenta capturar ese instante donde la lluvia interrumpe lo cotidiano y lo vuelve intensamente presente.

```elixir
defmodule Santoka.Lluvia do
  def recibir_lluvia do
    entorno = %{ropa: :mojada, temperatura: :baja, sonidos: [:goteo, :viento]}

    entorno
    |> Map.put(:estado, :presencia_total)
    |> Map.put(:pensamiento, :silenciado)
  end
end

# La lluvia no me moja: me deshace
# Ya no soy un yo, sino una superficie de impacto
# El cielo se expresa en gotas
```

## El hambre
Santōka vivió el hambre. No la usó como figura retórica sino como experiencia diaria. El hambre abre una sensibilidad distinta: todo adquiere peso, sabor, textura. Esta función habla de esa alteración perceptiva.
```elixir
defmodule Santoka.Hambre do
  def registrar_estado do
    %{sensación: :vacío, atención: :agudizada, deseo: :difuso}
    |> buscar_signo()
  end

  defp buscar_signo(estado) do
    caso = Enum.random([:nada, :olor_a_arroz, :perro_comiendo, :recuerdo])

    Map.put(estado, :signo_aparecido, caso)
  end
end

# El hambre no es solo necesidad
# Es un afinamiento: el mundo se vuelve más claro, más crudo
# Lo simple se vuelve esencial
```