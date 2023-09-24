import Stat from './Stat';
import Sprites from './Sprites';
import Type from './Type';

export default interface Pokemon {
  id: number;
  name: string;
  stats: Stat[];
  sprites: Sprites;
  types: Type[];
}
