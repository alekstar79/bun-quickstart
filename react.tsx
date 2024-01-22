import { PokemonResponse } from './types/PokemonResponse.ts'
import { PokemonsResponse } from './types/PokemonsResponse.ts'

import { renderToReadableStream } from 'react-dom/server'
import React from 'react'

import PokemonList from './components/PokemonList.tsx'
import Pokemon from './components/Pokemon'

/**
* [SSR (Bun и React)](https://habr.com/ru/articles/761756)
*
* [github.com](https://github.com/alexkates/ssr-bun-react)
*/

// Single-file executable
// bun build ./react.tsx --compile --outfile react-cli
// ./react-cli

const server = Bun.serve({
  async fetch(request)
  {
    const url = new URL(request.url)

    if (url.pathname === '/pokemon') {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      const { results } = (await response.json()) as PokemonsResponse
      const stream = await renderToReadableStream(<PokemonList list={results} />)

      return new Response(stream, {
        headers: { "Content-Type": "text/html" }
      })
    }

    // @ts-ignore
    const match = url.pathname.match(/^\/pokemon\/([a-zA-Z0-9_-]+)$/)

    if (match) {
      const pokemonName = match[1]
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

      if (response.status === 404) {
        return new Response('Not Found', { status: 404 })
      }

      const {
        name,
        height,
        weight,
        sprites: {
          front_default
        }
      } = (await response.json()) as PokemonResponse

      const stream = await renderToReadableStream(
        <Pokemon
          name={name}
          height={height}
          weight={weight}
          img={front_default}
        />
      )

      return new Response(stream, {
        headers: { "Content-Type": "text/html" }
      })
    }

    return new Response('Not Found', { status: 404 })
  }
})

console.log(`Listening on http://localhost:${server.port} ...`)
