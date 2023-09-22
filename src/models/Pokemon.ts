import Stat from './Stat';
import Sprites from './Sprites';

export default interface Pokemon {
  id: number;
  name: string;
  stats: Stat[];
  sprites: Sprites;
}
