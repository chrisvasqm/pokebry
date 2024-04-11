
export default interface Pokemon {
  id: number
  name: string
  stats: Stats[]
  sprites: Sprites
  types: Types[]
  moves: Moves[]
  cries: Cries
}

export interface Stats {
  base_stat: number,
  stat: { name: string }
}

export interface Sprites {
  other: {
    'official-artwork': { front_default: string }
  }
}

export interface Types {
  type: { name: string }
}

export interface Moves {
  move: { name: string },
  version_group_details: [{ level_learned_at: number }]
}

export interface Cries {
  latest: string,
  legacy: string
}