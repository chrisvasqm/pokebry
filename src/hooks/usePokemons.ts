import { QueryClient, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import PokemonResult from "../models/PokemonResult";
import { PokemonType } from "../models/PokemonType";
import APIClient from "../services/apiClient";
import { typePokemonsQuery } from "./useTypePokemons";

const client = new APIClient<PokemonResult>('/pokemon')

interface PokemonsQuery {
    limit: number
    /** Pokemon must have every listed type. Empty lists every Pokemon. */
    types: PokemonType[]
}

/** PokeAPI has no multi-type endpoint, so each type list is fetched (and cached) whole and intersected client-side. */
const fetchByTypes = async (queryClient: QueryClient, query: PokemonsQuery, offset: number) => {
    const lists = await Promise.all(query.types.map(type => queryClient.fetchQuery(typePokemonsQuery(type))));
    const [first, ...rest] = lists;
    const matches = first.filter(result => rest.every(list => list.some(other => other.name === result.name)));
    return matches.slice(offset, offset + query.limit);
}

const usePokemons = (query: PokemonsQuery) => {
    const queryClient = useQueryClient();

    return useInfiniteQuery<PokemonResult[], Error>({
        queryKey: ['pokemons', query],
        queryFn: ({ pageParam }) => {
            const offset = (pageParam as number - 1) * query.limit;
            if (query.types.length > 0) return fetchByTypes(queryClient, query, offset);
            return client.getAll({ params: { limit: query.limit, offset } });
        },
        placeholderData: previousData => previousData,
        staleTime: ms('24h'),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length < query.limit ? undefined : allPages.length + 1;
        }
    })
}

export default usePokemons
