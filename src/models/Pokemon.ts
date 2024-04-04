
export default interface Pokemon {
  id: number;
  name: string;
  stats: [
    {
      base_stat: number;
    }
  ]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    };
  }
  types: [
    {
      type: {
        name: string
      }
    }
  ]
}
