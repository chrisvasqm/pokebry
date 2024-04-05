import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import PokemonResult from "../models/PokemonResult";
import ms from "ms";

const client = new APIClient<PokemonResult>('/pokemon')

const usePokemons = () => useQuery({
    queryKey: ['pokemons'],
    queryFn: client.getAll,
    staleTime: ms('24h')
})

export default usePokemons