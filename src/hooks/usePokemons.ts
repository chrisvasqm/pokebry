import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import PokemonResult from "../models/PokemonResult";
import ms from "ms";

const client = new APIClient<PokemonResult>('/pokemon')

interface PokemonsQuery {
    limit: number
}

const usePokemons = (query: PokemonsQuery) => useQuery({
    queryKey: ['pokemons', query],
    queryFn: () => client.getAll({
        params: {
            limit: query.limit
        }
    }),
    placeholderData: previousData => previousData,
    staleTime: ms('24h')
})

export default usePokemons