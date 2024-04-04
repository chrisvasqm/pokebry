
export default interface Pokemon {
  id: number
  name: string
  stats: [
    {
      base_stat: number,
      stat: { name: string }
    }
  ]
  sprites: {
    other: {
      'official-artwork': { front_default: string }
    }
  }
  types: [
    { type: { name: string } }
  ]
  moves: [
    {
      move: { name: string },
      version_group_details: [{ level_learned_at: number }]
    }
  ]
  cries: { latest: string, legacy: string }
}
