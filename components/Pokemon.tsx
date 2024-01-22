import React from 'react'

import { PokemonProps } from '../types/PokemonProps.ts'

function Pokemon({ height, weight, name, img }: PokemonProps) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={img} alt={name} />
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
    </div>
  )
}

export default Pokemon
