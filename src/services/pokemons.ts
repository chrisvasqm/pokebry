import axios from 'axios';

export default class PokemonsService {
  find(id: number) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
