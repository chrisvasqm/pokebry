import Stat from './Stat';

export default interface Pokemon {
  id: number;
  name: string;
  stats: Stat[];
}
