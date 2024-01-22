import React from 'react'

import { PokemonsList } from '../types/PokemonsList.ts'

function PokemonList({ list }: { list: PokemonsList }) {
  return (
    <ul>
      {list.map(({ name }: { name: string }) => (
        <li key={name}>
          <a href={`/pokemon/${name}`}>{name}</a>
        </li>
      ))}
    </ul>
  )
}

export default PokemonList
