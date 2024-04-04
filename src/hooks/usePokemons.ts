import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import PokemonResult from "../models/PokemonResult";

const client = new APIClient<PokemonResult>('/pokemon')

const usePokemons = () => useQuery({
    queryKey: ['pokemons'],
    queryFn: client.getAll
})

export default usePokemons