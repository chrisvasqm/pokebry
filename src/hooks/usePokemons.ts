import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import PokemonResult from "../models/PokemonResult";
import APIClient from "../services/apiClient";

const client = new APIClient<PokemonResult>('/pokemon')

interface PokemonsQuery {
    limit: number
}

const usePokemons = (query: PokemonsQuery) => useInfiniteQuery<PokemonResult[], Error>({
    queryKey: ['pokemons', query],
    queryFn: ({ pageParam }) => client.getAll({
        params: {
            limit: query.limit,
            offset: (pageParam as number - 1) * query.limit
        }
    }),
    placeholderData: previousData => previousData,
    staleTime: ms('24h'),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
    }
})

export default usePokemons